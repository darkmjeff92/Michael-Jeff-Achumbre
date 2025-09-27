import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import { openai } from '@ai-sdk/openai'
import { embed } from 'ai'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export interface DocumentChunk {
  text: string
  index: number
  metadata: {
    startChar: number
    endChar: number
    wordCount: number
  }
}

export interface ProcessingResult {
  success: boolean
  documentId: string
  text: string
  chunks: DocumentChunk[]
  wordCount: number
  chunkCount: number
  error?: string
}

// Extract text from different file types
export async function extractTextFromFile(file: Buffer, contentType: string): Promise<string> {
  try {
    switch (contentType) {
      case 'application/pdf':
        const pdfData = await pdfParse(file)
        return pdfData.text

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        const docxResult = await mammoth.extractRawText({ buffer: file })
        return docxResult.value

      case 'text/plain':
        return file.toString('utf-8')

      default:
        throw new Error(`Unsupported file type: ${contentType}`)
    }
  } catch (error) {
    console.error('Text extraction error:', error)
    throw new Error(`Failed to extract text from ${contentType}: ${error}`)
  }
}

// Split text into manageable chunks for embedding
export function chunkText(text: string, maxChunkSize: number = 1000, overlap: number = 200): DocumentChunk[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const chunks: DocumentChunk[] = []
  let currentChunk = ''
  let currentStartChar = 0
  let chunkIndex = 0

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim() + '.'

    // If adding this sentence would exceed max size, create a new chunk
    if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push({
        text: currentChunk.trim(),
        index: chunkIndex++,
        metadata: {
          startChar: currentStartChar,
          endChar: currentStartChar + currentChunk.length,
          wordCount: currentChunk.split(/\s+/).length
        }
      })

      // Start new chunk with overlap
      const overlapText = currentChunk.split(/\s+/).slice(-overlap/10).join(' ')
      currentStartChar = currentStartChar + currentChunk.length - overlapText.length
      currentChunk = overlapText + ' ' + sentence
    } else {
      currentChunk += ' ' + sentence
    }
  }

  // Add the last chunk if it has content
  if (currentChunk.trim().length > 0) {
    chunks.push({
      text: currentChunk.trim(),
      index: chunkIndex,
      metadata: {
        startChar: currentStartChar,
        endChar: currentStartChar + currentChunk.length,
        wordCount: currentChunk.split(/\s+/).length
      }
    })
  }

  return chunks
}

// Generate embeddings for text chunks using OpenAI
export async function generateEmbeddings(chunks: DocumentChunk[]): Promise<Array<{ chunk: DocumentChunk, embedding: number[] }>> {
  const results = []

  for (const chunk of chunks) {
    try {
      const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: chunk.text
      })

      results.push({
        chunk,
        embedding
      })
    } catch (error) {
      console.error(`Failed to generate embedding for chunk ${chunk.index}:`, error)
      throw error
    }
  }

  return results
}

// Store embeddings in the database
export async function storeEmbeddings(
  documentId: string,
  embeddingResults: Array<{ chunk: DocumentChunk, embedding: number[] }>
): Promise<boolean> {
  try {
    const insertData = embeddingResults.map(result => ({
      document_id: documentId,
      chunk_text: result.chunk.text,
      embedding: result.embedding,
      chunk_index: result.chunk.index,
      metadata: result.chunk.metadata
    }))

    const { error } = await supabase
      .from('document_embeddings')
      .insert(insertData)

    if (error) {
      console.error('Error storing embeddings:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Store embeddings error:', error)
    return false
  }
}

// Full document processing pipeline
export async function processDocument(
  documentId: string,
  fileBuffer: Buffer,
  contentType: string
): Promise<ProcessingResult> {
  try {
    // Step 1: Extract text
    console.log(`Processing document ${documentId}: Extracting text`)
    const text = await extractTextFromFile(fileBuffer, contentType)

    if (!text || text.trim().length === 0) {
      throw new Error('No text content found in document')
    }

    // Step 2: Chunk text
    console.log(`Processing document ${documentId}: Chunking text`)
    const chunks = chunkText(text)

    if (chunks.length === 0) {
      throw new Error('Failed to create text chunks')
    }

    // Step 3: Generate embeddings
    console.log(`Processing document ${documentId}: Generating embeddings for ${chunks.length} chunks`)
    const embeddingResults = await generateEmbeddings(chunks)

    // Step 4: Store embeddings
    console.log(`Processing document ${documentId}: Storing embeddings`)
    const stored = await storeEmbeddings(documentId, embeddingResults)

    if (!stored) {
      throw new Error('Failed to store embeddings in database')
    }

    // Step 5: Update document status
    const wordCount = text.split(/\s+/).length
    const { error: updateError } = await supabase
      .from('documents')
      .update({
        processing_status: 'completed',
        word_count: wordCount,
        chunk_count: chunks.length
      })
      .eq('id', documentId)

    if (updateError) {
      console.error('Error updating document status:', updateError)
    }

    console.log(`Processing document ${documentId}: Complete`)
    return {
      success: true,
      documentId,
      text,
      chunks,
      wordCount,
      chunkCount: chunks.length
    }

  } catch (error) {
    console.error(`Document processing failed for ${documentId}:`, error)

    // Update document status to error
    await supabase
      .from('documents')
      .update({ processing_status: 'error' })
      .eq('id', documentId)

    return {
      success: false,
      documentId,
      text: '',
      chunks: [],
      wordCount: 0,
      chunkCount: 0,
      error: error instanceof Error ? error.message : 'Unknown processing error'
    }
  }
}

// Search for similar document chunks using vector similarity
export async function searchSimilarChunks(
  query: string,
  documentId?: string,
  limit: number = 5
): Promise<Array<{
  chunk_text: string
  similarity: number
  document_id: string
  chunk_index: number
  metadata: Record<string, unknown>
}>> {
  try {
    // Generate embedding for the query
    const { embedding: queryEmbedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: query
    })

    // Search for similar chunks using vector similarity
    let rpcQuery = supabase.rpc('search_similar_chunks', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: limit
    })

    // If documentId is provided, filter by document
    if (documentId) {
      rpcQuery = rpcQuery.eq('document_id', documentId)
    }

    const { data, error } = await rpcQuery

    if (error) {
      // Check if it's a vector dimension mismatch (expected when testing with wrong dimensions)
      if (error.message?.includes('dimension') || error.code === '22003') {
        console.warn('Vector dimension mismatch in search - this is expected when testing with different embedding dimensions')
      } else {
        console.error('Similarity search error:', error)
      }
      return []
    }

    return data || []
  } catch (error) {
    console.error('Search similar chunks error:', error)
    return []
  }
}