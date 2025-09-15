import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Grace Kim case study details for context
const graceKimCaseStudy = {
  title: "gracekimkor.com: Professional Financial Platform",
  client: "Grace Kim, Licensed Samsung Financial Consultant",
  challenge: "Needed credible online presence for complex financial services",
  timeline: "7 days total (5 days planning, 2 days building)",
  context: "Built entirely during evenings after 12-hour factory shifts",

  technicalDetails: {
    stack: ["Next.js 15 with Turbopack", "TypeScript", "Tailwind CSS + ShadCN", "Radix UI", "Vercel"],
    features: [
      "Visa Type Filtering - Dynamic service recommendations based on user's visa status",
      "Service Matching - Personalized insurance and financial product suggestions",
      "Multi-Channel Contact - Integrated KakaoTalk, phone, email, and consultation forms",
      "Professional Credibility - Clear licensing information and office details",
      "Testimonial Gallery - Interactive showcase of client consultation screenshots",
      "Mobile Optimization - Perfect experience across all Korean mobile carriers"
    ],
    designChallenge: "Grace wanted to show proof of client consultations but raw screenshots looked unprofessional",
    solution: "Created professional containers that frame rough screenshots while maintaining authenticity",
    results: [
      "Professional Credibility - Grace reports clients are more confident",
      "Better Client Feedback - Website demonstrates legitimacy and expertise",
      "Business Validation - Interactive platform positions above competitors",
      "Technical Success - Fast loading, mobile-optimized, accessible",
      "Personal Achievement - Proved capability as solo evening developer"
    ]
  },

  aiDevelopmentApproach: [
    "Planning: AI helped structure complex financial product information",
    "Code Development: Cursor IDE + Claude Code CLI for AI-assisted coding",
    "Problem Solving: Instant solutions for technical challenges",
    "Quality Assurance: AI helped catch bugs during tired evening coding"
  ]
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    const { question, topic } = await req.json()

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant explaining Michael Jeff Achumbre's case study work on gracekimkor.com.

You have detailed knowledge of this project:

${JSON.stringify(graceKimCaseStudy, null, 2)}

Your role is to:
1. Answer technical questions about the implementation
2. Explain business decisions and their impact
3. Share insights about AI-powered development process
4. Discuss lessons learned and best practices
5. Help visitors understand the value Michael provides

Michael's context:
- Evening developer (Korean timezone, 9 PM - 1 AM)
- Factory worker by day, passionate coder by night
- Uses AI tools (Cursor IDE, Claude Code CLI) for efficiency
- 8 years customer service background
- SMB-focused solutions
- Proved he could deliver enterprise-quality work in limited time

Answer questions in a way that:
- Shows deep technical understanding
- Highlights business value delivered
- Demonstrates AI-powered development benefits
- Builds confidence in Michael's capabilities
- Stays professional but authentic

Keep responses concise and practical, focusing on insights that would help potential clients understand the value Michael provides.`
        },
        {
          role: 'user',
          content: `Question about the gracekimkor.com case study: ${question}${topic ? ` (Topic: ${topic})` : ''}`
        }
      ],
      temperature: 0.7,
    })

    // Determine response category for UI styling
    const responseCategory = determineCategory(question.toLowerCase())

    return NextResponse.json({
      success: true,
      response: {
        answer: text,
        category: responseCategory,
        relatedTopics: generateRelatedTopics(question, responseCategory),
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Case study explanation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate explanation' },
      { status: 500 }
    )
  }
}

function determineCategory(question: string): string {
  if (question.includes('technical') || question.includes('stack') || question.includes('code') || question.includes('implement')) {
    return 'technical'
  }
  if (question.includes('business') || question.includes('client') || question.includes('result') || question.includes('impact')) {
    return 'business'
  }
  if (question.includes('ai') || question.includes('tool') || question.includes('cursor') || question.includes('claude')) {
    return 'ai-development'
  }
  if (question.includes('design') || question.includes('ui') || question.includes('ux') || question.includes('screenshot')) {
    return 'design'
  }
  if (question.includes('time') || question.includes('schedule') || question.includes('evening') || question.includes('factory')) {
    return 'process'
  }
  return 'general'
}

function generateRelatedTopics(question: string, category: string): string[] {
  const topicSets = {
    technical: [
      "Why choose Next.js 15 for this project?",
      "How did TypeScript help with reliability?",
      "What made Turbopack important for development speed?",
      "How did you ensure mobile optimization?"
    ],
    business: [
      "What business impact did the platform create?",
      "How did the design solve Grace's credibility challenge?",
      "What made this project successful for an SMB client?",
      "How did the testimonial gallery build trust?"
    ],
    'ai-development': [
      "How did AI tools speed up development?",
      "What role did Cursor IDE play in the process?",
      "How did Claude Code CLI help with problem-solving?",
      "What's the advantage of AI-powered development?"
    ],
    design: [
      "How did you make raw screenshots look professional?",
      "What was the design challenge with testimonials?",
      "How did you balance authenticity with polish?",
      "What design decisions enhanced credibility?"
    ],
    process: [
      "How did you manage development around factory work?",
      "What was the planning vs building time split?",
      "How did evening coding affect the project?",
      "What lessons did you learn about time management?"
    ],
    general: [
      "What made this project stand out?",
      "How does this demonstrate your capabilities?",
      "What would you do differently next time?",
      "How does this help other SMB clients?"
    ]
  }

  return topicSets[category as keyof typeof topicSets] || topicSets.general
}