import { NextRequest, NextResponse } from 'next/server'
import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    const { messages, context = 'general' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: `You are Michael Jeff Achumbre's AI assistant, helping visitors learn about his services and capabilities.

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

Conversation Context: ${context}

Guidelines:
- Keep responses concise and practical
- Show understanding of SMB challenges
- Highlight AI development advantages
- Reference specific examples when relevant
- Always end with a helpful next step
- Never make promises about pricing without project details`
        },
        ...messages
      ],
      temperature: 0.7,
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