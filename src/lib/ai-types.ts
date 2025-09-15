// AI Types for Portfolio AI Integration

export interface ProjectAnalysisRequest {
  projectDescription: string
  businessType: string
  budget?: string
  timeline?: string
}

export interface ProjectAnalysisResponse {
  success: boolean
  analysis: {
    recommendedServices: string[]
    estimatedTimeline: string
    budgetRange: string
    implementationApproach: string
    keyBenefits: string[]
    complexity?: 'low' | 'medium' | 'high'
    riskFactors?: string[]
  }
  confidence: number
}

export interface BudgetEstimationRequest {
  projectType: string
  requirements: string
  complexity?: 'low' | 'medium' | 'high'
  timeline?: string
}

export interface BudgetEstimationResponse {
  success: boolean
  estimation: {
    estimatedBudget: {
      min: number
      max: number
    }
    timeline: {
      min: number
      max: number
    }
    complexity: 'low' | 'medium' | 'high'
    breakdown: string[]
    justification: string
  }
  timestamp: string
}

export interface PersonalizedResponseRequest {
  clientName: string
  business?: string
  project: string
  timeline?: string
  budget?: string
  analysis?: ProjectAnalysisResponse['analysis']
}

export interface PersonalizedResponseResponse {
  success: boolean
  response: {
    subject: string
    body: string
    estimatedReadTime: number
    tone: string
    nextSteps: string[]
  }
  generatedAt: string
}

export interface ServiceRecommendation {
  id: string
  serviceName: string
  relevanceScore: number
  reasoning: string
  estimatedCost: {
    min: number
    max: number
  }
  timeline: string
  benefits: string[]
}

export interface AIInsight {
  type: 'recommendation' | 'warning' | 'opportunity' | 'insight'
  message: string
  confidence: number
  actionable: boolean
  suggestedAction?: string
}

export interface ClientProfile {
  businessType: string
  industry?: string
  size: 'startup' | 'small' | 'medium' | 'enterprise'
  needs: string[]
  budget: {
    min: number
    max: number
    flexibility: 'low' | 'medium' | 'high'
  }
  timeline: {
    urgency: 'low' | 'medium' | 'high'
    preferredStart: string
  }
  communicationPreference: 'email' | 'phone' | 'video' | 'chat'
}

export interface CaseStudyAnalysis {
  projectId: string
  complexity: 'low' | 'medium' | 'high'
  technicalStack: string[]
  businessImpact: string[]
  lessonsLearned: string[]
  applicability: {
    score: number
    reasoning: string
  }
}

export interface AutomationOpportunity {
  processName: string
  currentEffort: {
    timePerWeek: number
    complexity: 'low' | 'medium' | 'high'
  }
  automationPotential: {
    timesSaved: number
    costSaved: number
    implementationCost: number
    roi: number
  }
  recommendedTools: string[]
  implementationSteps: string[]
}

export interface VisitorInsight {
  sessionId: string
  timestamp: string
  pageViews: string[]
  timeOnSite: number
  interests: string[]
  behaviorPattern: 'researcher' | 'browser' | 'decision-maker' | 'comparison-shopper'
  conversionProbability: number
  recommendedFollowUp: string
}

export interface AIConfiguration {
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
}

export interface APIError {
  error: string
  code?: string
  details?: unknown
}

// Utility type for API responses
export type AIApiResponse<T> = T | { error: string; code?: string }

// Service type mapping
export const ServiceTypes = {
  WEBSITE: 'Modern Website Development',
  MOBILE: 'Mobile App Development',
  AUTOMATION: 'Smart Automation Setup',
  AI_INTEGRATION: 'AI Integration & Enhancement'
} as const

export type ServiceType = typeof ServiceTypes[keyof typeof ServiceTypes]

// Complexity levels
export const ComplexityLevels = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const

export type ComplexityLevel = typeof ComplexityLevels[keyof typeof ComplexityLevels]

// Business sizes
export const BusinessSizes = {
  STARTUP: 'startup',
  SMALL: 'small',
  MEDIUM: 'medium',
  ENTERPRISE: 'enterprise'
} as const

export type BusinessSize = typeof BusinessSizes[keyof typeof BusinessSizes]