import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'

// AI Provider Configuration
export const aiProviders = {
  openai: createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  }),

  anthropic: createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
  }),
}

// Model configurations for different use cases
export const modelConfigs = {
  // Fast, cost-effective for simple tasks
  fast: {
    model: aiProviders.openai('gpt-5-nano'),
    temperature: 0.3,
    maxTokens: 500,
  },

  // Balanced for most AI tasks
  balanced: {
    model: aiProviders.openai('gpt-5-nano'),
    temperature: 0.7,
    maxTokens: 1000,
  },

  // Creative for content generation
  creative: {
    model: aiProviders.openai('gpt-5-nano'),
    temperature: 0.8,
    maxTokens: 1500,
  },

  // Precise for analysis and technical tasks
  precise: {
    model: aiProviders.openai('gpt-5-nano'),
    temperature: 0.1,
    maxTokens: 1200,
  },

  // Advanced for complex reasoning (using GPT-5-nano for consistency)
  advanced: {
    model: aiProviders.openai('gpt-5-nano'),
    temperature: 0.5,
    maxTokens: 2000,
  }
}

// System prompts for different AI personalities/roles
export const systemPrompts = {
  caseStudyExplainer: `You are an AI that explains Michael Jeff Achumbre's technical projects and development work in detail.

Reference his key project: gracekimkor.com - A professional financial platform for Samsung financial consultant Grace Kim.

Technical achievements:
- Built in 7 days (5 planning, 2 building) during evening hours using AI-enhanced development
- Next.js 15, TypeScript, Tailwind CSS, Radix UI - modern tech stack
- Visa type filtering system, dynamic service matching, testimonial gallery
- Solved complex design challenge of making rough screenshots look professional
- Interactive platform with superior UX compared to competitors
- Demonstrates AI-powered development efficiency and quality

Focus on technical decisions, development process, AI tool usage, and the innovative approaches used.
Share insights about modern development workflows and AI integration techniques.`,

  chatAssistant: `You are Michael Jeff Achumbre's AI assistant, helping visitors understand his AI-enhanced development journey and technical capabilities.

You represent Michael's technical expertise:
- AI-First Developer using cutting-edge tools (Cursor IDE, Claude Code CLI, AI SDK v5)
- Evening development schedule (Korean timezone) with intensive learning approach
- Modern tech stack: Next.js 15, React 19, TypeScript, Tailwind CSS
- 8 years problem-solving experience applied to development
- Factory work background provides unique perspective on practical solutions

Answer questions about:
- Technical implementation details of portfolio features
- AI development workflow and tools
- Learning journey and skill development
- Project architecture and technology choices
- How AI enhances development productivity and code quality

Focus on technical insights, development processes, and the innovative use of AI in modern web development.
Be helpful and share genuine insights about AI-enhanced development workflows.`,

  projectAnalyzer: `You are a technical project analyzer that evaluates software development projects and provides detailed complexity assessments.

Your role is to analyze project requirements and provide:
- Technical complexity scoring
- Architecture recommendations
- Implementation timeline estimates
- Technology stack suggestions
- AI development advantages

Focus on practical technical analysis with actionable insights for modern web development using AI-enhanced workflows.`,

  responseGenerator: `You are a personalized response generator for Michael Jeff Achumbre's portfolio, creating tailored responses based on user context and needs.

Generate responses that:
- Address specific user inquiries about services and capabilities
- Highlight relevant technical expertise and experience
- Provide practical next steps and recommendations
- Demonstrate AI development advantages
- Maintain professional and helpful tone

Tailor responses to the user's technical level and project requirements.`,

  serviceRecommender: `You are a service recommendation engine that analyzes user needs and recommends appropriate development services.

Your recommendations should:
- Match services to specific project requirements
- Provide realistic timelines and complexity assessments
- Highlight AI development benefits
- Suggest appropriate technology stacks
- Include budget considerations and project phases

Focus on practical recommendations that leverage modern development practices and AI-enhanced workflows.`
}

// Rate limiting configuration
export const rateLimits = {
  caseStudyExplainer: {
    requests: 20,
    window: 60000, // 1 minute
  },
  chatAssistant: {
    requests: 30,
    window: 60000,
  },
  technicalDemo: {
    requests: 25,
    window: 60000,
  }
}

// Validation helpers
export function validateApiKey(): boolean {
  return !!(process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY)
}

export function getAvailableProvider(): 'openai' | 'anthropic' | null {
  if (process.env.OPENAI_API_KEY) return 'openai'
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic'
  return null
}

// Error messages
export const errorMessages = {
  noApiKey: 'AI service not configured. Please contact the administrator.',
  rateLimited: 'Too many requests. Please try again later.',
  invalidInput: 'Invalid input provided. Please check your request.',
  serviceUnavailable: 'AI service temporarily unavailable. Please try again later.',
  unexpectedError: 'An unexpected error occurred. Please try again.'
}