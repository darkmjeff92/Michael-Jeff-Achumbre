import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, trackUsage, getClientIP } from '@/lib/rate-limit'
import { processDocument } from '@/lib/document-processor'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: NextRequest) {
  try {
    // Get client IP and check upload rate limits
    const clientIP = getClientIP(req)
    const rateLimitResult = await checkRateLimit(clientIP)

    if (!rateLimitResult.canUpload) {
      return NextResponse.json(
        {
          error: `Upload limit exceeded: ${rateLimitResult.uploadsUsed}/${rateLimitResult.uploadsLimit} uploads used this week`,
          rateLimit: rateLimitResult
        },
        { status: 429 }
      )
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PDF, DOCX, DOC, or TXT files.' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    // const fileExtension = file.name.split('.').pop() || 'unknown'
    const storagePath = `${clientIP}/${timestamp}-${file.name}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Set expiration time (2 hours from now)
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000)

    // Create document record
    const { data: documentData, error: dbError } = await supabase
      .from('documents')
      .insert({
        filename: `${timestamp}-${file.name}`,
        original_filename: file.name,
        file_size: file.size,
        content_type: file.type,
        ip_address: clientIP,
        expires_at: expiresAt.toISOString(),
        storage_path: storagePath,
        processing_status: 'pending'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)

      // Clean up uploaded file
      await supabase.storage
        .from('documents')
        .remove([storagePath])

      return NextResponse.json(
        { error: 'Failed to create document record' },
        { status: 500 }
      )
    }

    // Track upload usage
    await trackUsage({
      ipAddress: clientIP,
      actionType: 'upload',
      documentId: documentData.id,
      userAgent: req.headers.get('user-agent') || undefined,
      metadata: {
        filename: file.name,
        size: file.size,
        type: file.type
      }
    })

    // Process document asynchronously for real AI capabilities
    setTimeout(async () => {
      try {
        // Update status to processing
        await supabase
          .from('documents')
          .update({ processing_status: 'processing' })
          .eq('id', documentData.id)

        // Get file from storage for processing
        const { data: fileData, error: downloadError } = await supabase.storage
          .from('documents')
          .download(storagePath)

        if (downloadError || !fileData) {
          console.error('Failed to download file for processing:', downloadError)
          await supabase
            .from('documents')
            .update({ processing_status: 'error' })
            .eq('id', documentData.id)
          return
        }

        // Convert to buffer and process
        const buffer = Buffer.from(await fileData.arrayBuffer())
        const result = await processDocument(documentData.id, buffer, file.type)

        if (!result.success) {
          console.error('Document processing failed:', result.error)
        }
      } catch (error) {
        console.error('Document processing error:', error)
        await supabase
          .from('documents')
          .update({ processing_status: 'error' })
          .eq('id', documentData.id)
      }
    }, 1000) // Small delay to ensure response is sent first

    return NextResponse.json({
      success: true,
      document: {
        id: documentData.id,
        filename: documentData.original_filename,
        size: documentData.file_size,
        type: documentData.content_type,
        uploadedAt: documentData.upload_date,
        expiresAt: documentData.expires_at,
        processingStatus: documentData.processing_status
      },
      rateLimit: rateLimitResult
    })

  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { documentId } = await req.json()

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID required' },
        { status: 400 }
      )
    }

    const clientIP = getClientIP(req)

    // Get document info
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('ip_address', clientIP) // Only allow deletion by same IP
      .single()

    if (fetchError || !document) {
      return NextResponse.json(
        { error: 'Document not found or access denied' },
        { status: 404 }
      )
    }

    // Delete from storage
    if (document.storage_path) {
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([document.storage_path])

      if (storageError) {
        console.error('Storage deletion error:', storageError)
      }
    }

    // Delete from database (cascades to embeddings)
    const { error: deleteError } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId)

    if (deleteError) {
      console.error('Database deletion error:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete document' },
        { status: 500 }
      )
    }

    // Track deletion
    await trackUsage({
      ipAddress: clientIP,
      actionType: 'delete',
      documentId: documentId,
      metadata: {
        filename: document.original_filename,
        manual_deletion: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully'
    })

  } catch (error) {
    console.error('Document deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const clientIP = getClientIP(req)

    // Get user's documents that haven't expired
    const { data: documents, error } = await supabase
      .from('documents')
      .select('id, original_filename, file_size, content_type, upload_date, expires_at, processing_status, word_count, chunk_count')
      .eq('ip_address', clientIP)
      .gt('expires_at', new Date().toISOString())
      .order('upload_date', { ascending: false })

    if (error) {
      console.error('Documents fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch documents' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      documents: documents || [],
      count: documents?.length || 0
    })

  } catch (error) {
    console.error('Documents fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}