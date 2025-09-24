'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  HoverScale,
  LightningElectricGlow
} from "@/components/animated-elements"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    responseTime?: number
    model?: string
    tokensUsed?: number
  }
}

interface UsageStats {
  questionsUsed: number
  questionsLimit: number
  uploadsUsed: number
  uploadsLimit: number
  canQuestion: boolean
  canUpload: boolean
}

const technicalQuestions = [
  "Explain the architecture of your RAG system with Supabase pgvector",
  "How do you optimize vector embeddings for the free tier?",
  "What's your approach to AI SDK v5 implementation with Next.js 15?",
  "How do you handle rate limiting across multiple AI components?",
  "Describe your Lightning design system and animation architecture",
  "What are the technical challenges of building AI-powered portfolios?"
]

const advancedPrompts = [
  {
    title: "System Architecture Analysis",
    prompt: "Provide a detailed technical breakdown of how you implemented the AI Labs section, including component architecture, state management, and API integration patterns."
  },
  {
    title: "Performance Optimization",
    prompt: "Explain your performance optimization strategies for AI-powered React applications, including bundle size management, lazy loading, and animation performance."
  },
  {
    title: "Supabase Integration Deep Dive",
    prompt: "Walk me through your Supabase setup for AI applications - database schema, pgvector configuration, rate limiting implementation, and free tier optimization strategies."
  },
  {
    title: "AI Development Workflow",
    prompt: "Describe your end-to-end development workflow for building AI-integrated applications, from initial setup to production deployment."
  }
]

export function AIAgentChatTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [usageStats, setUsageStats] = useState<UsageStats>({
    questionsUsed: 0,
    questionsLimit: 10,
    uploadsUsed: 0,
    uploadsLimit: 3,
    canQuestion: true,
    canUpload: true
  })
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with welcome message
    if (!isInitialized) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `Welcome to the AI Labs! I'm your technical AI agent specialized in advanced AI development discussions.

I can help you understand:
• AI system architecture and implementation patterns
• RAG systems with Supabase and pgvector
• Next.js 15 + AI SDK v5 integration strategies
• Performance optimization for AI applications
• Lightning design system technical details

Ask me anything technical about AI development, system architecture, or the implementation details of this portfolio!`,
        timestamp: new Date(),
        metadata: {
          model: 'gpt-5-nano',
          responseTime: 150
        }
      }
      setMessages([welcomeMessage])
      setIsInitialized(true)

      // Load usage stats
      checkUsageStats()
    }
  }, [isInitialized])

  const checkUsageStats = async () => {
    try {
      const response = await fetch('/api/ai/rate-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check' })
      })

      if (response.ok) {
        const data = await response.json()
        setUsageStats({
          questionsUsed: data.questionsUsed || 0,
          questionsLimit: data.questionsLimit || 10,
          uploadsUsed: data.uploadsUsed || 0,
          uploadsLimit: data.uploadsLimit || 3,
          canQuestion: data.canQuestion ?? true,
          canUpload: data.canUpload ?? true
        })
      }
    } catch (error) {
      console.error('Failed to check usage stats:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || !usageStats.canQuestion) return

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setShowQuickQuestions(false)

    const startTime = Date.now()

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: 'ai-labs-agent',
          systemPrompt: 'You are a senior AI developer and technical expert. Provide detailed, technical responses about AI development, system architecture, and implementation strategies. Focus on practical insights, code patterns, and real-world solutions.'
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      const responseTime = Date.now() - startTime

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date(),
        metadata: {
          responseTime,
          model: 'gpt-5-nano',
          tokensUsed: data.tokensUsed
        }
      }

      setMessages(prev => [...prev, assistantMessage])

      // Update usage stats
      setUsageStats(prev => ({
        ...prev,
        questionsUsed: prev.questionsUsed + 1,
        canQuestion: prev.questionsUsed + 1 < prev.questionsLimit
      }))

    } catch (error) {
      console.error('AI chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I encountered a technical issue. This might be due to rate limiting or a temporary service interruption. Please try again in a moment.',
        timestamp: new Date(),
        metadata: {
          responseTime: Date.now() - startTime
        }
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    sendMessage(question)
  }

  const handleAdvancedPrompt = (prompt: string) => {
    setInput(prompt)
    sendMessage(prompt)
  }

  const resetChat = () => {
    setMessages([])
    setShowQuickQuestions(true)
    setIsInitialized(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lightning-yellow text-xl font-semibold">AI Agent Interface</h3>
          <p className="text-gray-400 text-sm">Advanced technical AI conversations</p>
        </div>

        {/* Usage Stats */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`border-lightning-${usageStats.canQuestion ? 'yellow' : 'orange'} text-lightning-${usageStats.canQuestion ? 'yellow' : 'orange'}`}
          >
            {usageStats.questionsUsed}/{usageStats.questionsLimit} Questions
          </Badge>
          {!usageStats.canQuestion && (
            <Badge variant="outline" className="border-lightning-orange text-lightning-orange">
              Limit Reached
            </Badge>
          )}
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="bg-lightning-gray/30 border-lightning-gray min-h-[500px]">
        <CardContent className="p-6">
          {/* Messages */}
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[85%] sm:max-w-[80%] rounded-lg p-3 sm:p-4
                  ${message.role === 'user'
                    ? 'bg-lightning-gradient text-lightning-black'
                    : 'bg-lightning-black border border-lightning-gray text-gray-300'
                  }
                `}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                  {/* Message metadata */}
                  <div className="mt-2 pt-2 border-t border-lightning-gray/30 flex items-center justify-between text-xs opacity-70">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.metadata && (
                      <div className="flex items-center gap-2">
                        {message.metadata.responseTime && (
                          <span>{(message.metadata.responseTime / 1000).toFixed(1)}s</span>
                        )}
                        {message.metadata.model && (
                          <span>{message.metadata.model}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-lightning-black border border-lightning-gray rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm text-gray-400">AI agent is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {showQuickQuestions && messages.length <= 1 && (
            <div className="mb-6">
              <h4 className="text-lightning-orange font-medium mb-3">💡 Technical Questions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {technicalQuestions.map((question, index) => (
                  <HoverScale key={index} scale={1.02}>
                    <Button
                      variant="outline"
                      onClick={() => handleQuickQuestion(question)}
                      disabled={isLoading || !usageStats.canQuestion}
                      className="text-left border-lightning-gray hover:border-lightning-yellow text-gray-300 hover:text-lightning-yellow h-auto p-3 text-sm whitespace-normal leading-relaxed"
                    >
                      <span className="block">{question}</span>
                    </Button>
                  </HoverScale>
                ))}
              </div>

              <h4 className="text-lightning-orange font-medium mb-3">🧠 Advanced Prompts</h4>
              <div className="space-y-2">
                {advancedPrompts.map((item, index) => (
                  <Card key={index} className="bg-lightning-black/50 border-lightning-gray/50">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h5 className="text-lightning-yellow text-sm font-medium mb-1">{item.title}</h5>
                          <p className="text-gray-400 text-xs leading-relaxed">{item.prompt}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAdvancedPrompt(item.prompt)}
                          disabled={isLoading || !usageStats.canQuestion}
                          className="bg-lightning-gradient hover:bg-lightning-gradient/80 text-lightning-black font-medium text-xs px-3 shrink-0"
                        >
                          Ask
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                !usageStats.canQuestion
                  ? "Weekly question limit reached"
                  : "Ask about AI architecture, implementation patterns, or technical details..."
              }
              disabled={isLoading || !usageStats.canQuestion}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              className="bg-lightning-black border-lightning-gray text-lightning-white placeholder:text-gray-500"
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading || !usageStats.canQuestion}
              className="bg-lightning-gradient hover:bg-lightning-gradient/80 text-lightning-black font-semibold px-6"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : 'Send'}
            </Button>
          </div>

          {/* Reset Option */}
          {messages.length > 1 && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={resetChat}
                className="border-lightning-orange text-lightning-orange hover:bg-lightning-orange hover:text-lightning-black"
              >
                Reset Conversation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rate Limit Info */}
      {!usageStats.canQuestion && (
        <Card className="bg-lightning-orange/10 border-lightning-orange">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <LightningElectricGlow intensity="low">
                <span className="text-lightning-orange text-lg">⚡</span>
              </LightningElectricGlow>
              <div>
                <h4 className="text-lightning-orange font-medium mb-1">Weekly Limit Reached</h4>
                <p className="text-gray-300 text-sm">
                  You&apos;ve used all {usageStats.questionsLimit} weekly questions.
                  Limits reset every Monday at 12:00 AM KST.
                  You can still explore other AI Labs features!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}