# AI Implementation Patterns & Best Practices

This guide provides practical implementation patterns for AI SDK v5 with Zod v4 validation, showing how to upgrade the current basic implementation to use modern schema-driven approaches.

## 🔄 Current vs Recommended Implementation Patterns

### Pattern 1: Project Analysis API Transformation

#### ❌ Current Implementation (Basic)
```typescript
// src/app/api/ai/analyze-project/route.ts - Current approach
export async function POST(req: NextRequest) {
  // Manual validation
  const { projectDescription, businessType, budget, timeline } = await req.json()

  if (!projectDescription || !businessType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Basic text generation
  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    messages: [/* ... */],
    temperature: 0.7,
  })

  // Manual JSON parsing with fallback
  let analysis
  try {
    analysis = JSON.parse(text)
  } catch (parseError) {
    analysis = {
      recommendedServices: ['AI Integration'],
      estimatedTimeline: '2-3 weeks',
      // ... fallback data
    }
  }

  return NextResponse.json({ success: true, analysis, confidence: 0.85 })
}
```

#### ✅ Recommended Implementation (Schema-Driven)
```typescript
// src/app/api/ai/analyze-project/route.ts - Enhanced approach
import { z } from 'zod'
import { generateObject } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

// Input validation schema
const ProjectAnalysisInputSchema = z.object({
  projectDescription: z.string()
    .min(10, "Project description must be at least 10 characters")
    .max(2000, "Description is too long"),
  businessType: z.string()
    .min(1, "Business type is required"),
  budget: z.string()
    .optional()
    .refine(val => !val || /^\$?\d+k?-?\$?\d*k?$/i.test(val), {
      message: "Invalid budget format"
    }),
  timeline: z.string()
    .optional(),
  urgency: z.enum(['low', 'medium', 'high'])
    .default('medium'),
})

// Output schema for type safety
const ProjectAnalysisOutputSchema = z.object({
  recommendedServices: z.array(z.enum([
    'Modern Website Development',
    'Mobile App Development',
    'Smart Automation Setup',
    'AI Integration & Enhancement'
  ])).min(1),
  estimatedTimeline: z.string(),
  budgetRange: z.string(),
  implementationApproach: z.string(),
  keyBenefits: z.array(z.string()).min(1),
  complexity: z.enum(['low', 'medium', 'high']),
  riskFactors: z.array(z.string()).optional(),
  confidence: z.number().min(0).max(1),
})

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(req: NextRequest) {
  try {
    // Validate input with detailed error messages
    const validatedInput = ProjectAnalysisInputSchema.parse(await req.json())

    // Use structured generation for reliable output
    const { object: analysis } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: ProjectAnalysisOutputSchema,
      prompt: `As Michael Jeff Achumbre's AI assistant, analyze this SMB project:

Business: ${validatedInput.businessType}
Project: ${validatedInput.projectDescription}
Budget: ${validatedInput.budget || 'Not specified'}
Timeline: ${validatedInput.timeline || 'Flexible'}
Urgency: ${validatedInput.urgency}

Provide detailed analysis considering:
- Michael's evening development schedule (Korean timezone)
- AI-powered development efficiency (20-30% faster)
- SMB budget constraints and practical solutions
- Services: Websites ($2k-5k), Mobile ($3k-8k), Automation ($1k-3k), AI Integration ($1.5k-4k)

Return analysis with confidence score based on information completeness.`,
      temperature: 0.3, // Lower temperature for more consistent analysis
    })

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        analyzedAt: new Date().toISOString(),
        modelUsed: 'gpt-4o-mini',
        inputValidation: 'passed',
        schemaVersion: '1.0',
      }
    })

  } catch (error) {
    // Enhanced error handling
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.format(),
        code: 'VALIDATION_ERROR'
      }, { status: 400 })
    }

    console.error('AI analysis error:', error)
    return NextResponse.json({
      error: 'Failed to analyze project',
      code: 'AI_PROCESSING_ERROR'
    }, { status: 500 })
  }
}
```

### Pattern 2: Enhanced Contact Form with AI Integration

#### ✅ Complete Implementation Example
```typescript
// src/app/api/ai/contact-analysis/route.ts - New comprehensive endpoint
import { z } from 'zod'
import { generateObject } from 'ai'

const ContactFormSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Valid email address required"),
    company: z.string().optional(),
    role: z.string().optional(),
  }),
  projectInfo: z.object({
    description: z.string().min(20, "Please provide more project details"),
    type: z.enum(['website', 'mobile', 'automation', 'ai', 'consulting']),
    budget: z.object({
      range: z.enum(['under_2k', '2k_5k', '5k_10k', '10k_plus', 'not_sure']),
      currency: z.enum(['USD', 'KRW']).default('USD'),
    }),
    timeline: z.object({
      urgency: z.enum(['asap', '1_month', '3_months', '6_months', 'flexible']),
      startDate: z.string().optional(),
    }),
  }),
  businessContext: z.object({
    industry: z.string(),
    size: z.enum(['startup', 'small', 'medium', 'large']),
    currentChallenges: z.array(z.string()).min(1),
    goals: z.array(z.string()).min(1),
  }),
  communication: z.object({
    preferredMethod: z.enum(['email', 'video_call', 'phone', 'chat']),
    timezone: z.string().default('UTC'),
    availability: z.array(z.enum([
      'korean_evening', 'us_morning', 'weekend', 'flexible'
    ])),
  }),
})

const ContactAnalysisOutputSchema = z.object({
  leadQualification: z.object({
    score: z.number().min(0).max(100),
    tier: z.enum(['high', 'medium', 'low']),
    reasoning: z.string(),
  }),
  projectAssessment: z.object({
    feasibility: z.enum(['high', 'medium', 'low']),
    complexity: z.enum(['low', 'medium', 'high']),
    estimatedHours: z.number().positive(),
    recommendedApproach: z.string(),
  }),
  businessFit: z.object({
    michaelSuitability: z.number().min(0).max(100),
    schedulingCompatibility: z.enum(['excellent', 'good', 'challenging']),
    budgetAlignment: z.enum(['perfect', 'reasonable', 'stretch', 'insufficient']),
  }),
  recommendations: z.object({
    services: z.array(z.string()),
    timeline: z.string(),
    nextSteps: z.array(z.string()),
    responseTemplate: z.string(),
  }),
  insights: z.object({
    opportunityType: z.enum(['quick_win', 'strategic', 'learning', 'partnership']),
    redFlags: z.array(z.string()),
    successFactors: z.array(z.string()),
  }),
})

export async function POST(req: NextRequest) {
  try {
    const contactData = ContactFormSchema.parse(await req.json())

    const { object: analysis } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: ContactAnalysisOutputSchema,
      prompt: `Analyze this contact form submission for Michael Jeff Achumbre's business:

CONTACT INFO:
Name: ${contactData.personalInfo.name}
Email: ${contactData.personalInfo.email}
Company: ${contactData.personalInfo.company || 'Not provided'}

PROJECT DETAILS:
Type: ${contactData.projectInfo.type}
Description: ${contactData.projectInfo.description}
Budget: ${contactData.projectInfo.budget.range}
Timeline: ${contactData.projectInfo.timeline.urgency}

BUSINESS CONTEXT:
Industry: ${contactData.businessContext.industry}
Size: ${contactData.businessContext.size}
Challenges: ${contactData.businessContext.currentChallenges.join(', ')}
Goals: ${contactData.businessContext.goals.join(', ')}

COMMUNICATION:
Preferred: ${contactData.communication.preferredMethod}
Availability: ${contactData.communication.availability.join(', ')}

MICHAEL'S CONTEXT:
- Evening developer (Korean time 9 PM - 1 AM)
- Factory worker by day, coder by night
- AI-powered development tools for efficiency
- SMB-focused with 8 years customer service experience
- Services: Websites ($2k-5k), Mobile ($3k-8k), Automation ($1k-3k), AI ($1.5k-4k)

Provide comprehensive analysis including lead qualification, project assessment,
business fit evaluation, and personalized recommendations.`,
      temperature: 0.2,
    })

    return NextResponse.json({
      success: true,
      analysis,
      contactData: {
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        source: 'portfolio_contact_form',
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid contact form data',
        details: error.format(),
        code: 'CONTACT_VALIDATION_ERROR'
      }, { status: 400 })
    }

    console.error('Contact analysis error:', error)
    return NextResponse.json({
      error: 'Failed to process contact form',
      code: 'CONTACT_PROCESSING_ERROR'
    }, { status: 500 })
  }
}
```

### Pattern 3: AI Tool Implementation for Complex Workflows

#### ✅ Advanced Tool Pattern
```typescript
// src/lib/ai-tools.ts - Reusable AI tools with schemas
import { z } from 'zod'
import { tool } from 'ai'

// Budget estimation tool
export const budgetEstimationTool = tool({
  description: 'Estimate project budget based on requirements and complexity',
  inputSchema: z.object({
    projectType: z.enum(['website', 'mobile', 'automation', 'ai']),
    features: z.array(z.string()),
    complexity: z.enum(['low', 'medium', 'high']),
    timeline: z.string(),
    businessSize: z.enum(['startup', 'small', 'medium', 'large']),
  }),
  execute: async ({ projectType, features, complexity, timeline, businessSize }) => {
    // Base pricing matrix
    const basePricing = {
      website: { low: 2000, medium: 3500, high: 5000 },
      mobile: { low: 3000, medium: 5500, high: 8000 },
      automation: { low: 1000, medium: 2000, high: 3000 },
      ai: { low: 1500, medium: 2750, high: 4000 },
    }

    const basePrice = basePricing[projectType][complexity]

    // Adjust for business size
    const sizeMultiplier = {
      startup: 0.8,  // 20% discount for startups
      small: 1.0,    // Standard pricing
      medium: 1.1,   // 10% premium for medium business
      large: 1.2,    // 20% premium for large business
    }

    const adjustedPrice = basePrice * sizeMultiplier[businessSize]

    return {
      estimatedBudget: {
        min: Math.round(adjustedPrice * 0.9),
        max: Math.round(adjustedPrice * 1.1),
        currency: 'USD',
      },
      breakdown: {
        baseComplexity: basePrice,
        businessSizeAdjustment: sizeMultiplier[businessSize],
        features: features.length * 200, // $200 per additional feature
      },
      timeline: calculateTimeline(complexity, features.length),
      recommendations: generateRecommendations(projectType, complexity),
    }
  },
})

// Service recommendation tool
export const serviceRecommendationTool = tool({
  description: 'Recommend optimal services based on business needs',
  inputSchema: z.object({
    businessType: z.string(),
    currentChallenges: z.array(z.string()),
    goals: z.array(z.string()),
    budget: z.number().positive(),
    techSavviness: z.enum(['low', 'medium', 'high']),
  }),
  execute: async ({ businessType, currentChallenges, goals, budget, techSavviness }) => {
    const serviceMatrix = {
      restaurant: {
        'online_ordering': ['website', 'mobile'],
        'staff_scheduling': ['automation'],
        'customer_engagement': ['ai', 'automation'],
      },
      consulting: {
        'client_onboarding': ['automation', 'ai'],
        'document_processing': ['ai'],
        'scheduling': ['automation'],
      },
      // ... more business types
    }

    return analyzeAndRecommendServices(businessType, currentChallenges, goals, budget)
  },
})

// Usage in API route
export async function POST(req: NextRequest) {
  const input = await req.json()

  const result = await generateText({
    model: openai('gpt-4o-mini'),
    tools: {
      estimateBudget: budgetEstimationTool,
      recommendServices: serviceRecommendationTool,
    },
    messages: [
      {
        role: 'system',
        content: 'You are Michael Jeff Achumbre\'s AI assistant. Use the available tools to provide comprehensive project analysis.',
      },
      {
        role: 'user',
        content: `Please analyze this project and provide budget estimate and service recommendations: ${JSON.stringify(input)}`,
      },
    ],
  })

  return NextResponse.json({ result: result.text, toolCalls: result.toolCalls })
}
```

## 🔧 Utility Patterns for AI Development

### Pattern 4: Response Validation Middleware
```typescript
// src/lib/ai-middleware.ts - Reusable validation patterns
import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'

export function withAIValidation<TInput, TOutput>(
  inputSchema: z.ZodSchema<TInput>,
  outputSchema: z.ZodSchema<TOutput>,
  handler: (input: TInput) => Promise<TOutput>
) {
  return async (req: NextRequest) => {
    try {
      // Validate input
      const rawInput = await req.json()
      const validatedInput = inputSchema.parse(rawInput)

      // Process with validated input
      const result = await handler(validatedInput)

      // Validate output
      const validatedOutput = outputSchema.parse(result)

      return NextResponse.json({
        success: true,
        data: validatedOutput,
        metadata: {
          processedAt: new Date().toISOString(),
          validation: 'passed',
        }
      })

    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({
          error: 'Validation failed',
          details: error.format(),
          code: 'VALIDATION_ERROR'
        }, { status: 400 })
      }

      console.error('AI processing error:', error)
      return NextResponse.json({
        error: 'Processing failed',
        code: 'PROCESSING_ERROR'
      }, { status: 500 })
    }
  }
}

// Usage example
export const POST = withAIValidation(
  ProjectAnalysisInputSchema,
  ProjectAnalysisOutputSchema,
  async (input) => {
    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: ProjectAnalysisOutputSchema,
      prompt: `Analyze: ${input.projectDescription}`,
    })
    return object
  }
)
```

### Pattern 5: Rate Limiting with Zod Validation
```typescript
// src/lib/rate-limiting.ts - Schema-based rate limiting
import { z } from 'zod'

const RateLimitConfigSchema = z.object({
  requests: z.number().positive(),
  windowMs: z.number().positive(),
  identifier: z.string().min(1),
  skipSuccessfulRequests: z.boolean().default(false),
})

export class AIRateLimiter {
  private limits = new Map<string, { count: number; resetTime: number }>()

  constructor(private config: z.infer<typeof RateLimitConfigSchema>) {
    RateLimitConfigSchema.parse(config) // Validate configuration
  }

  async checkLimit(identifier: string): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now()
    const key = `${this.config.identifier}:${identifier}`
    const limit = this.limits.get(key)

    if (!limit || now > limit.resetTime) {
      const resetTime = now + this.config.windowMs
      this.limits.set(key, { count: 1, resetTime })
      return { allowed: true, remaining: this.config.requests - 1, resetTime }
    }

    if (limit.count >= this.config.requests) {
      return { allowed: false, remaining: 0, resetTime: limit.resetTime }
    }

    limit.count++
    return {
      allowed: true,
      remaining: this.config.requests - limit.count,
      resetTime: limit.resetTime
    }
  }
}

// Usage in API routes
const projectAnalysisLimiter = new AIRateLimiter({
  requests: 10,
  windowMs: 60000, // 1 minute
  identifier: 'project-analysis',
})

export async function POST(req: NextRequest) {
  const clientId = req.headers.get('x-forwarded-for') || 'anonymous'
  const rateLimitResult = await projectAnalysisLimiter.checkLimit(clientId)

  if (!rateLimitResult.allowed) {
    return NextResponse.json({
      error: 'Rate limit exceeded',
      resetTime: rateLimitResult.resetTime,
      code: 'RATE_LIMIT_EXCEEDED'
    }, { status: 429 })
  }

  // Continue with AI processing...
}
```

## 🧪 Testing Patterns for AI Features

### Pattern 6: Schema-Based Testing
```typescript
// tests/ai-endpoints.test.ts - Comprehensive AI testing
import { z } from 'zod'
import { ProjectAnalysisInputSchema, ProjectAnalysisOutputSchema } from '@/lib/ai-schemas'

describe('AI Project Analysis', () => {
  test('validates input schema correctly', () => {
    const validInput = {
      projectDescription: 'Build a restaurant ordering system',
      businessType: 'restaurant',
      budget: '$5k-10k',
      timeline: '2 months',
    }

    const result = ProjectAnalysisInputSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  test('rejects invalid input', () => {
    const invalidInput = {
      projectDescription: 'short', // Too short
      businessType: '', // Empty
    }

    const result = ProjectAnalysisInputSchema.safeParse(invalidInput)
    expect(result.success).toBe(false)
    expect(result.error?.issues).toHaveLength(2)
  })

  test('AI response matches output schema', async () => {
    const mockResponse = {
      recommendedServices: ['Modern Website Development'],
      estimatedTimeline: '4-6 weeks',
      budgetRange: '$3,000 - $5,000',
      implementationApproach: 'AI-powered development with Next.js',
      keyBenefits: ['Professional online presence', 'Mobile optimization'],
      complexity: 'medium',
      confidence: 0.85,
    }

    const result = ProjectAnalysisOutputSchema.safeParse(mockResponse)
    expect(result.success).toBe(true)
  })
})
```

## 📊 Monitoring & Analytics Patterns

### Pattern 7: AI Performance Tracking
```typescript
// src/lib/ai-analytics.ts - Performance monitoring
import { z } from 'zod'

const AIMetricsSchema = z.object({
  endpoint: z.string(),
  model: z.string(),
  inputTokens: z.number().nonnegative(),
  outputTokens: z.number().nonnegative(),
  latencyMs: z.number().positive(),
  success: z.boolean(),
  errorCode: z.string().optional(),
  userId: z.string().optional(),
})

export class AIAnalytics {
  private metrics: z.infer<typeof AIMetricsSchema>[] = []

  trackRequest(metrics: z.infer<typeof AIMetricsSchema>) {
    const validated = AIMetricsSchema.parse(metrics)
    this.metrics.push(validated)

    // Log to analytics service
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(validated)
    }
  }

  getMetricsSummary(timeRange: { start: Date; end: Date }) {
    return {
      totalRequests: this.metrics.length,
      successRate: this.calculateSuccessRate(),
      averageLatency: this.calculateAverageLatency(),
      tokenUsage: this.calculateTokenUsage(),
      topEndpoints: this.getTopEndpoints(),
    }
  }

  private sendToAnalytics(metrics: z.infer<typeof AIMetricsSchema>) {
    // Integration with analytics service
    console.log('AI Metrics:', metrics)
  }
}

// Usage in API routes
const analytics = new AIAnalytics()

export async function POST(req: NextRequest) {
  const startTime = Date.now()

  try {
    const result = await generateObject(/* ... */)

    analytics.trackRequest({
      endpoint: '/api/ai/analyze-project',
      model: 'gpt-4o-mini',
      inputTokens: result.usage?.promptTokens || 0,
      outputTokens: result.usage?.completionTokens || 0,
      latencyMs: Date.now() - startTime,
      success: true,
    })

    return NextResponse.json(result)

  } catch (error) {
    analytics.trackRequest({
      endpoint: '/api/ai/analyze-project',
      model: 'gpt-4o-mini',
      inputTokens: 0,
      outputTokens: 0,
      latencyMs: Date.now() - startTime,
      success: false,
      errorCode: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
    })

    throw error
  }
}
```

## 🎯 Implementation Priority Roadmap

### Phase 1: Foundation (Week 1)
1. ✅ **Update existing analyze-project endpoint** with input/output schemas
2. ✅ **Add comprehensive error handling** with Zod validation
3. ✅ **Implement rate limiting** for AI endpoints

### Phase 2: Enhancement (Week 2)
1. ✅ **Migrate to generateObject()** for structured outputs
2. ✅ **Add tool-based workflows** for complex analysis
3. ✅ **Implement analytics tracking** for performance monitoring

### Phase 3: Advanced Features (Week 3)
1. ✅ **Create comprehensive contact analysis** endpoint
2. ✅ **Add multi-step AI workflows** with tool chaining
3. ✅ **Implement advanced validation** patterns

### Phase 4: Production Optimization (Week 4)
1. ✅ **Performance optimization** and caching
2. ✅ **Comprehensive testing** suite
3. ✅ **Documentation** and deployment

## 🎉 Expected Benefits

With these implementation patterns:

- **100% type safety** for all AI interactions
- **Reliable validation** preventing runtime errors
- **Professional error handling** with detailed messages
- **Scalable architecture** supporting complex workflows
- **Performance monitoring** for continuous improvement
- **Maintainable code** with clear patterns and schemas

These patterns transform the basic AI integration into a professional, production-ready system that matches the quality standards demonstrated throughout the portfolio.