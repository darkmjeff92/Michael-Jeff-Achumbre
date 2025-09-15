import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Complexity factors for different project types
const complexityFramework = {
  website: {
    factors: [
      "Number of pages/sections",
      "Custom functionality requirements",
      "Third-party integrations",
      "Content management needs",
      "E-commerce features",
      "User authentication",
      "Performance requirements",
      "Mobile responsiveness complexity",
      "SEO requirements"
    ],
    baseHours: { low: 40, medium: 80, high: 120 }
  },
  mobile: {
    factors: [
      "Platform requirements (iOS/Android/both)",
      "Native features needed",
      "Offline functionality",
      "Push notifications",
      "Backend integration complexity",
      "User interface complexity",
      "Performance requirements",
      "App store compliance",
      "Device-specific features"
    ],
    baseHours: { low: 80, medium: 160, high: 240 }
  },
  automation: {
    factors: [
      "Number of tools to integrate",
      "API complexity and availability",
      "Data transformation requirements",
      "Error handling complexity",
      "Monitoring and alerts needed",
      "Security requirements",
      "Scalability needs",
      "Scheduling complexity",
      "User interface requirements"
    ],
    baseHours: { low: 20, medium: 50, high: 100 }
  },
  ai: {
    factors: [
      "AI model complexity",
      "Data processing requirements",
      "Integration complexity",
      "Training data needs",
      "Real-time vs batch processing",
      "Accuracy requirements",
      "Scalability needs",
      "Custom model vs API usage",
      "User interface complexity"
    ],
    baseHours: { low: 30, medium: 60, high: 120 }
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    const {
      projectDescription,
      projectType = 'website',
      requirements = [],
      constraints = {},
      businessContext = ''
    } = await req.json()

    if (!projectDescription) {
      return NextResponse.json(
        { error: 'Project description is required' },
        { status: 400 }
      )
    }

    const framework = complexityFramework[projectType as keyof typeof complexityFramework] || complexityFramework.website

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: `You are an expert project complexity analyzer for Michael Jeff Achumbre's development services.

Michael's Context:
- Evening developer (Korean timezone, 9 PM - 1 AM weekdays)
- Uses AI-powered development tools for efficiency
- 8 years customer service background
- SMB-focused practical solutions
- Factory worker by day, efficient coder by night

Project Type: ${projectType}
Complexity Factors to Analyze:
${framework.factors.map((factor, i) => `${i + 1}. ${factor}`).join('\n')}

Base Development Hours:
- Low Complexity: ${framework.baseHours.low} hours
- Medium Complexity: ${framework.baseHours.medium} hours
- High Complexity: ${framework.baseHours.high} hours

Analyze the project and provide a JSON response with:
{
  "overallComplexity": "low" | "medium" | "high",
  "complexityScore": 0.0-1.0,
  "estimatedHours": number,
  "timelineWeeks": { "min": number, "max": number },
  "factorAnalysis": [
    {
      "factor": "string",
      "complexity": "low" | "medium" | "high",
      "impact": "string",
      "reasoning": "string"
    }
  ],
  "riskFactors": [
    {
      "risk": "string",
      "severity": "low" | "medium" | "high",
      "mitigation": "string"
    }
  ],
  "recommendations": [
    {
      "category": "technical" | "business" | "timeline" | "budget",
      "recommendation": "string",
      "reasoning": "string"
    }
  ],
  "phaseSuggestion": {
    "recommended": boolean,
    "phases": [
      {
        "name": "string",
        "description": "string",
        "hours": number,
        "deliverables": ["string"]
      }
    ]
  },
  "aiDevelopmentBenefit": {
    "timeReduction": "string",
    "qualityImprovement": "string",
    "specificTools": ["string"]
  }
}

Consider:
- Michael's evening development schedule (20 hours/week max)
- AI-powered development efficiency (20-30% faster)
- SMB budget constraints and value delivery
- Practical implementation challenges
- Korean timezone coordination with clients`
        },
        {
          role: 'user',
          content: `Analyze this ${projectType} project:

Description: ${projectDescription}

${requirements.length > 0 ? `Requirements: ${requirements.join(', ')}` : ''}

${Object.keys(constraints).length > 0 ? `Constraints: ${JSON.stringify(constraints)}` : ''}

${businessContext ? `Business Context: ${businessContext}` : ''}`
        }
      ],
      temperature: 0.3,
    })

    let analysis
    try {
      analysis = JSON.parse(text)
    } catch (parseError) {
      // Fallback analysis
      const baseHours = framework.baseHours.medium
      const aiEfficiency = 0.75 // 25% reduction with AI tools

      analysis = {
        overallComplexity: 'medium',
        complexityScore: 0.6,
        estimatedHours: Math.round(baseHours * aiEfficiency),
        timelineWeeks: { min: 2, max: 4 },
        factorAnalysis: [
          {
            factor: 'General Requirements',
            complexity: 'medium',
            impact: 'Standard development approach required',
            reasoning: 'Based on project description analysis'
          }
        ],
        riskFactors: [
          {
            risk: 'Scope creep during development',
            severity: 'medium',
            mitigation: 'Clear requirements documentation and regular check-ins'
          }
        ],
        recommendations: [
          {
            category: 'timeline',
            recommendation: 'Plan for evening development schedule',
            reasoning: 'Account for Michael\'s 9 PM - 1 AM availability'
          }
        ],
        phaseSuggestion: {
          recommended: true,
          phases: [
            {
              name: 'Planning & Design',
              description: 'Requirements gathering and technical planning',
              hours: Math.round(baseHours * 0.25),
              deliverables: ['Project specification', 'Technical architecture', 'Timeline']
            },
            {
              name: 'Development',
              description: 'Core development work',
              hours: Math.round(baseHours * 0.65),
              deliverables: ['Working application', 'Testing', 'Documentation']
            },
            {
              name: 'Launch & Support',
              description: 'Deployment and initial support',
              hours: Math.round(baseHours * 0.1),
              deliverables: ['Production deployment', '30 days support']
            }
          ]
        },
        aiDevelopmentBenefit: {
          timeReduction: '25% faster with AI-powered tools',
          qualityImprovement: 'Better code quality and fewer bugs',
          specificTools: ['Cursor IDE', 'Claude Code CLI', 'AI debugging']
        }
      }
    }

    return NextResponse.json({
      success: true,
      analysis,
      projectType,
      generatedAt: new Date().toISOString(),
      metadata: {
        frameworkUsed: projectType,
        analysisFactors: framework.factors.length,
        aiEnhanced: true
      }
    })

  } catch (error) {
    console.error('Complexity analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze project complexity' },
      { status: 500 }
    )
  }
}