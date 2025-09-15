'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { HoverScale, FadeIn, SlideIn, LightningPulse } from "@/components/animated-elements"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface SimpleAIChatProps {
  context?: string
  autoOpen?: boolean
}

const quickQuestions = [
  "What services do you offer?",
  "How does AI-powered development work?",
  "What's your availability like?",
  "Can you tell me about the gracekimkor.com project?",
  "What makes you different from other developers?",
  "How do you handle projects around your factory schedule?"
]

export function SimpleAIChat({ context = 'general', autoOpen = false }: SimpleAIChatProps) {
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setShowQuickQuestions(false)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          context
        })
      })

      if (response.ok) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let assistantContent = ''

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            assistantContent += chunk

            // Update the assistant message in real-time
            setMessages(prev => {
              const newMessages = [...prev]
              const lastMessage = newMessages[newMessages.length - 1]

              if (lastMessage && lastMessage.role === 'assistant') {
                lastMessage.content = assistantContent
              } else {
                newMessages.push({
                  role: 'assistant',
                  content: assistantContent,
                  timestamp: new Date()
                })
              }

              return newMessages
            })
          }
        }
      } else {
        throw new Error('Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    sendMessage(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <LightningPulse>
          <HoverScale scale={1.1}>
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-lightning-gradient text-lightning-black shadow-lg hover:opacity-90 transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <span className="text-xl">🤖</span>
                <span className="text-xs font-semibold">AI</span>
              </div>
            </Button>
          </HoverScale>
        </LightningPulse>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <SlideIn direction="up" duration={0.3}>
        <Card className="w-96 h-[500px] bg-lightning-dark border-lightning-yellow/50 shadow-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lightning-yellow flex items-center gap-2">
                <span>🤖</span> AI Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-lightning-white"
              >
                ✕
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-400">Ask me about Michael&apos;s services</p>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-[400px] p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && showQuickQuestions && (
                <FadeIn>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-300 text-center">
                      Hi! I&apos;m Michael&apos;s AI assistant. Ask me anything about his services, experience, or projects.
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs text-lightning-orange font-medium">Quick questions:</p>
                      {quickQuestions.slice(0, 3).map((question, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuickQuestion(question)}
                          className="w-full text-left justify-start text-xs p-2 h-auto hover:bg-lightning-yellow/10 hover:text-lightning-yellow text-gray-400"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  {message.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="bg-lightning-gradient text-lightning-black px-3 py-2 rounded-lg max-w-[80%] text-sm">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <FadeIn delay={index * 0.1}>
                      <div className="flex justify-start">
                        <div className="flex gap-2 max-w-[90%]">
                          <div className="w-6 h-6 bg-lightning-yellow rounded-full flex items-center justify-center text-lightning-black text-xs font-semibold flex-shrink-0 mt-1">
                            🤖
                          </div>
                          <div className="bg-lightning-gray px-3 py-2 rounded-lg text-sm text-gray-200">
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-lightning-yellow rounded-full flex items-center justify-center text-lightning-black text-xs font-semibold">
                      🤖
                    </div>
                    <div className="bg-lightning-gray px-3 py-2 rounded-lg text-sm">
                      <LoadingSpinner size="sm" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-lightning-gray p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, availability, projects..."
                  disabled={isLoading}
                  className="flex-1 text-sm"
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  size="sm"
                  className="bg-lightning-gradient text-lightning-black hover:opacity-90"
                >
                  {isLoading ? <LoadingSpinner size="sm" /> : '→'}
                </Button>
              </form>

              {messages.length === 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {quickQuestions.slice(3, 6).map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs px-2 py-1 h-auto hover:bg-lightning-yellow/10 hover:text-lightning-yellow text-gray-500"
                    >
                      {question.length > 25 ? question.substring(0, 25) + '...' : question}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>

          {/* Footer */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span>⚡</span>
                <span>AI-powered</span>
              </div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs h-auto p-1 text-lightning-orange hover:text-lightning-yellow"
              >
                <a href="#contact">Start a project →</a>
              </Button>
            </div>
          </div>
        </Card>
      </SlideIn>
    </div>
  )
}