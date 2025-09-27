'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"
import {
  HoverScale,
  FadeIn,
  SlideIn,
  CircularLightningGlow,
  LightningElectricGlow,
  LightningBolt
} from "@/components/animated-elements"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface DocumentSession {
  id: string
  filename: string
  uploadedAt: Date
  expiresAt: Date
  wordCount?: number
}

interface SimpleAIChatProps {
  context?: string
  autoOpen?: boolean
}

const quickQuestions = [
  "How did you build this RAG document system?",
  "What AI development tools do you use?",
  "Can you explain the gracekimkor.com technical implementation?",
  "How does your Lightning theme component system work?",
  "What's your AI-enhanced development workflow like?",
  "How do you integrate AI SDK v5 with Next.js?"
]

const documentAwareQuestions = [
  "How does the document processing pipeline work?",
  "What vector database technology powers this?",
  "How do you handle document chunking and embeddings?",
  "What's the architecture behind the RAG system?",
  "How do you ensure document privacy and security?",
  "What AI models are used for document analysis?"
]

// Utility functions for document session management
const getDocumentSession = (): DocumentSession | null => {
  if (typeof window === 'undefined') return null

  try {
    const sessionData = sessionStorage.getItem('ragDocumentSession')
    if (!sessionData) return null

    const session: DocumentSession = JSON.parse(sessionData)

    // Check if session has expired
    if (new Date() > new Date(session.expiresAt)) {
      sessionStorage.removeItem('ragDocumentSession')
      return null
    }

    return session
  } catch {
    return null
  }
}


export function SimpleAIChat({ context = 'general', autoOpen = false }: SimpleAIChatProps) {
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [documentSession, setDocumentSessionState] = useState<DocumentSession | null>(null)
  const [documentAware, setDocumentAware] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640 || 'ontouchstart' in window)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    console.log('💬 SimpleAIChat component mounted', { isOpen, context })

    // Check for document session on mount and periodically
    const checkDocumentSession = () => {
      const session = getDocumentSession()
      setDocumentSessionState(session)
      setDocumentAware(!!session)
    }

    checkDocumentSession()

    // Check for document session changes every 5 seconds
    const interval = setInterval(checkDocumentSession, 5000)

    return () => clearInterval(interval)
  }, [isOpen, context])

  // Listen for storage changes (when document is uploaded in another tab/component)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ragDocumentSession') {
        const session = getDocumentSession()
        setDocumentSessionState(session)
        setDocumentAware(!!session)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Escape key support for exiting fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreen])

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
          context: documentAware ? 'document-aware' : context,
          documentSession: documentSession
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
      } else if (response.status === 429) {
        // Handle rate limit
        const errorData = await response.json()
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ ${errorData.error || 'Rate limit exceeded. Please try again later.'}`,
          timestamp: new Date()
        }])
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
      <div
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: 50
        }}
        data-testid="chat-bubble-closed"
      >
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <button
                onClick={() => setIsOpen(true)}
                className="relative bg-transparent border-none p-0 active:scale-95 transition-all duration-300 touch-manipulation focus:outline-none pointer-events-auto hover:scale-110"
                aria-label="Open AI Chat Assistant"
                title="Chat with AI Assistant"
              >
                  <Image
                    src="/logos/ai-bubble-chat-icon.png"
                    alt="AI Chat Assistant"
                    width={128}
                    height={128}
                    priority
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-28 lg:h-28 transition-transform duration-300"
                  />
              </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        ...(isFullscreen ? {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999
        } : {
          bottom: '1rem',
          right: '1rem',
          zIndex: 9999
        })
      }}
      className={isFullscreen
        ? "w-full h-full p-4 flex items-center justify-center"
        : "w-80 lg:w-[32rem] xl:w-[36rem] 2xl:w-[40rem] max-w-xs sm:max-w-none overflow-x-hidden"
      }
      data-testid="chat-bubble-open"
    >
      <SlideIn direction="up" duration={0.4}>
        <div className={`relative ${isFullscreen ? "w-full max-w-6xl" : ""}`}>


          <Card
            className={`w-full ${isFullscreen
              ? "h-full"
              : "h-[60vh] max-h-[480px] sm:h-[70vh] sm:max-h-[500px] lg:h-[70vh] lg:max-h-[650px] xl:h-[75vh] xl:max-h-[750px] 2xl:h-[80vh] 2xl:max-h-[850px]"
            } glass-morphism-strong border-2 shadow-2xl relative overflow-hidden group`}
            style={{
              background: 'rgba(10, 10, 10, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '2px solid transparent',
              backgroundImage: `
                linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)),
                linear-gradient(135deg, #FFD700, #FF6B35, #FFD700)
              `,
              backgroundOrigin: 'border-box',
              backgroundClip: 'content-box, border-box',
              boxShadow: `
                0 0 30px rgba(255, 215, 0, 0.2),
                0 0 60px rgba(255, 107, 53, 0.1),
                inset 0 0 1px rgba(255, 215, 0, 0.3)
              `
            }}
          >

            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lightning-yellow flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                  <span className="font-bold text-lg">AI Assistant</span>
                  {documentAware && (
                    <CircularLightningGlow intensity="medium" className="inline-block">
                      <span className="text-xs bg-lightning-orange text-lightning-black px-3 py-1 rounded-full font-bold shadow-lg">
                        📄 Document Mode
                      </span>
                    </CircularLightningGlow>
                  )}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <HoverScale scale={1.1}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="text-gray-400 hover:text-lightning-white hover:bg-lightning-yellow/10 transition-all duration-300 rounded-full w-8 h-8 p-0"
                      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? "⊗" : "⊞"}
                    </Button>
                  </HoverScale>
                  <HoverScale scale={1.1}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-lightning-white hover:bg-lightning-yellow/10 transition-all duration-300 rounded-full w-8 h-8 p-0"
                    >
                      ✕
                    </Button>
                  </HoverScale>
                </div>
              </div>
            <div className="flex items-center gap-2">
              <LightningElectricGlow intensity="low">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg" style={{ boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)' }}></div>
              </LightningElectricGlow>
              <p className="text-xs text-gray-300 font-medium">
                {documentAware && documentSession
                  ? `⚡ Analyzing: ${documentSession.filename}`
                  : "⚡ Ready for lightning-fast AI assistance"}
              </p>
            </div>
            {documentAware && documentSession && (
              <FadeIn delay={0.2}>
                <div className="mt-3 p-3 glass-morphism-strong rounded-lg border border-lightning-orange/50 relative overflow-hidden">
                  {/* Lightning background pulse */}
                  <div className="absolute inset-0 bg-gradient-to-r from-lightning-yellow/5 via-lightning-orange/5 to-lightning-yellow/5 animate-pulse"></div>

                  <div className="relative z-10 flex items-start gap-2">
                    <span className="text-lightning-yellow">⚡</span>
                    <p className="text-lightning-orange text-sm font-medium leading-relaxed break-words">
                      <span className="text-lightning-yellow">✨ Enhanced Mode:</span> I can now analyze your document content AND provide technical insights about the portfolio&apos;s AI implementation!
                    </p>
                  </div>
                </div>
              </FadeIn>
            )}
          </CardHeader>

          <CardContent className={`flex flex-col ${isFullscreen && !isMobile
            ? "h-[calc(60vh-180px)] sm:h-[calc(70vh-180px)] lg:h-[calc(75vh-160px)] xl:h-[calc(80vh-180px)] 2xl:h-[calc(85vh-200px)]"
            : "h-[calc(60vh-180px)] sm:h-[calc(70vh-180px)] lg:h-[calc(70vh-180px)] xl:h-[calc(75vh-200px)] 2xl:h-[calc(80vh-220px)]"
          } p-0`}>
            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 scrollbar-hide"
            >
              {messages.length === 0 && showQuickQuestions && (
                <FadeIn>
                  <div className="space-y-6 text-center">
                    {/* Enhanced welcome message */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-lightning-yellow/5 via-transparent to-lightning-orange/5 rounded-lg blur-sm"></div>

                      <div className="relative p-4 glass-morphism-strong rounded-xl border border-lightning-gray/30">
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="text-2xl">🤖</span>
                          </div>

                        <p className="text-sm text-gray-200 leading-relaxed">
                          {documentAware && documentSession
                            ? (
                              <>
                                <span className="text-lightning-yellow font-semibold">⚡ Enhanced Mode Active!</span>
                                <br />
                                I can analyze your document <span className="text-lightning-orange font-medium">&ldquo;{documentSession.filename}&rdquo;</span> and explain the RAG system&apos;s technical architecture.
                              </>
                            )
                            : (
                              <>
                                <span className="text-lightning-yellow font-semibold">⚡ Lightning-Fast AI Assistant</span>
                                <br />
                                Ask me about Michael&apos;s technical journey, AI development workflow, or this portfolio&apos;s implementation details.
                              </>
                            )}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced quick questions */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-px bg-gradient-to-r from-transparent to-lightning-yellow/50 flex-1"></div>
                        <p className="text-xs text-lightning-orange font-bold tracking-wide px-2">
                          {documentAware ? "RAG SYSTEM QUERIES" : "TECHNICAL INSIGHTS"}
                        </p>
                        <div className="h-px bg-gradient-to-l from-transparent to-lightning-yellow/50 flex-1"></div>
                      </div>

                      <div className="space-y-2">
                        {(documentAware ? documentAwareQuestions : quickQuestions).slice(0, isMobile ? 2 : 3).map((question, index) => (
                          <FadeIn key={index} delay={0.1 * (index + 1)}>
                            <HoverScale scale={1.02}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuickQuestion(question)}
                                className={`w-full text-left justify-start ${isMobile ? 'text-xs p-2 leading-snug' : 'text-sm p-4 leading-relaxed min-h-[3rem]'} h-auto bg-lightning-black/40 hover:bg-lightning-yellow/10 hover:text-lightning-yellow text-gray-300 border border-lightning-gray/30 hover:border-lightning-yellow/50 transition-all duration-300 rounded-lg group`}
                              >
                                <span className="group-hover:translate-x-1 transition-transform duration-300">{question}</span>
                              </Button>
                            </HoverScale>
                          </FadeIn>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}

              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  {message.role === 'user' ? (
                    <div className="flex justify-end">
                      <HoverScale scale={1.02}>
                        <div
                          className="relative px-4 py-3 rounded-2xl max-w-[80%] text-sm font-medium text-lightning-black overflow-hidden group shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 100%)',
                            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                          <div className="relative z-10">{message.content}</div>
                        </div>
                      </HoverScale>
                    </div>
                  ) : (
                    <FadeIn delay={index * 0.1}>
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[90%] group">
                          {/* Enhanced AI avatar */}
                          <CircularLightningGlow intensity="low">
                            <div className="w-8 h-8 bg-gradient-to-br from-lightning-yellow to-lightning-orange rounded-full flex items-center justify-center text-lightning-black text-sm font-bold flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                              🤖
                            </div>
                          </CircularLightningGlow>

                          {/* Enhanced message bubble */}
                          <div
                            className="relative glass-morphism-strong rounded-2xl px-4 py-3 text-sm text-gray-200 border border-lightning-gray/40 shadow-lg group-hover:border-lightning-yellow/50 transition-all duration-300"
                            style={{
                              background: 'rgba(26, 26, 26, 0.9)',
                              backdropFilter: 'blur(10px)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 0, 0.1)'
                            }}
                          >
                            {/* Lightning accent */}
                            <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-70 transition-opacity duration-300">
                              <LightningBolt size={12} intensity="low" variant="glow" />
                            </div>

                            <div className="whitespace-pre-wrap leading-relaxed pr-6">{message.content}</div>

                            {/* Timestamp */}
                            <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                              <span>⚡</span>
                              <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              ))}

              {isLoading && (
                <FadeIn>
                  <div className="flex justify-start">
                    <div className="flex gap-3 group">
                      {/* Enhanced AI avatar with lightning pulse */}
                      <LightningElectricGlow intensity="medium" strikeFrequency={1}>
                        <div className="w-8 h-8 bg-gradient-to-br from-lightning-yellow to-lightning-orange rounded-full flex items-center justify-center text-lightning-black text-sm font-bold shadow-lg animate-pulse">
                          🤖
                        </div>
                      </LightningElectricGlow>

                      {/* Enhanced typing indicator */}
                      <div
                        className="relative glass-morphism-strong rounded-2xl px-4 py-3 text-sm border border-lightning-gray/40 shadow-lg"
                        style={{
                          background: 'rgba(26, 26, 26, 0.9)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 0, 0.1)'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-lightning-yellow rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-lightning-yellow rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-lightning-yellow rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                          <span className="text-gray-400 font-medium">AI is thinking...</span>
                        </div>

                        {/* Animated lightning flow */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lightning-yellow/10 to-transparent -translate-x-full animate-pulse" style={{ animation: 'slide 2s infinite' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Area with lightning effects */}
            <div
              className="border-t p-4 relative"
              style={{
                borderImage: 'linear-gradient(90deg, transparent, #FFD700, transparent) 1'
              }}
            >
              {/* Lightning glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-lightning-yellow/5 to-transparent opacity-50"></div>

              <form onSubmit={handleSubmit} className="flex gap-3 relative z-10">
                <div className="flex-1 relative group">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      documentAware
                        ? "⚡ Ask about your document or my AI workflow..."
                        : "⚡ Ask about technical details, AI workflow, projects..."
                    }
                    disabled={isLoading}
                    className="bg-lightning-black/60 border-lightning-gray/40 text-white placeholder:text-gray-500 focus:border-lightning-yellow/60 focus:ring-2 focus:ring-lightning-yellow/20 transition-all duration-300 backdrop-blur-sm"
                    autoFocus={!isMobile} // Prevent auto-focus on mobile to avoid keyboard popping up unexpectedly
                    onFocus={(e) => {
                      // On mobile, ensure the input is visible when keyboard appears
                      if (isMobile) {
                        setTimeout(() => {
                          e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        }, 100)
                      }
                    }}
                    style={{
                      fontSize: isMobile ? '16px' : '14px' // Prevent zoom on iOS
                    }}
                  />

                  {/* Lightning focus effect */}
                  <div className="absolute inset-0 rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-lightning-yellow/10 via-transparent to-lightning-orange/10 rounded-md animate-pulse"></div>
                  </div>
                </div>

                <CircularLightningGlow intensity="medium">
                  <HoverScale scale={1.1}>
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      size="sm"
                      className="bg-lightning-gradient text-lightning-black hover:shadow-lg hover:shadow-lightning-yellow/30 transition-all duration-300 min-w-[44px] group relative overflow-hidden"
                    >
                      {/* Lightning flash on click */}
                      <div className="absolute inset-0 bg-white/30 scale-0 group-active:scale-100 transition-transform duration-150 rounded-sm"></div>

                      <span className="relative z-10">
                        {isLoading ? (
                          <span className="font-bold">⚡</span>
                        ) : (
                          <span className="font-bold">⚡</span>
                        )}
                      </span>
                    </Button>
                  </HoverScale>
                </CircularLightningGlow>
              </form>

            </div>
          </CardContent>

          {/* Enhanced Footer with lightning effects */}
          <div className="px-4 pb-3 relative">
            {/* Lightning separator */}
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-lightning-yellow/30 to-transparent"></div>

            <div className="flex items-center justify-between text-xs text-gray-400 mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-lightning-yellow">⚡</span>
                  <span className="font-medium">Lightning-powered AI</span>
                </div>

              <HoverScale scale={1.05}>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-xs h-auto px-2 py-1 text-lightning-orange hover:text-lightning-yellow hover:bg-lightning-yellow/10 transition-all duration-300 rounded-full group"
                >
                  <a href="#connect" className="flex items-center gap-1">
                    <span>Connect</span>
                  </a>
                </Button>
              </HoverScale>
            </div>
          </div>
        </Card>
        </div>
      </SlideIn>
    </div>
  )
}