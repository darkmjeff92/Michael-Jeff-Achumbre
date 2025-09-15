'use client'

import { useState, useTransition, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import { HoverScale, FadeIn, SlideIn, LightningPulse } from "@/components/animated-elements"
import type { ProjectAnalysisResponse, BudgetEstimationResponse } from "@/lib/ai-types"

interface FormData {
  name: string
  email: string
  business: string
  project: string
  timeline: string
  budget: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

interface AIAnalysis {
  projectAnalysis?: ProjectAnalysisResponse['analysis']
  budgetEstimate?: BudgetEstimationResponse['estimation'] | null
  isAnalyzing: boolean
  lastAnalyzedProject: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  business: '',
  project: '',
  timeline: '',
  budget: '',
  message: ''
}

const initialAIAnalysis: AIAnalysis = {
  isAnalyzing: false,
  lastAnalyzedProject: ''
}

export function AIEnhancedContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [aiAnalysis, setAIAnalysis] = useState<AIAnalysis>(initialAIAnalysis)

  // Debounced AI analysis trigger
  const analyzeProject = useCallback(async (projectDescription: string, businessType: string) => {
    if (!projectDescription.trim() || !businessType.trim()) return
    if (projectDescription === aiAnalysis.lastAnalyzedProject) return
    if (projectDescription.length < 50) return // Wait for substantial input

    setAIAnalysis(prev => ({ ...prev, isAnalyzing: true }))

    try {
      // Call project analysis API
      const analysisResponse = await fetch('/api/ai/analyze-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription,
          businessType,
          budget: formData.budget,
          timeline: formData.timeline
        })
      })

      if (analysisResponse.ok) {
        const analysisData: ProjectAnalysisResponse = await analysisResponse.json()

        // Call budget estimation API if analysis was successful
        if (analysisData.success) {
          const budgetResponse = await fetch('/api/ai/estimate-budget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              projectType: analysisData.analysis.recommendedServices[0] || 'website',
              requirements: projectDescription,
              complexity: analysisData.analysis.complexity || 'medium',
              timeline: formData.timeline
            })
          })

          let budgetData = null
          if (budgetResponse.ok) {
            const budgetResult: BudgetEstimationResponse = await budgetResponse.json()
            if (budgetResult.success) {
              budgetData = budgetResult.estimation
            }
          }

          setAIAnalysis({
            projectAnalysis: analysisData.analysis,
            budgetEstimate: budgetData,
            isAnalyzing: false,
            lastAnalyzedProject: projectDescription
          })
        }
      }
    } catch (error) {
      console.error('AI analysis error:', error)
    } finally {
      setAIAnalysis(prev => ({ ...prev, isAnalyzing: false }))
    }
  }, [aiAnalysis.lastAnalyzedProject, formData.budget, formData.timeline])

  // Debounce effect for project analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.project && formData.business) {
        analyzeProject(formData.project, formData.business)
      }
    }, 2000) // 2 second delay

    return () => clearTimeout(timer)
  }, [formData.project, formData.business, analyzeProject])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.business.trim()) {
      newErrors.business = 'Business description is required'
    }

    if (!formData.project.trim()) {
      newErrors.project = 'Project description is required'
    } else if (formData.project.trim().length < 20) {
      newErrors.project = 'Please provide more details about your project (at least 20 characters)'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details in your message (at least 10 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    startTransition(async () => {
      try {
        // Generate personalized response using AI
        let aiResponseBody = ''

        if (aiAnalysis.projectAnalysis) {
          const responseData = await fetch('/api/ai/generate-response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clientName: formData.name,
              business: formData.business,
              project: formData.project,
              timeline: formData.timeline,
              budget: formData.budget,
              analysis: aiAnalysis.projectAnalysis
            })
          })

          if (responseData.ok) {
            const response = await responseData.json()
            if (response.success) {
              aiResponseBody = `\n\n--- AI ANALYSIS ---\n${JSON.stringify(response.response, null, 2)}`
            }
          }
        }

        // Create enhanced mailto URL with AI insights
        const subject = encodeURIComponent(`Project Inquiry - ${formData.business}`)
        const body = encodeURIComponent(`
Hi Michael,

I'm interested in working with you on a project. Here are the details:

Name: ${formData.name}
Email: ${formData.email}
Business: ${formData.business}

Project Description:
${formData.project}

Timeline: ${formData.timeline || 'Not specified'}
Budget Range: ${formData.budget || 'Not specified'}

Additional Message:
${formData.message}

${aiAnalysis.projectAnalysis ? `
--- AI RECOMMENDATIONS ---
Recommended Services: ${aiAnalysis.projectAnalysis.recommendedServices.join(', ')}
Estimated Timeline: ${aiAnalysis.projectAnalysis.estimatedTimeline}
Budget Range: ${aiAnalysis.projectAnalysis.budgetRange}
Key Benefits: ${aiAnalysis.projectAnalysis.keyBenefits.join(', ')}
` : ''}

${aiAnalysis.budgetEstimate ? `
--- BUDGET ESTIMATION ---
Estimated Cost: $${aiAnalysis.budgetEstimate.estimatedBudget.min} - $${aiAnalysis.budgetEstimate.estimatedBudget.max}
Timeline: ${aiAnalysis.budgetEstimate.timeline.min}-${aiAnalysis.budgetEstimate.timeline.max} weeks
Complexity: ${aiAnalysis.budgetEstimate.complexity}
` : ''}

Looking forward to hearing from you!

Best regards,
${formData.name}${aiResponseBody}
        `)

        // Open email client
        window.location.href = `mailto:michaeljeffachumbre@gmail.com?subject=${subject}&body=${body}`

        // Show success message
        setIsSubmitted(true)

        // Reset form after a delay
        setTimeout(() => {
          setFormData(initialFormData)
          setAIAnalysis(initialAIAnalysis)
          setIsSubmitted(false)
        }, 5000)

      } catch (error) {
        console.error('Error submitting form:', error)
        setErrors({ submit: 'Failed to send message. Please try again or contact directly via email.' })
      }
    })
  }

  if (isSubmitted) {
    return (
      <FadeIn>
        <Card className="bg-lightning-dark border-lightning-gray">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🤖✅</div>
            <h3 className="text-xl font-semibold text-lightning-yellow mb-4">
              AI-Enhanced Message Sent!
            </h3>
            <p className="text-gray-300 mb-4">
              Your email client opened with a pre-filled message including AI analysis and recommendations.
              If it didn&apos;t open, please contact me directly at michaeljeffachumbre@gmail.com
            </p>
            <p className="text-sm text-gray-400">
              I&apos;ll respond within 24 hours with a personalized proposal based on the AI insights.
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Contact Form */}
      <HoverScale scale={1.01}>
        <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-lightning-yellow text-center flex items-center justify-center gap-2">
              <span>🤖</span> AI-Powered Project Inquiry
            </CardTitle>
            <p className="text-gray-400 text-center text-sm">
              Get instant AI analysis and recommendations as you describe your project
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 tablet:grid-cols-2 fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-lightning-orange">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    placeholder="Your full name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-400 text-sm" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-lightning-orange">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="your@email.com"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-400 text-sm" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Business Description */}
              <div className="space-y-2">
                <Label htmlFor="business">
                  Business Description <span className="text-lightning-orange">*</span>
                </Label>
                <Input
                  id="business"
                  type="text"
                  value={formData.business}
                  onChange={handleInputChange('business')}
                  placeholder="Brief description of your business (e.g., Small restaurant, Tech startup, Consulting firm)"
                  aria-describedby={errors.business ? "business-error" : undefined}
                  className={errors.business ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.business && (
                  <p id="business-error" className="text-red-400 text-sm" role="alert">
                    {errors.business}
                  </p>
                )}
              </div>

              {/* Project Description with AI Analysis Trigger */}
              <div className="space-y-2">
                <Label htmlFor="project" className="flex items-center gap-2">
                  Project Description <span className="text-lightning-orange">*</span>
                  {aiAnalysis.isAnalyzing && (
                    <span className="flex items-center gap-1 text-xs text-lightning-yellow">
                      <LoadingSpinner size="sm" />
                      AI analyzing...
                    </span>
                  )}
                </Label>
                <Textarea
                  id="project"
                  value={formData.project}
                  onChange={handleInputChange('project')}
                  placeholder="What would you like me to build or improve? Be as detailed as possible - the AI will analyze your requirements and provide instant recommendations..."
                  rows={4}
                  aria-describedby={errors.project ? "project-error" : undefined}
                  className={errors.project ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.project && (
                  <p id="project-error" className="text-red-400 text-sm" role="alert">
                    {errors.project}
                  </p>
                )}
                {formData.project.length > 20 && (
                  <p className="text-xs text-gray-500">
                    Keep typing for AI analysis... ({formData.project.length} characters)
                  </p>
                )}
              </div>

              {/* Timeline and Budget Row */}
              <div className="grid grid-cols-1 tablet:grid-cols-2 fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8">
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline (Optional)</Label>
                  <Input
                    id="timeline"
                    type="text"
                    value={formData.timeline}
                    onChange={handleInputChange('timeline')}
                    placeholder="When do you need this completed?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range (Optional)</Label>
                  <Input
                    id="budget"
                    type="text"
                    value={formData.budget}
                    onChange={handleInputChange('budget')}
                    placeholder="Your budget range (USD)"
                  />
                </div>
              </div>

              {/* Additional Message */}
              <div className="space-y-2">
                <Label htmlFor="message">
                  Additional Message <span className="text-lightning-orange">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  placeholder="Anything else you'd like me to know? Best times to contact you, specific requirements, etc."
                  rows={3}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={errors.message ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-400 text-sm" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="text-red-400 text-sm text-center p-3 bg-red-500/10 border border-red-500/20 rounded">
                  {errors.submit}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <LightningPulse>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    {isPending ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="sm" />
                        Sending AI-Enhanced Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>🤖</span>
                        Send AI-Enhanced Message
                      </div>
                    )}
                  </Button>
                </LightningPulse>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to be contacted via email about your project inquiry.
                AI analysis is provided for enhanced service recommendations.
              </p>
            </form>
          </CardContent>
        </Card>
      </HoverScale>

      {/* AI Analysis Results */}
      {(aiAnalysis.projectAnalysis || aiAnalysis.budgetEstimate) && (
        <SlideIn direction="up" delay={0.2}>
          <Card className="bg-gradient-to-br from-lightning-dark to-lightning-gray border-lightning-yellow/50">
            <CardHeader>
              <CardTitle className="text-lightning-yellow flex items-center gap-2">
                <span>🤖</span> AI Project Analysis
              </CardTitle>
              <p className="text-gray-300 text-sm">
                Instant recommendations based on your project description
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recommended Services */}
              {aiAnalysis.projectAnalysis && (
                <FadeIn delay={0.1}>
                  <div>
                    <h4 className="font-semibold text-lightning-orange mb-3">Recommended Services</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {aiAnalysis.projectAnalysis.recommendedServices.map((service, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-lightning-yellow/10 text-lightning-yellow border border-lightning-yellow/30"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Estimated Timeline</p>
                        <p className="text-lightning-yellow font-semibold">{aiAnalysis.projectAnalysis.estimatedTimeline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Budget Range</p>
                        <p className="text-lightning-yellow font-semibold">{aiAnalysis.projectAnalysis.budgetRange}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Budget Breakdown */}
              {aiAnalysis.budgetEstimate && (
                <FadeIn delay={0.2}>
                  <div className="border-t border-lightning-gray pt-4">
                    <h4 className="font-semibold text-lightning-orange mb-3">Detailed Budget Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Project Cost</p>
                        <p className="text-lightning-yellow font-semibold">
                          ${aiAnalysis.budgetEstimate.estimatedBudget.min.toLocaleString()} - ${aiAnalysis.budgetEstimate.estimatedBudget.max.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Timeline</p>
                        <p className="text-lightning-yellow font-semibold">
                          {aiAnalysis.budgetEstimate.timeline.min}-{aiAnalysis.budgetEstimate.timeline.max} weeks
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Complexity</p>
                        <p className="text-lightning-yellow font-semibold capitalize">
                          {aiAnalysis.budgetEstimate.complexity}
                        </p>
                      </div>
                    </div>
                    {aiAnalysis.budgetEstimate.breakdown && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">What&apos;s included:</p>
                        <ul className="space-y-1">
                          {aiAnalysis.budgetEstimate.breakdown.map((item, index) => (
                            <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                              <div className="w-1 h-1 bg-lightning-yellow rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </FadeIn>
              )}

              {/* Key Benefits */}
              {aiAnalysis.projectAnalysis?.keyBenefits && (
                <FadeIn delay={0.3}>
                  <div className="border-t border-lightning-gray pt-4">
                    <h4 className="font-semibold text-lightning-orange mb-3">Key Benefits for Your Business</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {aiAnalysis.projectAnalysis.keyBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-green-400">✅</span>
                          <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              <div className="text-center pt-4 border-t border-lightning-gray">
                <p className="text-xs text-gray-500">
                  💡 This analysis is included automatically in your message to provide better service recommendations
                </p>
              </div>
            </CardContent>
          </Card>
        </SlideIn>
      )}
    </div>
  )
}