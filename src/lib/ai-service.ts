import { generateText } from 'ai'
import { modelConfigs, systemPrompts, validateApiKey, getAvailableProvider } from './ai-config'
import type {
  ProjectAnalysisRequest,
  ProjectAnalysisResponse,
  PersonalizedResponseRequest,
  PersonalizedResponseResponse,
  ServiceRecommendation,
  AIInsight,
  CaseStudyAnalysis,
  APIError
} from './ai-types'

/**
 * Centralized AI Service for Portfolio AI Features
 */
export class AIService {
  private static instance: AIService
  private isConfigured: boolean

  private constructor() {
    this.isConfigured = validateApiKey()
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  /**
   * Check if AI services are properly configured
   */
  public isReady(): boolean {
    return this.isConfigured && getAvailableProvider() !== null
  }

  /**
   * Analyze project requirements and provide recommendations
   */
  public async analyzeProject(request: ProjectAnalysisRequest): Promise<ProjectAnalysisResponse | APIError> {
    if (!this.isReady()) {
      return { error: 'AI service not configured' }
    }

    try {
      const { text } = await generateText({
        ...modelConfigs.balanced,
        messages: [
          {
            role: 'system',
            content: systemPrompts.projectAnalyzer
          },
          {
            role: 'user',
            content: `Analyze this project and provide recommendations in JSON format:
Business Type: ${request.businessType}
Project: ${request.projectDescription}
Budget: ${request.budget || 'Not specified'}
Timeline: ${request.timeline || 'Flexible'}`
          }
        ]
      })

      let analysis
      try {
        analysis = JSON.parse(text)
      } catch {
        // Fallback analysis if JSON parsing fails
        analysis = {
          recommendedServices: ['AI Integration'],
          estimatedTimeline: '2-3 weeks',
          budgetRange: '$2,000 - $4,000',
          implementationApproach: 'AI-powered development approach with focus on SMB needs',
          keyBenefits: ['Professional development', 'AI-powered efficiency', 'SMB-focused solutions'],
          complexity: 'medium'
        }
      }

      return {
        success: true,
        analysis,
        confidence: 0.85
      }

    } catch (error) {
      console.error('Project analysis error:', error)
      return { error: 'Failed to analyze project requirements' }
    }
  }

  /**
   * Generate personalized email response for client inquiries
   */
  public async generatePersonalizedResponse(request: PersonalizedResponseRequest): Promise<PersonalizedResponseResponse | APIError> {
    if (!this.isReady()) {
      return { error: 'AI service not configured' }
    }

    try {
      const { text } = await generateText({
        ...modelConfigs.creative,
        messages: [
          {
            role: 'system',
            content: systemPrompts.responseGenerator
          },
          {
            role: 'user',
            content: `Generate a personalized email response for:
Client: ${request.clientName}
Business: ${request.business || 'Not specified'}
Project: ${request.project}
Timeline: ${request.timeline || 'Flexible'}
Budget: ${request.budget || 'Not specified'}
${request.analysis ? `Previous Analysis: ${JSON.stringify(request.analysis)}` : ''}`
          }
        ]
      })

      // Generate subject line
      const { text: subjectLine } = await generateText({
        ...modelConfigs.fast,
        messages: [
          {
            role: 'system',
            content: 'Generate a professional, personalized email subject line. Keep it under 60 characters and avoid quotes.'
          },
          {
            role: 'user',
            content: `Client: ${request.clientName}, Project: ${request.project.substring(0, 100)}`
          }
        ]
      })

      return {
        success: true,
        response: {
          subject: subjectLine.replace(/"/g, '').trim(),
          body: text,
          estimatedReadTime: Math.ceil(text.split(' ').length / 200),
          tone: 'professional-friendly',
          nextSteps: [
            'Schedule consultation call',
            'Discuss project requirements in detail',
            'Provide detailed proposal and timeline'
          ]
        },
        generatedAt: new Date().toISOString()
      }

    } catch (error) {
      console.error('Response generation error:', error)
      return { error: 'Failed to generate personalized response' }
    }
  }

  /**
   * Get intelligent service recommendations based on client needs
   */
  public async recommendServices(businessType: string, requirements: string, budget?: string): Promise<ServiceRecommendation[] | APIError> {
    if (!this.isReady()) {
      return { error: 'AI service not configured' }
    }

    try {
      const { text } = await generateText({
        ...modelConfigs.precise,
        messages: [
          {
            role: 'system',
            content: systemPrompts.serviceRecommender
          },
          {
            role: 'user',
            content: `Recommend services for:
Business: ${businessType}
Requirements: ${requirements}
Budget: ${budget || 'Not specified'}

Return as JSON array of service recommendations with relevanceScore, reasoning, estimatedCost, timeline, and benefits.`
          }
        ]
      })

      try {
        return JSON.parse(text)
      } catch {
        // Fallback recommendations
        return [
          {
            id: 'ai-integration',
            serviceName: 'AI Integration & Enhancement',
            relevanceScore: 0.8,
            reasoning: 'Based on your requirements, AI integration could provide significant value.',
            estimatedCost: { min: 1500, max: 4000 },
            timeline: '1-2 weeks',
            benefits: ['Automated processes', 'Improved efficiency', 'Modern technology stack']
          }
        ]
      }

    } catch (error) {
      console.error('Service recommendation error:', error)
      return { error: 'Failed to generate service recommendations' }
    }
  }

  /**
   * Analyze case studies for relevance to client needs
   */
  public async analyzeCaseStudyRelevance(clientNeeds: string, caseStudyId: string = 'gracekimkor'): Promise<CaseStudyAnalysis | APIError> {
    if (!this.isReady()) {
      return { error: 'AI service not configured' }
    }

    try {
      const { text } = await generateText({
        ...modelConfigs.precise,
        messages: [
          {
            role: 'system',
            content: systemPrompts.caseStudyExplainer
          },
          {
            role: 'user',
            content: `Analyze the relevance of the gracekimkor.com case study to these client needs:
${clientNeeds}

Provide JSON response with:
- complexity assessment
- technicalStack used
- businessImpact achieved
- lessonsLearned
- applicability score (0-1) and reasoning`
          }
        ]
      })

      try {
        const analysis = JSON.parse(text)
        return {
          projectId: caseStudyId,
          ...analysis
        }
      } catch {
        return {
          projectId: caseStudyId,
          complexity: 'medium',
          technicalStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Radix UI'],
          businessImpact: ['Professional credibility', 'Client confidence', 'Competitive positioning'],
          lessonsLearned: ['AI-powered development efficiency', 'Evening development focus', 'SMB client needs'],
          applicability: {
            score: 0.7,
            reasoning: 'Similar technical requirements and business objectives'
          }
        }
      }

    } catch (error) {
      console.error('Case study analysis error:', error)
      return { error: 'Failed to analyze case study relevance' }
    }
  }

  /**
   * Generate AI insights for dashboard or analytics
   */
  public async generateInsights(data: Record<string, unknown>): Promise<AIInsight[] | APIError> {
    if (!this.isReady()) {
      return { error: 'AI service not configured' }
    }

    try {
      const { text } = await generateText({
        ...modelConfigs.balanced,
        messages: [
          {
            role: 'system',
            content: 'You generate actionable business insights for a developer portfolio based on data patterns. Focus on practical recommendations for improving client conversion and business growth.'
          },
          {
            role: 'user',
            content: `Generate insights from this data: ${JSON.stringify(data)}`
          }
        ]
      })

      try {
        return JSON.parse(text)
      } catch {
        // Fallback insights
        return [
          {
            type: 'opportunity',
            message: 'Consider showcasing more AI integration examples to attract tech-forward clients.',
            confidence: 0.8,
            actionable: true,
            suggestedAction: 'Add AI integration case studies or demos'
          }
        ]
      }

    } catch (error) {
      console.error('Insights generation error:', error)
      return { error: 'Failed to generate insights' }
    }
  }

  /**
   * Utility method to check AI service health
   */
  public async healthCheck(): Promise<{ status: 'healthy' | 'error', provider?: string, error?: string }> {
    if (!this.isReady()) {
      return { status: 'error', error: 'AI service not configured' }
    }

    try {
      const provider = getAvailableProvider()
      await generateText({
        ...modelConfigs.fast,
        messages: [
          {
            role: 'user',
            content: 'Health check: respond with "OK"'
          }
        ]
      })

      return {
        status: 'healthy',
        provider: provider || undefined
      }

    } catch {
      return {
        status: 'error',
        error: 'AI service unavailable'
      }
    }
  }
}

// Export singleton instance
export const aiService = AIService.getInstance()