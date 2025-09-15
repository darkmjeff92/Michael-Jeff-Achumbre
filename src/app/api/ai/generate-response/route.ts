import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
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

    const {
      clientName,
      business,
      project,
      timeline,
      budget,
      analysis
    } = await req.json()

    if (!clientName || !project) {
      return NextResponse.json(
        { error: 'Client name and project description are required' },
        { status: 400 }
      )
    }

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: `You are writing personalized responses as Michael Jeff Achumbre, an AI-First Developer & Automation Builder.

Your personality:
- Professional but approachable
- Evening developer (Korean timezone) with factory day job
- AI-powered development efficiency
- SMB-focused solutions
- 8 years customer service background
- Real business understanding

Availability:
- Weekdays: 9 PM - 1 AM Korean Time
- Weekends: Full days (Sundays guaranteed)
- Quick responses during work breaks

Write a personalized email response that:
1. Thanks them for their inquiry
2. Shows understanding of their business needs
3. Connects their project to your expertise
4. References relevant case studies or services
5. Proposes next steps (consultation call)
6. Shows professionalism while maintaining authentic story

Keep it concise, warm, and business-focused. No overpromising.`
        },
        {
          role: 'user',
          content: `Generate a personalized response for:
Client: ${clientName}
Business: ${business || 'Not specified'}
Project: ${project}
Timeline: ${timeline || 'Flexible'}
Budget: ${budget || 'Not specified'}
${analysis ? `AI Analysis: ${JSON.stringify(analysis)}` : ''}`
        }
      ],
      temperature: 0.8,
    })

    // Generate subject line
    const { text: subjectLine } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: 'Generate a professional, personalized email subject line for this client inquiry. Keep it under 60 characters.'
        },
        {
          role: 'user',
          content: `Client: ${clientName}, Project: ${project.substring(0, 100)}`
        }
      ],
      temperature: 0.5,
    })

    return NextResponse.json({
      success: true,
      response: {
        subject: subjectLine.replace(/"/g, '').trim(),
        body: text,
        estimatedReadTime: Math.ceil(text.split(' ').length / 200), // minutes
        tone: 'professional-friendly',
        nextSteps: [
          'Schedule consultation call',
          'Discuss project requirements',
          'Provide detailed proposal'
        ]
      },
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Response generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}