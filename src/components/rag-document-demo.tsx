'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  HoverScale,
  FadeIn,
  SlideIn,
  LightningPulse,
  GradientShine,
  StaggerContainer,
  StaggerItem
} from "@/components/animated-elements"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: string[]
}

interface DocumentInfo {
  id: string
  filename: string
  size: number
  type: string
  uploadedAt: Date
  wordCount?: number
  chunkCount?: number
}

interface ProcessingStep {
  id: number
  label: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  message: string
  duration?: number
}

const processingSteps: ProcessingStep[] = [
  { id: 1, label: 'Upload', status: 'pending', message: 'Uploading document...', duration: 1000 },
  { id: 2, label: 'Extract', status: 'pending', message: 'Extracting text content...', duration: 2000 },
  { id: 3, label: 'Chunk', status: 'pending', message: 'Breaking into searchable chunks...', duration: 1500 },
  { id: 4, label: 'Embed', status: 'pending', message: 'Generating AI embeddings...', duration: 3000 },
  { id: 5, label: 'Store', status: 'pending', message: 'Storing in vector database...', duration: 1000 },
  { id: 6, label: 'Ready', status: 'pending', message: 'Ready for questions!', duration: 500 }
]

const sampleQuestions = [
  "What is this document about?",
  "What are the main topics covered?",
  "Summarize the key points",
  "What are the most important insights?",
  "What conclusions can be drawn?"
]

const sampleDocuments = [
  { name: "Sample Recipe", description: "Cooking instructions document", icon: "📄" },
  { name: "Tech Article", description: "Technology news article", icon: "📰" },
  { name: "User Manual", description: "Product documentation", icon: "📋" }
]

// Utility functions for document session management (sync with SimpleAIChat)
const setDocumentSession = (docInfo: DocumentInfo) => {
  if (typeof window === 'undefined') return

  try {
    const session = {
      id: docInfo.id,
      filename: docInfo.filename,
      uploadedAt: docInfo.uploadedAt,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      wordCount: docInfo.wordCount
    }
    sessionStorage.setItem('ragDocumentSession', JSON.stringify(session))

    // Trigger storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'ragDocumentSession',
      newValue: JSON.stringify(session)
    }))
  } catch {
    // Handle storage errors silently
  }
}

const clearDocumentSession = () => {
  if (typeof window === 'undefined') return

  try {
    sessionStorage.removeItem('ragDocumentSession')

    // Trigger storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'ragDocumentSession',
      newValue: null
    }))
  } catch {
    // Handle storage errors silently
  }
}

export function RAGDocumentDemo() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedDocument, setUploadedDocument] = useState<DocumentInfo | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [showQuestions, setShowQuestions] = useState(true)
  const [documentPreview, setDocumentPreview] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOCX, or TXT file.')
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.')
      return
    }

    // Create document info
    const docInfo: DocumentInfo = {
      id: Date.now().toString(),
      filename: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date()
    }

    setUploadedDocument(docInfo)
    setProcessing(true)
    setCurrentStep(0)

    // Set document session for global chat awareness
    setDocumentSession(docInfo)

    // Simulate processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, processingSteps[i].duration))
      setCurrentStep(i + 1)
    }

    // Simulate document preview
    setDocumentPreview(`This is a simulated preview of ${file.name}. In a real implementation, this would show extracted content from your document.`)

    setProcessing(false)
    setProcessed(true)
    setShowQuestions(true)
  }

  const handleSampleDocument = (sampleName: string) => {
    const sampleDoc: DocumentInfo = {
      id: Date.now().toString(),
      filename: `${sampleName.toLowerCase().replace(' ', '-')}.pdf`,
      size: 1024 * 500, // 500KB
      type: 'application/pdf',
      uploadedAt: new Date(),
      wordCount: 1250,
      chunkCount: 8
    }

    setUploadedDocument(sampleDoc)
    setProcessing(true)
    setCurrentStep(0)

    // Set document session for global chat awareness
    setDocumentSession(sampleDoc)

    // Quick processing for samples
    const quickProcess = async () => {
      for (let i = 0; i < processingSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setCurrentStep(i + 1)
      }
      setDocumentPreview(`Sample content from ${sampleName}: This demonstrates how the RAG system would analyze and understand your document content.`)
      setProcessing(false)
      setProcessed(true)
    }

    quickProcess()
  }

  const handleQuestionClick = async (question: string) => {
    setInput(question)
    await sendMessage(question)
  }

  const sendMessage = async (message: string) => {
    if (!message.trim() || !processed) return

    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setChatLoading(true)
    setShowQuestions(false)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500))

    const aiResponse: Message = {
      role: 'assistant',
      content: `Based on your document "${uploadedDocument?.filename}", here's what I found: ${message.includes('about') ? 'This document covers several key topics and provides valuable insights.' : message.includes('summarize') ? 'The main points include important concepts and actionable recommendations.' : 'The document contains relevant information that addresses your question.'} [This is a demo response - in the real implementation, this would be powered by your n8n RAG workflow.]`,
      timestamp: new Date(),
      sources: ['Page 1, Paragraph 2', 'Page 3, Section 2.1']
    }

    setMessages(prev => [...prev, aiResponse])
    setChatLoading(false)
    scrollToBottom()
  }

  const resetDemo = () => {
    setUploadedDocument(null)
    setCurrentStep(0)
    setProcessing(false)
    setProcessed(false)
    setMessages([])
    setInput('')
    setChatLoading(false)
    setShowQuestions(true)
    setDocumentPreview('')

    // Clear document session for global chat
    clearDocumentSession()
  }

  return (
    <div className="space-y-8">
      {/* Demo Header */}
      <FadeIn>
        <Card className="bg-lightning-gradient/10 border-lightning-yellow">
          <CardHeader>
            <CardTitle className="text-lightning-yellow text-xl sm:text-2xl text-center flex items-center justify-center gap-2">
              <span>🔍</span>
              RAG Document Analysis Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <p className="text-gray-300">
                Upload a document and ask questions about its content. Watch AI read, understand, and answer intelligently.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <Badge variant="outline" className="border-lightning-orange text-lightning-orange">
                  Live Processing
                </Badge>
                <Badge variant="outline" className="border-lightning-yellow text-lightning-yellow">
                  Source Citations
                </Badge>
                <Badge variant="outline" className="border-lightning-orange text-lightning-orange">
                  Real-time Q&A
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {!uploadedDocument && (
        <StaggerContainer>
          {/* Upload Section */}
          <StaggerItem>
            <SlideIn direction="up">
              <Card className="bg-lightning-gray/30 border-lightning-gray hover:border-lightning-yellow/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow text-lg">Upload Document</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Drag & Drop Zone */}
                  <div
                    className={`
                      relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
                      ${dragActive
                        ? 'border-lightning-yellow bg-lightning-yellow/10'
                        : 'border-lightning-gray hover:border-lightning-yellow/50'
                      }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileInput}
                      className="hidden"
                    />

                    <div className="space-y-4">
                      <div className="text-4xl">📄</div>
                      <div>
                        <h3 className="text-lightning-yellow font-semibold mb-2">
                          Drop your test document here
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Or click to browse files
                        </p>
                        <div className="text-xs text-gray-500">
                          PDF • DOCX • TXT (Max 10MB)
                        </div>
                      </div>

                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-lightning-gradient hover:bg-lightning-gradient/80 text-lightning-black font-semibold"
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>

                  {/* Safety Warning */}
                  <div className="mt-4 p-3 bg-lightning-yellow/10 border border-lightning-yellow/30 rounded">
                    <div className="flex items-start gap-2">
                      <span className="text-lightning-yellow text-lg">⚠️</span>
                      <div className="text-sm">
                        <p className="text-lightning-yellow font-medium">Demo Only - Safe Documents</p>
                        <p className="text-gray-400">
                          Don't upload confidential files. Use test documents like recipes, articles, or manuals.
                          Files are processed temporarily and deleted after your session.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </StaggerItem>

          {/* Sample Documents */}
          <StaggerItem>
            <SlideIn direction="up" delay={0.2}>
              <Card className="bg-lightning-gray/30 border-lightning-gray">
                <CardHeader>
                  <CardTitle className="text-lightning-orange text-lg">Try Sample Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {sampleDocuments.map((sample, index) => (
                      <HoverScale key={index} scale={1.02}>
                        <Button
                          variant="outline"
                          onClick={() => handleSampleDocument(sample.name)}
                          className="h-auto p-4 flex flex-col items-center gap-2 border-lightning-gray hover:border-lightning-orange text-left"
                        >
                          <span className="text-2xl">{sample.icon}</span>
                          <div>
                            <div className="font-medium text-lightning-orange">{sample.name}</div>
                            <div className="text-xs text-gray-400">{sample.description}</div>
                          </div>
                        </Button>
                      </HoverScale>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </StaggerItem>
        </StaggerContainer>
      )}

      {/* Processing Section */}
      {processing && uploadedDocument && (
        <FadeIn>
          <Card className="bg-lightning-dark/50 border-lightning-yellow">
            <CardHeader>
              <CardTitle className="text-lightning-yellow text-lg flex items-center gap-2">
                <LightningPulse>
                  <LoadingSpinner size="sm" />
                </LightningPulse>
                Processing: {uploadedDocument.filename}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="w-full bg-lightning-gray rounded-full h-2">
                  <div
                    className="bg-lightning-gradient h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / processingSteps.length) * 100}%` }}
                  />
                </div>

                {/* Steps */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {processingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-2">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${index < currentStep
                          ? 'bg-lightning-yellow text-lightning-black'
                          : index === currentStep
                          ? 'bg-lightning-orange text-lightning-black animate-pulse'
                          : 'bg-lightning-gray text-gray-400'
                        }
                      `}>
                        {index < currentStep ? '✓' : step.id}
                      </div>
                      <span className={`text-sm ${
                        index <= currentStep ? 'text-lightning-yellow' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Current Step Message */}
                <div className="text-center">
                  <p className="text-lightning-orange font-medium">
                    {currentStep < processingSteps.length
                      ? processingSteps[currentStep]?.message
                      : 'Processing complete!'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Document Ready & Chat Interface */}
      {processed && uploadedDocument && (
        <StaggerContainer>
          {/* Document Info */}
          <StaggerItem>
            <SlideIn direction="up">
              <Card className="bg-lightning-gray/30 border-lightning-green">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow text-lg flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    Document Ready: {uploadedDocument.filename}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Size:</span>
                      <p className="text-lightning-yellow font-medium">
                        {(uploadedDocument.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <p className="text-lightning-orange font-medium">
                        {uploadedDocument.type.split('/')[1]?.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Words:</span>
                      <p className="text-lightning-yellow font-medium">
                        {uploadedDocument.wordCount || '~1,250'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Chunks:</span>
                      <p className="text-lightning-orange font-medium">
                        {uploadedDocument.chunkCount || '8'}
                      </p>
                    </div>
                  </div>

                  {documentPreview && (
                    <div className="mt-4 p-3 bg-lightning-black/30 rounded border border-lightning-gray">
                      <p className="text-gray-300 text-sm italic">
                        "{documentPreview}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </SlideIn>
          </StaggerItem>

          {/* Suggested Questions */}
          {showQuestions && (
            <StaggerItem>
              <SlideIn direction="up" delay={0.2}>
                <Card className="bg-lightning-gray/30 border-lightning-gray">
                  <CardHeader>
                    <CardTitle className="text-lightning-orange text-lg">💡 Try These Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sampleQuestions.map((question, index) => (
                        <HoverScale key={index} scale={1.02}>
                          <Button
                            variant="outline"
                            onClick={() => handleQuestionClick(question)}
                            className="text-left border-lightning-gray hover:border-lightning-yellow text-gray-300 hover:text-lightning-yellow"
                            disabled={chatLoading}
                          >
                            {question}
                          </Button>
                        </HoverScale>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>
            </StaggerItem>
          )}

          {/* Chat Interface */}
          <StaggerItem>
            <SlideIn direction="up" delay={0.4}>
              <Card className="bg-lightning-gray/30 border-lightning-gray">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow text-lg">💬 Ask About Your Document</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Messages */}
                  <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`
                          max-w-[80%] rounded-lg p-3
                          ${message.role === 'user'
                            ? 'bg-lightning-gradient text-lightning-black'
                            : 'bg-lightning-black border border-lightning-gray text-gray-300'
                          }
                        `}>
                          <p className="text-sm">{message.content}</p>
                          {message.sources && (
                            <div className="mt-2 pt-2 border-t border-lightning-gray/30">
                              <p className="text-xs text-lightning-yellow">
                                Sources: {message.sources.join(', ')}
                              </p>
                            </div>
                          )}
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}

                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-lightning-black border border-lightning-gray rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <LoadingSpinner size="sm" />
                            <span className="text-sm text-gray-400">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question about your document..."
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                      disabled={chatLoading}
                      className="bg-lightning-black border-lightning-gray text-lightning-white placeholder:text-gray-500"
                    />
                    <Button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || chatLoading}
                      className="bg-lightning-gradient hover:bg-lightning-gradient/80 text-lightning-black font-semibold"
                    >
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </StaggerItem>

          {/* Reset Button */}
          <StaggerItem>
            <div className="text-center">
              <Button
                onClick={resetDemo}
                variant="outline"
                className="border-lightning-orange text-lightning-orange hover:bg-lightning-orange hover:text-lightning-black"
              >
                Try Another Document
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      )}
    </div>
  )
}