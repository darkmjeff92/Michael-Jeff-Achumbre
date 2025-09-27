'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/loading-spinner"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface UsageStats {
  questionsUsed: number
  questionsLimit: number
  canQuestion: boolean
}

export function AIAssistantTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [usageStats, setUsageStats] = useState<UsageStats>({
    questionsUsed: 0,
    questionsLimit: 10,
    canQuestion: true
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load usage stats
    checkUsageStats()
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

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
          canQuestion: data.canQuestion ?? true
        })
      }
    } catch (error) {
      console.error('Failed to check usage stats:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: 'ai-labs-assistant',
          systemPrompt: 'You are a technical AI assistant specializing in AI development, system architecture, and implementation strategies. Provide concise, helpful responses about AI technologies, development practices, and technical solutions.'
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date()
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
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="space-y-8">

      {/* Enhanced Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative glass-morphism-strong rounded-2xl p-6 border border-lightning-gray/30 overflow-hidden group hover:border-lightning-yellow/40 transition-all duration-300"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-xl flex items-center justify-center text-xl border border-blue-400/30">
                🤖
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-lightning-yellow rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">AI Assistant</h3>
              <p className="text-gray-400">Intelligent AI conversations</p>
            </div>
          </div>

          {/* Usage Stats with Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-300 font-medium">
                {usageStats.questionsUsed}/{usageStats.questionsLimit} questions
              </div>
              <div className="text-xs text-gray-500">Weekly limit</div>
            </div>
            <div className="w-16 h-2 bg-lightning-gray/40 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(usageStats.questionsUsed / usageStats.questionsLimit) * 100}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative glass-morphism rounded-2xl border-2 border-lightning-gray/20 shadow-2xl overflow-hidden group"
      >
        {/* Card glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5"></div>

        {/* Lightning corner accent */}
        <div className="absolute top-3 right-3 text-xs text-blue-400/40">⚡</div>

        {/* Messages Area */}
        <div className="h-[62vh] sm:h-[420px] overflow-y-auto p-4 sm:p-6">

          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-lg mx-auto px-3">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🤖</div>
                <h4 className="text-lightning-yellow font-medium text-lg sm:text-xl">
                  How can I assist you with AI development today?
                </h4>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed px-3">
                  Ask me about AI architecture, implementation patterns, tech stack recommendations,
                  or any technical questions about building AI applications.
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  <button
                    onClick={() => setInput("How do you implement RAG systems?")}
                    className="text-sm px-4 py-2 bg-lightning-gray/40 hover:bg-lightning-gray/60 text-gray-300 hover:text-white rounded-lg transition-colors touch-target-sm"
                  >
                    RAG Systems
                  </button>
                  <button
                    onClick={() => setInput("What's your AI tech stack?")}
                    className="text-sm px-4 py-2 bg-lightning-gray/40 hover:bg-lightning-gray/60 text-gray-300 hover:text-white rounded-lg transition-colors touch-target-sm"
                  >
                    Tech Stack
                  </button>
                  <button
                    onClick={() => setInput("AI development best practices?")}
                    className="text-sm px-4 py-2 bg-lightning-gray/40 hover:bg-lightning-gray/60 text-gray-300 hover:text-white rounded-lg transition-colors touch-target-sm"
                  >
                    Best Practices
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[85%] sm:max-w-[80%] rounded-lg px-3 sm:px-4 py-2
                ${message.role === 'user'
                  ? 'bg-lightning-gradient text-lightning-black'
                  : 'bg-lightning-black/60 text-gray-200 border border-lightning-gray/40'
                }
              `}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-lightning-black/60 border border-lightning-gray/40 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm text-gray-400">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-lightning-gray/40 p-3 sm:p-4">
          <div className="flex gap-2 sm:gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                !usageStats.canQuestion
                  ? "Weekly question limit reached"
                  : "Ask me anything about AI development..."
              }
              disabled={isLoading || !usageStats.canQuestion}
              onKeyDown={handleKeyDown}
              className="bg-lightning-black/40 border-lightning-gray/40 text-white placeholder:text-gray-500 focus:border-lightning-yellow/50 focus:ring-lightning-yellow/20"
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading || !usageStats.canQuestion}
              className="bg-lightning-gradient hover:bg-lightning-gradient/90 text-lightning-black font-medium px-4 sm:px-6 touch-target-sm"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : 'Send'}
            </Button>
          </div>

          {!usageStats.canQuestion && (
            <p className="text-xs text-lightning-orange mt-2">
              Weekly limit reached. Resets every Monday at 12:00 AM KST.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}