'use client'

import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import { HoverScale, FadeIn, SlideIn, LightningPulse } from "@/components/animated-elements"

interface CaseStudyResponse {
  answer: string
  category: string
  relatedTopics: string[]
  timestamp: string
}

interface QuestionHistory {
  question: string
  response: CaseStudyResponse
  timestamp: string
}

const quickQuestions = [
  {
    category: 'Technical',
    icon: '⚙️',
    questions: [
      "Why did you choose Next.js 15 for this project?",
      "How did AI tools help with development speed?",
      "What made Turbopack important for performance?",
      "How did you ensure mobile optimization?"
    ]
  },
  {
    category: 'Business Impact',
    icon: '📈',
    questions: [
      "What business results did Grace Kim achieve?",
      "How did you solve the testimonial design challenge?",
      "What made clients more confident in her services?",
      "How does this demonstrate value for SMB clients?"
    ]
  },
  {
    category: 'AI Development',
    icon: '🤖',
    questions: [
      "How did Cursor IDE speed up your coding?",
      "What role did Claude Code CLI play?",
      "How do AI tools help with evening development?",
      "What's the advantage of AI-powered development?"
    ]
  },
  {
    category: 'Process & Time',
    icon: '⏰',
    questions: [
      "How did you build this during evening hours?",
      "What was your planning vs building time split?",
      "How do you manage projects around factory work?",
      "What lessons did you learn about efficiency?"
    ]
  }
]

const categoryColors = {
  technical: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  business: 'bg-green-500/10 text-green-400 border-green-500/30',
  'ai-development': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  design: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
  process: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  general: 'bg-lightning-yellow/10 text-lightning-yellow border-lightning-yellow/30'
}

export function InteractiveCaseStudy() {
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [history, setHistory] = useState<QuestionHistory[]>([])
  const [isPending, startTransition] = useTransition()

  const handleQuestionSubmit = (question: string) => {
    if (!question.trim()) return

    startTransition(async () => {
      try {
        const response = await fetch('/api/ai/explain-case-study', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            const newEntry: QuestionHistory = {
              question,
              response: data.response,
              timestamp: new Date().toISOString()
            }

            setHistory(prev => [newEntry, ...prev])
            setCurrentQuestion('')
          }
        }
      } catch (error) {
        console.error('Failed to get case study explanation:', error)
      }
    })
  }

  const handleQuickQuestion = (question: string) => {
    setCurrentQuestion(question)
    handleQuestionSubmit(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleQuestionSubmit(currentQuestion)
  }

  return (
    <div className="space-y-6">
      {/* Main Q&A Interface */}
      <Card className="bg-gradient-to-br from-lightning-dark to-lightning-gray border-lightning-yellow/50">
        <CardHeader>
          <CardTitle className="text-lightning-yellow flex items-center gap-2">
            <span>🤖</span> Ask About the gracekimkor.com Project
          </CardTitle>
          <p className="text-gray-300 text-sm">
            Get AI-powered insights about technical decisions, business impact, and development process
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Ask anything about this project... (e.g., 'How did you handle the testimonial design challenge?')"
                disabled={isPending}
                className="flex-1"
              />
              <LightningPulse>
                <Button
                  type="submit"
                  disabled={isPending || !currentQuestion.trim()}
                  className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
                >
                  {isPending ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    'Ask AI'
                  )}
                </Button>
              </LightningPulse>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 tablet-lg:grid-cols-4 fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8">
        {quickQuestions.map((category, categoryIndex) => (
          <FadeIn key={categoryIndex} delay={categoryIndex * 0.1}>
            <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <h4 className="text-sm font-semibold text-lightning-orange">{category.category}</h4>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {category.questions.map((question, questionIndex) => (
                    <HoverScale key={questionIndex} scale={1.02}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuickQuestion(question)}
                        disabled={isPending}
                        className="w-full text-left justify-start text-xs p-2 h-auto hover:bg-lightning-yellow/10 hover:text-lightning-yellow text-gray-300"
                      >
                        {question}
                      </Button>
                    </HoverScale>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Response History */}
      {history.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-lightning-yellow flex items-center gap-2">
            <span>💬</span> AI Explanations
          </h3>

          {history.map((entry, index) => (
            <SlideIn key={entry.timestamp} direction="up" delay={index * 0.1}>
              <Card className="bg-lightning-dark border-lightning-gray">
                <CardContent className="p-6">
                  {/* Question */}
                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-lightning-gradient rounded-full flex items-center justify-center text-lightning-black font-semibold text-sm">
                        Q
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-200 font-medium">{entry.question}</p>
                      </div>
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-lightning-yellow rounded-full flex items-center justify-center text-lightning-black font-semibold text-sm">
                        🤖
                      </div>
                      <div className="flex-1">
                        <div className="prose prose-invert prose-sm max-w-none">
                          <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                            {entry.response.answer}
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="mt-3">
                          <Badge
                            className={categoryColors[entry.response.category as keyof typeof categoryColors] || categoryColors.general}
                          >
                            {entry.response.category.charAt(0).toUpperCase() + entry.response.category.slice(1).replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Topics */}
                  {entry.response.relatedTopics && entry.response.relatedTopics.length > 0 && (
                    <div className="border-t border-lightning-gray pt-4">
                      <p className="text-xs text-gray-500 mb-2">Related questions you might ask:</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.response.relatedTopics.slice(0, 3).map((topic, topicIndex) => (
                          <Button
                            key={topicIndex}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickQuestion(topic)}
                            disabled={isPending}
                            className="text-xs border-lightning-gray/50 hover:border-lightning-yellow/50 hover:text-lightning-yellow"
                          >
                            {topic}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </SlideIn>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <FadeIn delay={0.5}>
        <Card className="bg-gradient-to-r from-lightning-dark to-lightning-gray border-lightning-yellow/30">
          <CardContent className="p-6 text-center">
            <h4 className="text-lightning-yellow font-semibold mb-2">
              Interested in Similar Results for Your Business?
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              This AI-powered case study explanation demonstrates the level of thought and expertise that goes into every project.
            </p>
            <LightningPulse>
              <Button
                asChild
                className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
              >
                <a href="#contact">Let&apos;s Discuss Your Project</a>
              </Button>
            </LightningPulse>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}