'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { LoadingSpinner } from "@/components/loading-spinner"

interface SystemMetrics {
  aiAgent: {
    totalQuestions: number
    avgResponseTime: number
    status: 'active' | 'idle'
    uptime: string
    activeUsers: number
  }
  ragSystem: {
    documentsProcessed: number
    vectorsStored: number
    avgProcessingTime: number
    status: 'active' | 'idle'
    queriesProcessed: number
  }
  database: {
    connectionStatus: 'connected' | 'disconnected'
    responseTime: number
    storageUsed: number
    storageLimit: number
    activeConnections: number
  }
  rateLimiting: {
    questionsUsed: number
    questionsLimit: number
    uploadsUsed: number
    uploadsLimit: number
    resetTime: string
  }
}

// Mock data - in production this would come from your analytics API
const mockMetrics: SystemMetrics = {
  aiAgent: {
    totalQuestions: 147,
    avgResponseTime: 1.2,
    status: 'active',
    uptime: '99.8%',
    activeUsers: 3
  },
  ragSystem: {
    documentsProcessed: 23,
    vectorsStored: 1847,
    avgProcessingTime: 3.4,
    status: 'active',
    queriesProcessed: 89
  },
  database: {
    connectionStatus: 'connected',
    responseTime: 45,
    storageUsed: 127,
    storageLimit: 500,
    activeConnections: 2
  },
  rateLimiting: {
    questionsUsed: 7,
    questionsLimit: 10,
    uploadsUsed: 2,
    uploadsLimit: 3,
    resetTime: 'Monday 12:00 AM KST'
  }
}

export function AnalyticsTab() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Load metrics with simulated API call
    const loadMetrics = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
      setMetrics(mockMetrics)
      setLastUpdate(new Date())
      setIsLoading(false)
    }

    loadMetrics()

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setMetrics(mockMetrics) // In production, fetch fresh data
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-400">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <p className="text-lightning-orange">Failed to load metrics</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return 'text-green-400'
      case 'idle':
        return 'text-yellow-400'
      default:
        return 'text-red-400'
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return 'bg-green-400'
      case 'idle':
        return 'bg-yellow-400'
      default:
        return 'bg-red-400'
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-white">System Analytics</h3>
          <p className="text-sm text-gray-400">Real-time performance metrics</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Updated {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* AI Agent */}
        <div className="bg-lightning-gray/20 border border-lightning-gray/40 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🤖</div>
            <div>
              <h4 className="text-white font-medium">AI Agent</h4>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${getStatusDot(metrics.aiAgent.status)}`}></div>
                <span className={getStatusColor(metrics.aiAgent.status)}>
                  {metrics.aiAgent.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Questions</span>
              <span className="text-white font-medium">{metrics.aiAgent.totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Avg Response</span>
              <span className="text-white font-medium">{metrics.aiAgent.avgResponseTime}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Uptime</span>
              <span className="text-green-400 font-medium">{metrics.aiAgent.uptime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Active Users</span>
              <span className="text-lightning-yellow font-medium">{metrics.aiAgent.activeUsers}</span>
            </div>
          </div>
        </div>

        {/* RAG System */}
        <div className="bg-lightning-gray/20 border border-lightning-gray/40 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">📚</div>
            <div>
              <h4 className="text-white font-medium">RAG System</h4>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${getStatusDot(metrics.ragSystem.status)}`}></div>
                <span className={getStatusColor(metrics.ragSystem.status)}>
                  {metrics.ragSystem.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Documents</span>
              <span className="text-white font-medium">{metrics.ragSystem.documentsProcessed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Vectors</span>
              <span className="text-white font-medium">{metrics.ragSystem.vectorsStored.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Process Time</span>
              <span className="text-white font-medium">{metrics.ragSystem.avgProcessingTime}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Queries</span>
              <span className="text-lightning-yellow font-medium">{metrics.ragSystem.queriesProcessed}</span>
            </div>
          </div>
        </div>

        {/* Database */}
        <div className="bg-lightning-gray/20 border border-lightning-gray/40 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🗄️</div>
            <div>
              <h4 className="text-white font-medium">Database</h4>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${getStatusDot(metrics.database.connectionStatus)}`}></div>
                <span className={getStatusColor(metrics.database.connectionStatus)}>
                  {metrics.database.connectionStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Response Time</span>
              <span className="text-white font-medium">{metrics.database.responseTime}ms</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Storage</span>
                <span className="text-white font-medium text-xs">
                  {metrics.database.storageUsed}MB / {metrics.database.storageLimit}MB
                </span>
              </div>
              <div className="w-full bg-lightning-gray/40 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(metrics.database.storageUsed / metrics.database.storageLimit) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-lightning-gradient h-2 rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Connections</span>
              <span className="text-lightning-yellow font-medium">{metrics.database.activeConnections}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Limits */}
      <div className="bg-lightning-gradient/10 border border-lightning-yellow/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">⚡</span>
          <div>
            <h4 className="text-lightning-yellow font-semibold text-lg">Usage & Rate Limits</h4>
            <p className="text-gray-400 text-sm">Current usage across AI Labs components</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-lightning-yellow mb-1">
              {metrics.rateLimiting.questionsUsed}/{metrics.rateLimiting.questionsLimit}
            </div>
            <div className="text-gray-400 text-sm mb-2">Questions Used</div>
            <div className="w-full bg-lightning-gray/40 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(metrics.rateLimiting.questionsUsed / metrics.rateLimiting.questionsLimit) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-lightning-gradient h-2 rounded-full"
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-lightning-yellow mb-1">
              {metrics.rateLimiting.uploadsUsed}/{metrics.rateLimiting.uploadsLimit}
            </div>
            <div className="text-gray-400 text-sm mb-2">Uploads Used</div>
            <div className="w-full bg-lightning-gray/40 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(metrics.rateLimiting.uploadsUsed / metrics.rateLimiting.uploadsLimit) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-lightning-gradient h-2 rounded-full"
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {Math.max(0, metrics.rateLimiting.questionsLimit - metrics.rateLimiting.questionsUsed)}
            </div>
            <div className="text-gray-400 text-sm">Questions Left</div>
          </div>

          <div className="text-center">
            <div className="text-base font-bold text-lightning-orange mb-1 leading-tight">
              {metrics.rateLimiting.resetTime}
            </div>
            <div className="text-gray-400 text-sm">Reset Time</div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-lightning-black/40 border border-lightning-gray/40 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl">✅</span>
          <h4 className="text-lightning-gradient text-xl font-semibold">All Systems Operational</h4>
        </div>
        <p className="text-gray-300 mb-4">
          AI Labs is running smoothly with all systems functioning within normal parameters.
          Real-time monitoring active with {metrics.database.activeConnections} database connections.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            All Services Online
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-lightning-yellow/20 text-lightning-yellow rounded-full text-sm">
            <div className="w-2 h-2 bg-lightning-yellow rounded-full"></div>
            Performance Optimal
          </div>
        </div>
      </div>
    </div>
  )
}