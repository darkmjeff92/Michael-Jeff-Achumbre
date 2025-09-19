import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Service catalog with detailed information
const servicesCatalog = {
  website: {
    name: "Modern Website Development",
    description: "Fast, professional websites using Next.js, TypeScript, Tailwind",
    pricing: { min: 2000, max: 5000 },
    timeline: "1-2 weeks",
    idealFor: ["businesses needing web presence", "outdated website upgrades", "professional portfolios", "landing pages"],
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Radix UI", "Vercel"],
    features: ["Mobile-first design", "SEO optimized", "Fast loading", "Professional UI"]
  },
  mobile: {
    name: "Mobile App Development",
    description: "Cross-platform mobile apps for iOS and Android using React Native",
    pricing: { min: 3000, max: 8000 },
    timeline: "2-4 weeks",
    idealFor: ["customer-facing businesses", "service appointments", "e-commerce", "client portals"],
    technologies: ["React Native", "TypeScript", "Native APIs", "Cross-platform"],
    features: ["iOS & Android", "Native performance", "Push notifications", "Offline capabilities"]
  },
  automation: {
    name: "Smart Automation Setup",
    description: "n8n workflows that handle repetitive tasks automatically",
    pricing: { min: 1000, max: 3000 },
    timeline: "1-3 weeks",
    idealFor: ["repetitive manual tasks", "data processing", "email workflows", "lead management"],
    technologies: ["n8n", "API integrations", "Webhooks", "Database connections"],
    features: ["Task automation", "Data synchronization", "Email workflows", "Custom triggers"]
  },
  ai: {
    name: "AI Integration & Enhancement",
    description: "Add intelligent features like chatbots and document processing",
    pricing: { min: 1500, max: 4000 },
    timeline: "1-2 weeks",
    idealFor: ["customer support", "content analysis", "smart recommendations", "process optimization"],
    technologies: ["AI SDK", "OpenAI/Anthropic", "Custom models", "API integrations"],
    features: ["Smart chatbots", "Document processing", "Intelligent insights", "Automated responses"]
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
      businessType,
      currentChallenges,
      budget,
      timeline,
      techComfort,
      goals,
      context = 'general'
    } = await req.json()

    if (!businessType) {
      return NextResponse.json(
        { error: 'Business type is required for service recommendations' },
        { status: 400 }
      )
    }

    const { text } = await generateText({
      model: openai('gpt-5-mini'),
      messages: [
        {
          role: 'system',
          content: `You are an intelligent service recommendation AI for Michael Jeff Achumbre's development services.

Available Services:
${JSON.stringify(servicesCatalog, null, 2)}

Michael's Context:
- AI-First Developer & Automation Builder
- Evening developer (Korean timezone, 9 PM - 1 AM)
- Uses AI tools for efficient development
- 8 years customer service background
- SMB-focused solutions
- Factory worker by day, passionate coder by night

Your role is to:
1. Analyze the client's business and needs
2. Recommend the most appropriate 1-3 services in priority order
3. Explain why each service fits their needs
4. Suggest implementation order if multiple services
5. Highlight business benefits and ROI potential

Provide response as JSON with this structure:
{
  "primaryRecommendation": {
    "serviceId": "string",
    "serviceName": "string",
    "relevanceScore": 0.0-1.0,
    "reasoning": "string",
    "businessBenefits": ["string"],
    "estimatedROI": "string",
    "implementationNotes": "string"
  },
  "additionalRecommendations": [
    {
      "serviceId": "string",
      "serviceName": "string",
      "relevanceScore": 0.0-1.0,
      "reasoning": "string",
      "sequencing": "string" // when to implement relative to primary
    }
  ],
  "packageSuggestion": {
    "name": "string",
    "services": ["serviceId"],
    "combinedPricing": { "min": number, "max": number },
    "timeline": "string",
    "benefits": "string"
  },
  "insights": [
    {
      "type": "opportunity" | "consideration" | "tip",
      "message": "string"
    }
  ]
}

Be practical, SMB-focused, and consider Michael's evening schedule and AI-powered efficiency.`
        },
        {
          role: 'user',
          content: `Recommend services for this client:
Business Type: ${businessType}
Current Challenges: ${currentChallenges || 'Not specified'}
Budget: ${budget || 'Not specified'}
Timeline: ${timeline || 'Flexible'}
Tech Comfort Level: ${techComfort || 'Not specified'}
Goals: ${goals || 'Not specified'}
Context: ${context}`
        }
      ],
      temperature: 0.6,
    })

    let recommendations
    try {
      recommendations = JSON.parse(text)
    } catch (parseError) {
      // Fallback recommendations based on business type
      const fallbackService = businessType.toLowerCase().includes('restaurant') || businessType.toLowerCase().includes('retail') ? 'website' :
                              businessType.toLowerCase().includes('service') || businessType.toLowerCase().includes('consulting') ? 'automation' :
                              businessType.toLowerCase().includes('tech') || businessType.toLowerCase().includes('startup') ? 'ai' : 'website'

      recommendations = {
        primaryRecommendation: {
          serviceId: fallbackService,
          serviceName: servicesCatalog[fallbackService as keyof typeof servicesCatalog].name,
          relevanceScore: 0.8,
          reasoning: `Based on your business type (${businessType}), this service would provide the most immediate value.`,
          businessBenefits: ["Improved efficiency", "Professional presence", "Better customer experience"],
          estimatedROI: "3-6x investment within first year",
          implementationNotes: "Can be completed during evening development hours."
        },
        additionalRecommendations: [],
        packageSuggestion: null,
        insights: [
          {
            type: "tip",
            message: "AI-powered development means faster delivery and better results for your investment."
          }
        ]
      }
    }

    return NextResponse.json({
      success: true,
      recommendations,
      generatedAt: new Date().toISOString(),
      context: {
        analyzedBusiness: businessType,
        considerationsIncluded: [
          currentChallenges ? "Current challenges" : null,
          budget ? "Budget constraints" : null,
          timeline ? "Timeline requirements" : null,
          techComfort ? "Technical comfort level" : null
        ].filter(Boolean)
      }
    })

  } catch (error) {
    console.error('Service recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate service recommendations' },
      { status: 500 }
    )
  }
}