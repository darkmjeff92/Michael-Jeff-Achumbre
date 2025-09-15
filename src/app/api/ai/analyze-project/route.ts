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

    const { projectDescription, businessType, budget, timeline } = await req.json()

    if (!projectDescription || !businessType) {
      return NextResponse.json(
        { error: 'Project description and business type are required' },
        { status: 400 }
      )
    }

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for Michael Jeff Achumbre, an AI-First Developer & Automation Builder.

Your role is to analyze project requirements and provide intelligent recommendations for SMB clients.

Services offered:
- Modern Websites (Next.js, TypeScript, Tailwind) - 1-2 weeks, $2,000-$5,000
- Mobile Apps (React Native) - 2-4 weeks, $3,000-$8,000
- Smart Automation (n8n workflows) - 1-3 weeks, $1,000-$3,000
- AI Integration (chatbots, document processing) - 1-2 weeks, $1,500-$4,000

Analyze the project and provide:
1. Recommended service(s)
2. Estimated timeline
3. Budget range
4. Implementation approach
5. Key benefits for the business

Be concise, professional, and SMB-focused. Format as JSON.`
        },
        {
          role: 'user',
          content: `Analyze this project:
Business Type: ${businessType}
Project: ${projectDescription}
Budget: ${budget || 'Not specified'}
Timeline: ${timeline || 'Flexible'}`
        }
      ],
      temperature: 0.7,
    })

    // Parse the AI response to ensure it's valid JSON
    let analysis
    try {
      analysis = JSON.parse(text)
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      analysis = {
        recommendedServices: ['AI Integration'],
        estimatedTimeline: '2-3 weeks',
        budgetRange: '$2,000 - $4,000',
        implementationApproach: text.substring(0, 200) + '...',
        keyBenefits: ['Professional development', 'AI-powered efficiency', 'SMB-focused solutions']
      }
    }

    return NextResponse.json({
      success: true,
      analysis,
      confidence: 0.85
    })

  } catch (error) {
    console.error('AI analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze project' },
      { status: 500 }
    )
  }
}