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

    const { projectType, requirements, complexity, timeline } = await req.json()

    if (!projectType || !requirements) {
      return NextResponse.json(
        { error: 'Project type and requirements are required' },
        { status: 400 }
      )
    }

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: `You are a budget estimation AI for Michael Jeff Achumbre's development services.

Base pricing ranges:
- Websites: $2,000-$5,000 (1-2 weeks)
- Mobile Apps: $3,000-$8,000 (2-4 weeks)
- Automation: $1,000-$3,000 (1-3 weeks)
- AI Integration: $1,500-$4,000 (1-2 weeks)

Consider complexity, requirements, and timeline to provide accurate estimates.
Factor in AI-powered development efficiency (20-30% faster than traditional).

Provide JSON response with:
- estimatedBudget: {min: number, max: number}
- timeline: {min: number, max: number} (in weeks)
- complexity: "low" | "medium" | "high"
- breakdown: string[]
- justification: string`
        },
        {
          role: 'user',
          content: `Estimate budget for:
Project Type: ${projectType}
Requirements: ${requirements}
Complexity: ${complexity || 'medium'}
Timeline: ${timeline || 'flexible'}`
        }
      ],
      temperature: 0.3,
    })

    let estimation
    try {
      estimation = JSON.parse(text)
    } catch (parseError) {
      // Fallback estimation
      const baseRanges = {
        'website': { min: 2000, max: 5000, weeks: { min: 1, max: 2 } },
        'mobile': { min: 3000, max: 8000, weeks: { min: 2, max: 4 } },
        'automation': { min: 1000, max: 3000, weeks: { min: 1, max: 3 } },
        'ai': { min: 1500, max: 4000, weeks: { min: 1, max: 2 } }
      }

      const typeKey = projectType.toLowerCase().includes('mobile') ? 'mobile' :
                      projectType.toLowerCase().includes('automation') ? 'automation' :
                      projectType.toLowerCase().includes('ai') ? 'ai' : 'website'

      const base = baseRanges[typeKey]

      estimation = {
        estimatedBudget: base,
        timeline: base.weeks,
        complexity: complexity || 'medium',
        breakdown: [`${projectType} development`, 'AI-powered efficiency', '30 days support'],
        justification: 'Estimate based on project type and standard pricing.'
      }
    }

    return NextResponse.json({
      success: true,
      estimation,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Budget estimation error:', error)
    return NextResponse.json(
      { error: 'Failed to estimate budget' },
      { status: 500 }
    )
  }
}