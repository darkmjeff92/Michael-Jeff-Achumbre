'use client'

import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import { HoverScale, FadeIn, SlideIn, LightningPulse, GradientShine } from "@/components/animated-elements"

interface ServiceRecommendation {
  serviceId: string
  serviceName: string
  relevanceScore: number
  reasoning: string
  businessBenefits?: string[]
  estimatedROI?: string
  implementationNotes?: string
  sequencing?: string
}

interface PackageSuggestion {
  name: string
  services: string[]
  combinedPricing: { min: number; max: number }
  timeline: string
  benefits: string
}

interface Insight {
  type: 'opportunity' | 'consideration' | 'tip'
  message: string
}

interface RecommendationResponse {
  primaryRecommendation: ServiceRecommendation
  additionalRecommendations: ServiceRecommendation[]
  packageSuggestion?: PackageSuggestion
  insights: Insight[]
}

interface SmartServiceRecommendationsProps {
  context?: 'hero' | 'about' | 'services' | 'case-study' | 'contact'
  title?: string
  subtitle?: string
  compact?: boolean
  autoTrigger?: boolean
}

const serviceIcons = {
  website: '🌐',
  mobile: '📱',
  automation: '⚙️',
  ai: '🤖'
}

const insightIcons = {
  opportunity: '💡',
  consideration: '⚠️',
  tip: '💬'
}

const contextPrompts = {
  hero: "I'm exploring development services for my business",
  about: "I'm interested in working with an AI-powered developer",
  services: "I want to understand which services would benefit my business most",
  'case-study': "I'm impressed by the case study and want similar results",
  contact: "I'm ready to start a project and need service recommendations"
}

export function SmartServiceRecommendations({
  context = 'services',
  title = "Get Personalized Service Recommendations",
  subtitle = "AI-powered suggestions based on your business needs",
  compact = false,
  autoTrigger = false
}: SmartServiceRecommendationsProps) {
  const [businessType, setBusinessType] = useState('')
  const [challenges, setChallenges] = useState('')
  const [budget, setBudget] = useState('')
  const [showForm, setShowForm] = useState(!autoTrigger)
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null)
  const [isPending, startTransition] = useTransition()

  const getRecommendations = (customBusinessType?: string, customChallenges?: string) => {
    const businessInput = customBusinessType || businessType
    if (!businessInput.trim()) return

    startTransition(async () => {
      try {
        const response = await fetch('/api/ai/recommend-services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessType: businessInput,
            currentChallenges: customChallenges || challenges,
            budget,
            timeline: 'flexible',
            context: context,
            goals: contextPrompts[context]
          })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setRecommendations(data.recommendations)
            setShowForm(false)
          }
        }
      } catch (error) {
        console.error('Failed to get service recommendations:', error)
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    getRecommendations()
  }

  const handleQuickRecommendation = (businessType: string, challenge: string) => {
    setBusinessType(businessType)
    setChallenges(challenge)
    getRecommendations(businessType, challenge)
  }

  const resetRecommendations = () => {
    setRecommendations(null)
    setShowForm(true)
    setBusinessType('')
    setChallenges('')
    setBudget('')
  }

  if (recommendations) {
    return (
      <div className="space-y-6">
        {/* Primary Recommendation */}
        <SlideIn direction="up" delay={0.1}>
          <Card className="bg-gradient-to-br from-lightning-dark via-lightning-gray to-lightning-dark border-lightning-yellow">
            <CardHeader>
              <CardTitle className="text-lightning-yellow flex items-center gap-2">
                <span>{serviceIcons[recommendations.primaryRecommendation.serviceId as keyof typeof serviceIcons]}</span>
                Recommended for You: {recommendations.primaryRecommendation.serviceName}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {Math.round(recommendations.primaryRecommendation.relevanceScore * 100)}% Match
                </Badge>
                {recommendations.primaryRecommendation.estimatedROI && (
                  <Badge className="bg-lightning-yellow/20 text-lightning-yellow border-lightning-yellow/30">
                    ROI: {recommendations.primaryRecommendation.estimatedROI}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">{recommendations.primaryRecommendation.reasoning}</p>

              {recommendations.primaryRecommendation.businessBenefits && (
                <div>
                  <h4 className="font-semibold text-lightning-orange mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {recommendations.primaryRecommendation.businessBenefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations.primaryRecommendation.implementationNotes && (
                <div className="p-3 bg-lightning-yellow/10 rounded-lg border border-lightning-yellow/20">
                  <p className="text-sm text-gray-300">
                    <strong className="text-lightning-yellow">Implementation:</strong> {recommendations.primaryRecommendation.implementationNotes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </SlideIn>

        {/* Additional Recommendations */}
        {recommendations.additionalRecommendations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-lightning-orange mb-4">Additional Services to Consider</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.additionalRecommendations.map((rec, index) => (
                <FadeIn key={rec.serviceId} delay={0.2 + index * 0.1}>
                  <HoverScale scale={1.02}>
                    <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/30 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{serviceIcons[rec.serviceId as keyof typeof serviceIcons]}</span>
                          <h4 className="font-semibold text-lightning-yellow">{rec.serviceName}</h4>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{rec.reasoning}</p>
                        {rec.sequencing && (
                          <Badge variant="outline" className="text-xs border-lightning-gray text-gray-400">
                            {rec.sequencing}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </HoverScale>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* Package Suggestion */}
        {recommendations.packageSuggestion && (
          <SlideIn direction="up" delay={0.4}>
            <Card className="bg-gradient-to-r from-lightning-gray to-lightning-dark border-lightning-orange/50">
              <CardHeader>
                <CardTitle className="text-lightning-orange flex items-center gap-2">
                  📦 Recommended Package: {recommendations.packageSuggestion.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Combined Pricing</p>
                    <p className="font-semibold text-lightning-yellow">
                      ${recommendations.packageSuggestion.combinedPricing.min.toLocaleString()} - ${recommendations.packageSuggestion.combinedPricing.max.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Timeline</p>
                    <p className="font-semibold text-lightning-yellow">{recommendations.packageSuggestion.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Services</p>
                    <div className="flex gap-1">
                      {recommendations.packageSuggestion.services.map(serviceId => (
                        <span key={serviceId} className="text-lg">
                          {serviceIcons[serviceId as keyof typeof serviceIcons]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">{recommendations.packageSuggestion.benefits}</p>
              </CardContent>
            </Card>
          </SlideIn>
        )}

        {/* Insights */}
        {recommendations.insights.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-lightning-orange mb-4">AI Insights</h3>
            <div className="space-y-3">
              {recommendations.insights.map((insight, index) => (
                <FadeIn key={index} delay={0.3 + index * 0.1}>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-lightning-dark/50 border border-lightning-gray/50">
                    <span className="text-lg">{insightIcons[insight.type]}</span>
                    <p className="text-sm text-gray-300">{insight.message}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-lightning-gray">
          <LightningPulse>
            <GradientShine>
              <Button
                asChild
                size="lg"
                className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
              >
                <a href="#contact">Get Started with These Services</a>
              </Button>
            </GradientShine>
          </LightningPulse>

          <Button
            variant="outline"
            size="lg"
            onClick={resetRecommendations}
            className="border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow"
          >
            Get New Recommendations
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-lightning-yellow flex items-center gap-2">
            <span>🤖</span> {title}
          </CardTitle>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </CardHeader>
        <CardContent>
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-lightning-orange mb-2">
                  What type of business do you have?
                </label>
                <Input
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g., Restaurant, Consulting firm, E-commerce store, Tech startup"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lightning-orange mb-2">
                  What&apos;s your biggest challenge right now? (Optional)
                </label>
                <Input
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="e.g., No online presence, Manual processes, Poor customer experience"
                />
              </div>

              {!compact && (
                <div>
                  <label className="block text-sm font-medium text-lightning-orange mb-2">
                    Budget Range (Optional)
                  </label>
                  <Input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., $2,000-5,000, Under $3,000, Flexible"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending || !businessType.trim()}
                className="w-full bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" />
                    Analyzing...
                  </div>
                ) : (
                  'Get AI Recommendations'
                )}
              </Button>
            </form>
          ) : null}

          {/* Quick Options */}
          {showForm && !compact && (
            <div className="mt-6 pt-6 border-t border-lightning-gray">
              <p className="text-sm text-gray-400 mb-3">Or get quick recommendations:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { business: "Small Restaurant", challenge: "Need online ordering system" },
                  { business: "Consulting Firm", challenge: "Manual client processes" },
                  { business: "Retail Store", challenge: "No e-commerce presence" },
                  { business: "Service Business", challenge: "Poor customer communication" }
                ].map((option, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickRecommendation(option.business, option.challenge)}
                    disabled={isPending}
                    className="text-left justify-start text-xs p-2 h-auto hover:bg-lightning-yellow/10 hover:text-lightning-yellow text-gray-400"
                  >
                    {option.business}: {option.challenge}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}