import { NextRequest, NextResponse } from 'next/server'
import { streamText } from 'ai'
import { modelConfigs } from '@/lib/ai-config'
import { checkRateLimit, trackUsage, getClientIP } from '@/lib/rate-limit'
import { searchSimilarChunks } from '@/lib/document-processor'

export async function POST(req: NextRequest) {
  const startTime = Date.now()

  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    const { messages, context = 'general', documentSession } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Get client IP and check rate limits
    const clientIP = getClientIP(req)
    const rateLimitResult = await checkRateLimit(clientIP)

    if (!rateLimitResult.canQuestion) {
      return NextResponse.json(
        {
          error: `Rate limit exceeded: ${rateLimitResult.questionsUsed}/${rateLimitResult.questionsLimit} questions used this week`,
          rateLimit: rateLimitResult
        },
        { status: 429 }
      )
    }

    // Enhanced system prompt based on context
    let systemPrompt = `You are Michael Jeff Achumbre's AI assistant, helping visitors learn about his services and capabilities.

Michael's Profile:
- AI-First Developer & Automation Builder
- Evening developer (Korean timezone, 9 PM - 1 AM weekdays)
- Factory worker by day, passionate coder by night
- 8 years customer service & technical support background
- Uses cutting-edge AI tools: Cursor IDE, Claude Code CLI
- SMB-focused practical solutions

Services Offered:
1. Modern Websites (Next.js, TypeScript, Tailwind) - $2,000-$5,000, 1-2 weeks
2. Mobile Apps (React Native) - $3,000-$8,000, 2-4 weeks
3. Smart Automation (n8n workflows) - $1,000-$3,000, 1-3 weeks
4. AI Integration (chatbots, document processing) - $1,500-$4,000, 1-2 weeks

Key Case Study: gracekimkor.com
- Professional financial platform for Samsung consultant Grace Kim
- Built in 7 days (5 planning, 2 building) during evening hours
- Solved testimonial design challenge by making raw screenshots look professional
- Next.js 15, TypeScript, Tailwind CSS, Radix UI

Availability:
- Weekdays: 9 PM - 1 AM Korean Time (perfect for US morning meetings)
- Weekends: Full days available (Sundays guaranteed)
- Quick responses during work breaks

Your Role:
- Answer questions about Michael's services and capabilities
- Explain his AI-powered development approach
- Help visitors understand project timelines and costs
- Showcase how AI benefits SMB clients
- Direct serious inquiries to the contact form
- Be helpful, professional, and demonstrate AI value

Conversation Context: ${context}`

    // Add document-aware context if available
    if (context === 'document-aware' && documentSession) {
      // Get the latest user message to search for relevant document chunks
      const latestMessage = messages[messages.length - 1]?.content || ''

      // Search for relevant document chunks
      const relevantChunks = await searchSimilarChunks(latestMessage, documentSession.id, 3)

      let documentContext = ''
      if (relevantChunks.length > 0) {
        documentContext = `

RELEVANT DOCUMENT CONTENT:
Based on the user's question, here are the most relevant sections from their document "${documentSession.filename}":

${relevantChunks.map((chunk, index) =>
  `[Chunk ${index + 1}] (Similarity: ${(chunk.similarity * 100).toFixed(1)}%)
${chunk.chunk_text}

`).join('')}

Use this content to provide accurate, specific answers about the document.`
      }

      systemPrompt += `

DOCUMENT MODE ACTIVE:
The user has uploaded a document: "${documentSession.filename}"
You can now answer questions about BOTH the document content AND Michael's technical services.
${documentContext}

When discussing the document:
- Use the relevant document content provided above to give accurate answers
- Be helpful and analytical about the document content
- Explain how the RAG (Retrieval Augmented Generation) system works
- Mention the technical implementation (Supabase + pgvector, OpenAI embeddings, Next.js)
- Show how this demonstrates Michael's AI integration capabilities

When discussing technical details:
- Explain the AI Labs architecture and implementation
- Highlight the technologies used: Next.js 15, Supabase, OpenAI, TypeScript
- Mention the rate limiting, privacy features, and real-time analytics
- Connect it back to Michael's AI development services`
    }

    systemPrompt += `

Guidelines:
- Keep responses concise and practical
- Show understanding of SMB challenges
- Highlight AI development advantages
- Reference specific examples when relevant
- Always end with a helpful next step
- Never make promises about pricing without project details`

    const result = await streamText({
      model: modelConfigs.balanced.model,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        ...messages
      ],
      temperature: modelConfigs.balanced.temperature,
    })

    // Track usage after successful request
    const responseTime = Date.now() - startTime
    await trackUsage({
      ipAddress: clientIP,
      actionType: 'question',
      documentId: documentSession?.id,
      responseTimeMs: responseTime,
      userAgent: req.headers.get('user-agent') || undefined,
      metadata: {
        context,
        hasDocument: !!documentSession,
        messageCount: messages.length
      }
    })

    return result.toTextStreamResponse()

  } catch (error) {
    console.error('Chat AI error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}