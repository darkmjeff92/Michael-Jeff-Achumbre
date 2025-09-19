'use client'

import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import { HoverScale, FadeIn, SlideIn, LightningPulse, GradientShine } from "@/components/animated-elements"

interface TechnicalAnalysis {
  overallComplexity: 'low' | 'medium' | 'high'
  complexityScore: number
  technicalFactors: {
    factor: string
    complexity: 'low' | 'medium' | 'high'
    description: string
    technicalReasoning: string
  }[]
  architectureRecommendations: {
    category: 'frontend' | 'backend' | 'database' | 'deployment'
    technology: string
    reasoning: string
    aiEnhancement: string
  }[]
  implementationPhases: {
    phase: string
    description: string
    technologies: string[]
    aiTools: string[]
  }[]
  aiDevelopmentApproach: {
    toolsUsed: string[]
    efficiencyGains: string
    qualityImprovements: string
    innovativeFeatures: string[]
  }
}

interface ProjectComplexityAnalyzerProps {
  title?: string
  subtitle?: string
  compact?: boolean
  onAnalysisComplete?: (analysis: TechnicalAnalysis) => void
}

const projectTypes = [
  { value: 'website', label: '🌐 Website', description: 'Professional websites and web applications' },
  { value: 'mobile', label: '📱 Mobile App', description: 'iOS and Android mobile applications' },
  { value: 'automation', label: '⚙️ Automation', description: 'Workflow automation and process optimization' },
  { value: 'ai', label: '🤖 AI Integration', description: 'AI-powered features and intelligent systems' }
]

const complexityColors = {
  low: 'bg-green-500/20 text-green-400 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  high: 'bg-red-500/20 text-red-400 border-red-500/30'
}

const categoryIcons = {
  frontend: '🎨',
  backend: '⚙️',
  database: '🗄️',
  deployment: '🚀'
}

export function ProjectComplexityAnalyzer({
  title = "Technical Complexity Analyzer",
  subtitle = "AI-powered analysis of technical architecture and implementation approach",
  compact = false,
  onAnalysisComplete
}: ProjectComplexityAnalyzerProps) {
  const [projectType, setProjectType] = useState('website')
  const [projectDescription, setProjectDescription] = useState('')
  const [technicalRequirements, setTechnicalRequirements] = useState('')
  const [analysis, setAnalysis] = useState<TechnicalAnalysis | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleAnalyze = () => {
    if (!projectDescription.trim()) return

    startTransition(async () => {
      try {
        const response = await fetch('/api/ai/analyze-complexity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectDescription,
            projectType,
            requirements: requirements.split(',').map(r => r.trim()).filter(Boolean),
            technicalRequirements
          })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setAnalysis(data.analysis)
            onAnalysisComplete?.(data.analysis)
          }
        }
      } catch (error) {
        console.error('Failed to analyze project complexity:', error)
      }
    })
  }

  const resetAnalysis = () => {
    setAnalysis(null)
    setProjectDescription('')
    setRequirements('')
    setBusinessContext('')
  }

  if (analysis) {
    return (
      <div className="space-y-6">
        {/* Overview */}
        <SlideIn direction="up" delay={0.1}>
          <Card className="bg-gradient-to-br from-lightning-dark via-lightning-gray to-lightning-dark border-lightning-yellow">
            <CardHeader>
              <CardTitle className="text-lightning-yellow flex items-center gap-2">
                <span>📊</span> Project Complexity Assessment
              </CardTitle>
              <div className="flex items-center gap-4">
                <Badge className={complexityColors[analysis.overallComplexity]}>
                  {analysis.overallComplexity.charAt(0).toUpperCase() + analysis.overallComplexity.slice(1)} Complexity
                </Badge>
                <Badge className="bg-lightning-yellow/20 text-lightning-yellow border-lightning-yellow/30">
                  Score: {Math.round(analysis.complexityScore * 100)}/100
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Estimated Hours</p>
                  <p className="text-lg font-semibold text-lightning-yellow">{analysis.estimatedHours} hours</p>
                  <p className="text-xs text-gray-500">With AI-powered development</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Timeline</p>
                  <p className="text-lg font-semibold text-lightning-yellow">
                    {analysis.timelineWeeks.min}-{analysis.timelineWeeks.max} weeks
                  </p>
                  <p className="text-xs text-gray-500">Evening development schedule</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Estimated Cost</p>
                  <p className="text-lg font-semibold text-lightning-yellow">
                    ${(analysis.estimatedHours * 75).toLocaleString()} - ${(analysis.estimatedHours * 100).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Based on hourly rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideIn>

        {/* Factor Analysis */}
        <FadeIn delay={0.2}>
          <Card className="bg-lightning-dark border-lightning-gray">
            <CardHeader>
              <CardTitle className="text-lightning-orange">Complexity Factor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.factorAnalysis.map((factor, index) => (
                  <div key={index} className="p-4 bg-lightning-gray/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lightning-yellow">{factor.factor}</h4>
                      <Badge className={complexityColors[factor.complexity]}>
                        {factor.complexity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">{factor.impact}</p>
                    <p className="text-xs text-gray-400">{factor.reasoning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Phase Suggestion */}
        {analysis.phaseSuggestion.recommended && (
          <SlideIn direction="up" delay={0.3}>
            <Card className="bg-lightning-dark border-lightning-orange/50">
              <CardHeader>
                <CardTitle className="text-lightning-orange">Recommended Development Phases</CardTitle>
                <p className="text-gray-300 text-sm">Breaking down the project into manageable phases</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.phaseSuggestion.phases.map((phase, index) => (
                    <div key={index} className="p-4 bg-lightning-gray/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lightning-yellow">{phase.name}</h4>
                        <Badge variant="outline" className="border-lightning-yellow/30 text-lightning-yellow">
                          {phase.hours}h
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{phase.description}</p>
                      <div>
                        <p className="text-xs font-medium text-lightning-orange mb-1">Deliverables:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          {phase.deliverables.map((deliverable, dIndex) => (
                            <li key={dIndex} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-lightning-yellow rounded-full"></div>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        )}

        {/* Risk Factors & Recommendations */}
        <div className="grid grid-cols-1 tablet-lg:grid-cols-2 fold:gap-4 xs:gap-5 gap-6 tablet:gap-8 ultra:gap-10">
          {/* Risk Factors */}
          <FadeIn delay={0.4}>
            <Card className="bg-lightning-dark border-lightning-gray">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <span>⚠️</span> Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.riskFactors.map((risk, index) => (
                    <div key={index} className="p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={complexityColors[risk.severity]}>
                          {risk.severity}
                        </Badge>
                        <p className="text-sm font-medium text-gray-200">{risk.risk}</p>
                      </div>
                      <p className="text-xs text-gray-400">{risk.mitigation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Recommendations */}
          <FadeIn delay={0.5}>
            <Card className="bg-lightning-dark border-lightning-gray">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <span>💡</span> Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{categoryIcons[rec.category]}</span>
                        <p className="text-sm font-medium text-gray-200">{rec.recommendation}</p>
                      </div>
                      <p className="text-xs text-gray-400">{rec.reasoning}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* AI Development Benefits */}
        <SlideIn direction="up" delay={0.6}>
          <Card className="bg-gradient-to-r from-purple-900/20 to-lightning-dark border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <span>🤖</span> AI-Powered Development Advantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 tablet:grid-cols-2 fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8">
                <div>
                  <h4 className="font-semibold text-lightning-yellow mb-2">Time Efficiency</h4>
                  <p className="text-sm text-gray-300">{analysis.aiDevelopmentBenefit.timeReduction}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lightning-yellow mb-2">Quality Enhancement</h4>
                  <p className="text-sm text-gray-300">{analysis.aiDevelopmentBenefit.qualityImprovement}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-lightning-yellow mb-2">AI Tools Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.aiDevelopmentBenefit.specificTools.map((tool, index) => (
                    <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideIn>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-lightning-gray">
          <LightningPulse>
            <GradientShine>
              <Button
                asChild
                size="lg"
                className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
              >
                <a href="#contact">Start This Project</a>
              </Button>
            </GradientShine>
          </LightningPulse>

          <Button
            variant="outline"
            size="lg"
            onClick={resetAnalysis}
            className="border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow"
          >
            Analyze Different Project
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="text-lightning-yellow flex items-center gap-2">
          <span>📊</span> {title}
        </CardTitle>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Type Selection */}
        <div>
          <Label className="text-lightning-orange font-medium mb-3 block">Project Type</Label>
          <div className="grid grid-cols-1 tablet:grid-cols-2 fold:gap-2 xs:gap-2 gap-3 tablet:gap-4 ultra:gap-6">
            {projectTypes.map((type) => (
              <HoverScale key={type.value} scale={1.02}>
                <Button
                  variant={projectType === type.value ? "default" : "outline"}
                  onClick={() => setProjectType(type.value)}
                  className={`w-full justify-start h-auto p-3 ${
                    projectType === type.value
                      ? 'bg-lightning-gradient text-lightning-black'
                      : 'border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs opacity-80">{type.description}</div>
                  </div>
                </Button>
              </HoverScale>
            ))}
          </div>
        </div>

        {/* Project Description */}
        <div>
          <Label htmlFor="project-description" className="text-lightning-orange font-medium">
            Project Description
          </Label>
          <Textarea
            id="project-description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Describe your project in detail. What are you trying to build? What features do you need? What problems are you solving?"
            rows={4}
            className="mt-2"
          />
        </div>

        {/* Requirements */}
        {!compact && (
          <div>
            <Label htmlFor="requirements" className="text-lightning-orange font-medium">
              Specific Requirements (Optional)
            </Label>
            <Input
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g., Mobile responsive, Payment integration, User accounts (comma-separated)"
              className="mt-2"
            />
          </div>
        )}

        {/* Business Context */}
        {!compact && (
          <div>
            <Label htmlFor="business-context" className="text-lightning-orange font-medium">
              Technical Constraints & Preferences (Optional)
            </Label>
            <Input
              id="business-context"
              value={technicalRequirements}
              onChange={(e) => setTechnicalRequirements(e.target.value)}
              placeholder="e.g., Must use React, needs mobile-first, requires real-time features"
              className="mt-2"
            />
          </div>
        )}

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={isPending || !projectDescription.trim()}
          className="w-full bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner size="sm" />
              Analyzing Project Complexity...
            </div>
          ) : (
            'Analyze Project Complexity'
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Get detailed insights into development time, costs, risks, and AI-powered development benefits
        </p>
      </CardContent>
    </Card>
  )
}