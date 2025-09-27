'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CircularLightningGlow } from "@/components/animated-elements"

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
  processingStatus: 'uploading' | 'processing' | 'completed' | 'error'
}

interface UsageStats {
  uploadsUsed: number
  uploadsLimit: number
  canUpload: boolean
}

export function RAGDemoTab() {
  const [dragActive, setDragActive] = useState(false)
  const [document, setDocument] = useState<DocumentInfo | null>(null)
  const [processing, setProcessing] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
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

  useEffect(() => {
    scrollToBottom()
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
          uploadsUsed: data.uploadsUsed || 0,
          uploadsLimit: data.uploadsLimit || 3,
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

  const handleFile = useCallback(async (file: File) => {
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

    const docInfo: DocumentInfo = {
      id: Date.now().toString(),
      filename: file.name,
      size: file.size,
      processingStatus: 'uploading'
    }

    setDocument(docInfo)
    setProcessing(true)
    setMessages([]) // Clear previous chat

    try {
      // Simulate processing
      setDocument(prev => prev ? { ...prev, processingStatus: 'processing' } : null)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Upload to backend
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setDocument(prev => prev ? { ...prev, processingStatus: 'completed', id: data.documentId || prev.id } : null)

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
      setDocument(prev => prev ? { ...prev, processingStatus: 'error' } : null)
    } finally {
      setProcessing(false)
    }
  }, [usageStats.canUpload, setDocument, setProcessing, setMessages, setUsageStats])

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
  }, [handleFile])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !document || document.processingStatus !== 'completed') return

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setChatLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: 'rag-document',
          documentId: document.id
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
    setDocument(null)
    setMessages([])
    setProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-white">RAG Knowledge Base</h3>
          <p className="text-sm text-gray-400">Upload documents and ask questions using AI-powered retrieval</p>
        </div>
        <div className="text-sm text-gray-400">
          {usageStats.uploadsUsed}/{usageStats.uploadsLimit} uploads used
        </div>
      </div>

      {!document && (
        <div className="bg-lightning-gray/20 border border-lightning-gray/40 rounded-xl p-8">
          <div
            className={`
              border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
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
                <div className="text-5xl">📚</div>
              </CircularLightningGlow>

              <div>
                <h4 className="text-lightning-yellow font-semibold text-lg mb-2">
                  {usageStats.canUpload ? 'Upload Your Document' : 'Weekly Upload Limit Reached'}
                </h4>
                <p className="text-gray-400 mb-4">
                  {usageStats.canUpload
                    ? 'Drop a PDF, DOCX, or TXT file here to create your knowledge base'
                    : 'Uploads reset every Monday at 12:00 AM KST'}
                </p>
                <p className="text-xs text-gray-500">
                  Max 10MB • PDF, DOCX, TXT supported
                </p>
              </div>

              {usageStats.canUpload && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}
                  className="bg-lightning-gradient hover:bg-lightning-gradient/90 text-lightning-black font-semibold"
                >
                  Choose File
                </Button>
              )}
            </div>
          </div>

          {/* Demo Warning */}
          <div className="mt-4 p-3 bg-lightning-yellow/10 border border-lightning-yellow/30 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-lightning-yellow">⚠️</span>
              <div className="text-xs text-gray-400">
                <p className="text-lightning-yellow font-medium mb-1">Demo Environment</p>
                <p>Don&apos;t upload confidential documents. Files are automatically deleted after 2 hours for privacy and storage optimization on the free tier.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Status */}
      {processing && document && (
        <div className="bg-lightning-gray/20 border border-lightning-yellow/40 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <LoadingSpinner size="sm" />
            <div>
              <h4 className="text-lightning-yellow font-semibold">{document.filename}</h4>
              <p className="text-sm text-gray-400">
                {document.processingStatus === 'uploading' && 'Uploading document...'}
                {document.processingStatus === 'processing' && 'Processing with AI vectors...'}
              </p>
            </div>
          </div>
          <div className="w-full bg-lightning-gray rounded-full h-2">
            <div
              className="bg-lightning-gradient h-2 rounded-full transition-all duration-1000"
              style={{
                width: document.processingStatus === 'uploading' ? '30%' :
                      document.processingStatus === 'processing' ? '70%' : '100%'
              }}
            />
          </div>
        </div>
      )}

      {/* Document Ready & Chat */}
      {document && document.processingStatus === 'completed' && (
        <div className="space-y-4">

          {/* Document Info */}
          <div className="bg-lightning-gray/20 border border-lightning-green/40 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <div>
                  <h4 className="text-lightning-yellow font-semibold">{document.filename}</h4>
                  <p className="text-sm text-gray-400">
                    {(document.size / 1024).toFixed(1)} KB • Ready for questions
                  </p>
                </div>
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
          </div>

          {/* Chat Interface */}
          <div className="bg-lightning-gray/20 border border-lightning-gray/40 rounded-xl overflow-hidden">

            {/* Messages */}
            <div className="h-[52vh] sm:h-[350px] overflow-y-auto p-4 sm:p-6">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4 max-w-lg mx-auto px-3">
                    <div className="text-4xl mb-4">💬</div>
                    <h4 className="text-lightning-yellow font-medium text-lg sm:text-xl">Ask questions about your document</h4>
                    <p className="text-gray-400 text-sm sm:text-base px-3">I can help you understand, summarize, and extract insights from the uploaded content.</p>
                    <div className="flex flex-wrap gap-3 justify-center mt-6">
                      <button
                        onClick={() => setInput("What is this document about?")}
                        className="text-sm px-4 py-2 bg-lightning-gray/40 hover:bg-lightning-gray/60 text-gray-300 hover:text-white rounded-lg transition-colors touch-target-sm"
                      >
                        Summarize
                      </button>
                      <button
                        onClick={() => setInput("What are the key points?")}
                        className="text-sm px-4 py-2 bg-lightning-gray/40 hover:bg-lightning-gray/60 text-gray-300 hover:text-white rounded-lg transition-colors touch-target-sm"
                      >
                        Key Points
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                    {message.sources && message.sources.length > 0 && (
                      <p className="text-xs text-lightning-yellow mt-2">
                        Sources: {message.sources.join(', ')}
                      </p>
                    )}
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-lightning-black/60 border border-lightning-gray/40 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span className="text-sm text-gray-400">Analyzing document...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-lightning-gray/40 p-3 sm:p-4">
              <div className="flex gap-2 sm:gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about your document..."
                  onKeyDown={handleKeyDown}
                  disabled={chatLoading}
                  className="bg-lightning-black/40 border-lightning-gray/40 text-white placeholder:text-gray-500 focus:border-lightning-yellow/50 focus:ring-lightning-yellow/20"
                />
                <Button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || chatLoading}
                  className="bg-lightning-gradient hover:bg-lightning-gradient/90 text-lightning-black font-medium px-4 sm:px-6 touch-target-sm"
                >
                  {chatLoading ? <LoadingSpinner size="sm" /> : 'Ask'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {document && document.processingStatus === 'error' && (
        <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <span className="text-red-400 text-xl">❌</span>
            <div>
              <h4 className="text-red-400 font-semibold">Processing Failed</h4>
              <p className="text-sm text-gray-400">
                Failed to process {document.filename}. Please try uploading a different file.
              </p>
            </div>
          </div>
          <Button
            onClick={resetDemo}
            className="mt-4 bg-lightning-gradient hover:bg-lightning-gradient/90 text-lightning-black"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}