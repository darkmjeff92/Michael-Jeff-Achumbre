'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  HoverScale,
  LightningElectricGlow,
  CircularLightningGlow
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
  processingStatus?: 'uploading' | 'processing' | 'completed' | 'error'
}

interface ProcessingStep {
  id: number
  label: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  message: string
  duration?: number
}

interface UsageStats {
  uploadsUsed: number
  uploadsLimit: number
  canUpload: boolean
}

const processingSteps: ProcessingStep[] = [
  { id: 1, label: 'Upload', status: 'pending', message: 'Uploading document to Supabase...', duration: 1000 },
  { id: 2, label: 'Extract', status: 'pending', message: 'Extracting text content...', duration: 2000 },
  { id: 3, label: 'Chunk', status: 'pending', message: 'Breaking into searchable chunks...', duration: 1500 },
  { id: 4, label: 'Embed', status: 'pending', message: 'Generating vector embeddings...', duration: 3000 },
  { id: 5, label: 'Store', status: 'pending', message: 'Storing in pgvector database...', duration: 1000 },
  { id: 6, label: 'Ready', status: 'pending', message: 'Document ready for questions!', duration: 500 }
]

const sampleQuestions = [
  "What is this document about?",
  "What are the main topics covered?",
  "Summarize the key points",
  "What are the most important insights?",
  "What conclusions can be drawn from this document?"
]

export function DocumentRAGTab() {
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
  const [usageStats, setUsageStats] = useState<UsageStats>({
    uploadsUsed: 0,
    uploadsLimit: 3,
    canUpload: true
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkUsageStats()
  }, [])

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
          uploadsUsed: data.uploadsUsed || 0,
          uploadsLimit: data.uploadsLimit || 3,
          canUpload: data.canUpload ?? true
        })
      }
    } catch (error) {
      console.error('Failed to check usage stats:', error)
    }
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!usageStats.canUpload) {
      alert('Weekly upload limit reached. Uploads reset every Monday at 12:00 AM KST.')
      return
    }

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
      uploadedAt: new Date(),
      processingStatus: 'uploading'
    }

    setUploadedDocument(docInfo)
    setProcessing(true)
    setCurrentStep(0)

    try {
      // Real document upload to Supabase
      const formData = new FormData()
      formData.append('file', file)

      // Simulate processing steps
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentStep(i + 1)
        await new Promise(resolve => setTimeout(resolve, processingSteps[i].duration))
      }

      // Upload to actual backend
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()

        const processedDoc: DocumentInfo = {
          ...docInfo,
          id: data.documentId || docInfo.id,
          wordCount: data.wordCount,
          chunkCount: data.chunkCount,
          processingStatus: 'completed'
        }

        setUploadedDocument(processedDoc)
        setDocumentPreview(`Document successfully processed: ${file.name}. Contains ${data.wordCount || 'unknown'} words and ${data.chunkCount || 'unknown'} chunks for semantic search.`)

        // Update usage stats
        setUsageStats(prev => ({
          ...prev,
          uploadsUsed: prev.uploadsUsed + 1,
          canUpload: prev.uploadsUsed + 1 < prev.uploadsLimit
        }))

      } else {
        throw new Error('Upload failed')
      }

    } catch (error) {
      console.error('Document processing failed:', error)
      setUploadedDocument(prev => prev ? { ...prev, processingStatus: 'error' } : null)
      setDocumentPreview('Document processing failed. This might be due to file format issues or server limitations on the free tier.')
    } finally {
      setProcessing(false)
      setProcessed(true)
      setShowQuestions(true)
    }
  }

  const handleQuestionClick = async (question: string) => {
    setInput(question)
    await sendMessage(question)
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !processed || !uploadedDocument) return

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setChatLoading(true)
    setShowQuestions(false)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: 'rag-document',
          documentId: uploadedDocument.id
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      const aiResponse: Message = {
        role: 'assistant',
        content: data.message || 'I apologize, but I encountered an issue processing your question about this document.',
        timestamp: new Date(),
        sources: data.sources || []
      }

      setMessages(prev => [...prev, aiResponse])

    } catch (error) {
      console.error('RAG chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I encountered an issue analyzing the document. This might be due to the document not being fully processed or rate limiting.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setChatLoading(false)
    }
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
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lightning-yellow text-xl font-semibold">RAG Document System</h3>
          <p className="text-gray-400 text-sm">Real document processing with Supabase pgvector</p>
        </div>

        {/* Usage Stats */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`border-lightning-${usageStats.canUpload ? 'yellow' : 'orange'} text-lightning-${usageStats.canUpload ? 'yellow' : 'orange'}`}
          >
            {usageStats.uploadsUsed}/{usageStats.uploadsLimit} Uploads
          </Badge>
        </div>
      </div>

      {!uploadedDocument && (
        <div className="space-y-6">
          {/* Upload Section */}
          <Card className="bg-lightning-gray/30 border-lightning-gray hover:border-lightning-yellow/50 transition-all duration-300">
            <CardContent className="p-6">
              {/* Drag & Drop Zone */}
              <div
                className={`
                  relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
                  ${dragActive
                    ? 'border-lightning-yellow bg-lightning-yellow/10'
                    : 'border-lightning-gray hover:border-lightning-yellow/50'
                  }
                  ${!usageStats.canUpload ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => usageStats.canUpload && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileInput}
                  disabled={!usageStats.canUpload}
                  className="hidden"
                />

                <div className="space-y-4">
                  <CircularLightningGlow intensity="low">
                    <div className="text-4xl">📄</div>
                  </CircularLightningGlow>
                  <div>
                    <h3 className="text-lightning-yellow font-semibold mb-2">
                      {usageStats.canUpload ? 'Upload Document for AI Analysis' : 'Weekly Upload Limit Reached'}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {usageStats.canUpload
                        ? 'Drop your document here or click to browse'
                        : 'Uploads reset every Monday at 12:00 AM KST'}
                    </p>
                    <div className="text-xs text-gray-500">
                      PDF • DOCX • TXT (Max 10MB) • Optimized for Supabase Free Tier
                    </div>
                  </div>

                  {usageStats.canUpload && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        fileInputRef.current?.click()
                      }}
                      className="bg-lightning-gradient hover:bg-lightning-gradient/80 text-lightning-black font-semibold"
                    >
                      Choose File
                    </Button>
                  )}
                </div>
              </div>

              {/* Safety Warning */}
              <div className="mt-4 p-3 bg-lightning-yellow/10 border border-lightning-yellow/30 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-lightning-yellow text-lg">⚠️</span>
                  <div className="text-sm">
                    <p className="text-lightning-yellow font-medium">Demo & Testing Only</p>
                    <p className="text-gray-400">
                      Don&apos;t upload confidential files. Documents are auto-deleted after 2 hours.
                      This system uses Supabase pgvector for semantic search and GPT-5-nano for analysis.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Processing Section */}
      {processing && uploadedDocument && (
        <Card className="bg-lightning-dark/50 border-lightning-yellow">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <LightningElectricGlow intensity="medium">
                  <LoadingSpinner size="sm" />
                </LightningElectricGlow>
                <h4 className="text-lightning-yellow text-lg font-semibold">
                  Processing: {uploadedDocument.filename}
                </h4>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-lightning-gray rounded-full h-2">
                <div
                  className="bg-lightning-gradient h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / processingSteps.length) * 100}%` }}
                />
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {processingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                      ${index < currentStep
                        ? 'bg-lightning-yellow text-lightning-black'
                        : index === currentStep
                        ? 'bg-lightning-orange text-lightning-black animate-pulse'
                        : 'bg-lightning-gray text-gray-400'
                      }
                    `}>
                      {index < currentStep ? '✓' : step.id}
                    </div>
                    <span className={`text-xs sm:text-sm leading-tight ${
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
      )}

      {/* Document Ready & Chat Interface */}
      {processed && uploadedDocument && (
        <div className="space-y-6">
          {/* Document Info */}
          <Card className="bg-lightning-gray/30 border-lightning-green">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400 text-lg">✅</span>
                    <h4 className="text-lightning-yellow font-semibold">
                      Document Ready: {uploadedDocument.filename}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-3">
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
                        {uploadedDocument.wordCount || 'Processing...'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Chunks:</span>
                      <p className="text-lightning-orange font-medium">
                        {uploadedDocument.chunkCount || 'Processing...'}
                      </p>
                    </div>
                  </div>

                  {documentPreview && (
                    <div className="p-3 bg-lightning-black/30 rounded border border-lightning-gray text-sm">
                      <p className="text-gray-300 italic">&ldquo;{documentPreview}&rdquo;</p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={resetDemo}
                  variant="outline"
                  size="sm"
                  className="border-lightning-orange text-lightning-orange hover:bg-lightning-orange hover:text-lightning-black"
                >
                  New Document
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Questions */}
          {showQuestions && (
            <Card className="bg-lightning-gray/30 border-lightning-gray">
              <CardContent className="p-4">
                <h4 className="text-lightning-orange font-medium mb-3">💡 Ask About Your Document</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sampleQuestions.map((question, index) => (
                    <HoverScale key={index} scale={1.02}>
                      <Button
                        variant="outline"
                        onClick={() => handleQuestionClick(question)}
                        disabled={chatLoading}
                        className="text-left border-lightning-gray hover:border-lightning-yellow text-gray-300 hover:text-lightning-yellow h-auto p-3 text-sm whitespace-normal leading-relaxed"
                      >
                        <span className="block">{question}</span>
                      </Button>
                    </HoverScale>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chat Interface */}
          <Card className="bg-lightning-gray/30 border-lightning-gray min-h-[300px]">
            <CardContent className="p-4">
              {/* Messages */}
              {messages.length > 0 && (
                <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto">
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
                        {message.sources && message.sources.length > 0 && (
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
                    </motion.div>
                  ))}

                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-lightning-black border border-lightning-gray rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <LoadingSpinner size="sm" />
                          <span className="text-sm text-gray-400">Analyzing document...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

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
                  {chatLoading ? <LoadingSpinner size="sm" /> : 'Ask'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Limit Info */}
      {!usageStats.canUpload && (
        <Card className="bg-lightning-orange/10 border-lightning-orange">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <LightningElectricGlow intensity="low">
                <span className="text-lightning-orange text-lg">⚡</span>
              </LightningElectricGlow>
              <div>
                <h4 className="text-lightning-orange font-medium mb-1">Weekly Upload Limit Reached</h4>
                <p className="text-gray-300 text-sm">
                  You&apos;ve used all {usageStats.uploadsLimit} weekly document uploads.
                  This helps manage Supabase free tier storage limits (500MB database).
                  Uploads reset every Monday at 12:00 AM KST.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}