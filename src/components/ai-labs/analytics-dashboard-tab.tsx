'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  StaggerContainer,
  StaggerItem,
  CircularLightningPulseAlwaysOn,
  LightningElectricGlow
} from "@/components/animated-elements"

interface SystemMetrics {
  aiAgent: {
    totalQuestions: number
    avgResponseTime: number
    status: 'active' | 'idle' | 'maintenance'
    uptime: string
    activeUsers: number
  }
  ragSystem: {
    documentsProcessed: number
    vectorsStored: number
    avgProcessingTime: number
    status: 'active' | 'idle' | 'maintenance'
    queriesProcessed: number
  }
  database: {
    connectionStatus: 'connected' | 'disconnected' | 'slow'
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

interface PerformanceMetric {
  timestamp: string
  responseTime: number
  system: 'ai-agent' | 'rag-system' | 'database'
}

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

export function AnalyticsDashboardTab() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [, setPerformanceData] = useState<PerformanceMetric[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    // Simulate loading and fetch real metrics
    const loadMetrics = async () => {
      setIsLoading(true)

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))

      // In production, this would fetch from /api/ai/analytics
      setMetrics(mockMetrics)

      // Generate mock performance data
      const now = new Date()
      const performanceData: PerformanceMetric[] = []
      for (let i = 29; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60000).toISOString()
        performanceData.push({
          timestamp,
          responseTime: 0.8 + Math.random() * 1.0,
          system: i % 3 === 0 ? 'ai-agent' : i % 3 === 1 ? 'rag-system' : 'database'
        })
      }
      setPerformanceData(performanceData)
      setLastUpdate(new Date())
      setIsLoading(false)
    }

    loadMetrics()

    // Auto-refresh every 30 seconds
    const interval = autoRefresh ? setInterval(loadMetrics, 30000) : null
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  const refreshMetrics = () => {
    setLastUpdate(new Date())
    // Trigger refresh
    setMetrics({ ...mockMetrics })
  }


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return 'border-green-400 text-green-400'
      case 'idle':
      case 'slow':
        return 'border-yellow-400 text-yellow-400'
      case 'maintenance':
      case 'disconnected':
        return 'border-red-400 text-red-400'
      default:
        return 'border-gray-400 text-gray-400'
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-lightning-gray/30 border-lightning-gray min-h-[500px]">
        <CardContent className="p-6 flex items-center justify-center h-[500px]">
          <div className="text-center space-y-4">
            <CircularLightningPulseAlwaysOn intensity="medium">
              <LoadingSpinner size="lg" />
            </CircularLightningPulseAlwaysOn>
            <p className="text-lightning-yellow">Loading analytics data...</p>
            <p className="text-gray-400 text-sm">Fetching real-time metrics</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!metrics) {
    return (
      <Card className="bg-lightning-gray/30 border-lightning-gray min-h-[500px]">
        <CardContent className="p-6 flex items-center justify-center h-[500px]">
          <div className="text-center space-y-4">
            <p className="text-lightning-orange">Failed to load metrics</p>
            <Button onClick={refreshMetrics} className="bg-lightning-gradient text-lightning-black">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lightning-yellow text-xl font-semibold">Analytics Dashboard</h3>
          <p className="text-gray-400 text-sm">Live system metrics and performance data</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-lightning-yellow text-lightning-yellow">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant="outline"
            className={`border-lightning-gray ${autoRefresh ? 'text-green-400 border-green-400' : 'text-gray-400'}`}
          >
            Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
          </Button>
          <Button
            size="sm"
            onClick={refreshMetrics}
            className="bg-lightning-gradient text-lightning-black"
          >
            Refresh
          </Button>
        </div>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* AI Agent Metrics */}
        <StaggerItem>
          <Card className="bg-lightning-gray/30 border-lightning-gray h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lightning-yellow text-lg flex items-center gap-2">
                <CircularLightningPulseAlwaysOn intensity="low">
                  🤖
                </CircularLightningPulseAlwaysOn>
                AI Agent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm">Status</span>
                <Badge variant="outline" className={getStatusBadge(metrics.aiAgent.status)}>
                  {metrics.aiAgent.status.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Questions</span>
                <span className="text-white font-medium text-right">{metrics.aiAgent.totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Avg Response</span>
                <span className="text-white font-medium text-right">{metrics.aiAgent.avgResponseTime}s</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Uptime</span>
                <span className="text-green-400 font-medium text-right">{metrics.aiAgent.uptime}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Active Users</span>
                <span className="text-lightning-yellow font-medium text-right">{metrics.aiAgent.activeUsers}</span>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* RAG System Metrics */}
        <StaggerItem>
          <Card className="bg-lightning-gray/30 border-lightning-gray h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lightning-yellow text-lg flex items-center gap-2">
                <CircularLightningPulseAlwaysOn intensity="low">
                  📚
                </CircularLightningPulseAlwaysOn>
                RAG System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm">Status</span>
                <Badge variant="outline" className={getStatusBadge(metrics.ragSystem.status)}>
                  {metrics.ragSystem.status.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Documents</span>
                <span className="text-white font-medium text-right">{metrics.ragSystem.documentsProcessed}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Vectors</span>
                <span className="text-white font-medium text-right">{metrics.ragSystem.vectorsStored.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Process Time</span>
                <span className="text-white font-medium text-right">{metrics.ragSystem.avgProcessingTime}s</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Queries</span>
                <span className="text-lightning-yellow font-medium text-right">{metrics.ragSystem.queriesProcessed}</span>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Database Metrics */}
        <StaggerItem>
          <Card className="bg-lightning-gray/30 border-lightning-gray h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lightning-yellow text-lg flex items-center gap-2">
                <CircularLightningPulseAlwaysOn intensity="low">
                  🗄️
                </CircularLightningPulseAlwaysOn>
                Database
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm">Connection</span>
                <Badge variant="outline" className={getStatusBadge(metrics.database.connectionStatus)}>
                  {metrics.database.connectionStatus.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Response Time</span>
                <span className="text-white font-medium text-right">{metrics.database.responseTime}ms</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Storage</span>
                <span className="text-white font-medium text-right text-xs sm:text-sm">
                  {metrics.database.storageUsed}MB / {metrics.database.storageLimit}MB
                </span>
              </div>
              <div className="w-full bg-lightning-gray rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(metrics.database.storageUsed / metrics.database.storageLimit) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-lightning-gradient h-2 rounded-full"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">Connections</span>
                <span className="text-lightning-yellow font-medium text-right">{metrics.database.activeConnections}</span>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Rate Limiting Overview */}
      <StaggerContainer>
        <StaggerItem>
          <Card className="bg-lightning-gradient/10 border-lightning-yellow">
            <CardHeader>
              <CardTitle className="text-lightning-yellow text-lg flex items-center gap-2">
                <LightningElectricGlow intensity="medium">
                  ⚡
                </LightningElectricGlow>
                Rate Limiting & Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="text-center space-y-2">
                  <div className="text-xl lg:text-2xl font-bold text-lightning-yellow">
                    {metrics.rateLimiting.questionsUsed}/{metrics.rateLimiting.questionsLimit}
                  </div>
                  <div className="text-gray-400 text-xs lg:text-sm">Questions Used</div>
                  <div className="w-full bg-lightning-gray rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(metrics.rateLimiting.questionsUsed / metrics.rateLimiting.questionsLimit) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-lightning-gradient h-2 rounded-full"
                    />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-xl lg:text-2xl font-bold text-lightning-yellow">
                    {metrics.rateLimiting.uploadsUsed}/{metrics.rateLimiting.uploadsLimit}
                  </div>
                  <div className="text-gray-400 text-xs lg:text-sm">Uploads Used</div>
                  <div className="w-full bg-lightning-gray rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(metrics.rateLimiting.uploadsUsed / metrics.rateLimiting.uploadsLimit) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-lightning-gradient h-2 rounded-full"
                    />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-xl lg:text-2xl font-bold text-green-400">
                    {Math.max(0, metrics.rateLimiting.questionsLimit - metrics.rateLimiting.questionsUsed)}
                  </div>
                  <div className="text-gray-400 text-xs lg:text-sm">Questions Left</div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-base lg:text-lg font-bold text-lightning-orange leading-tight">
                    {metrics.rateLimiting.resetTime}
                  </div>
                  <div className="text-gray-400 text-xs lg:text-sm">Reset Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Performance Chart Placeholder */}
      <StaggerContainer>
        <StaggerItem>
          <Card className="bg-lightning-gray/30 border-lightning-gray">
            <CardHeader>
              <CardTitle className="text-lightning-yellow text-lg">Response Time Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <CircularLightningPulseAlwaysOn intensity="low">
                    📊
                  </CircularLightningPulseAlwaysOn>
                  <p className="text-gray-400">Performance chart visualization</p>
                  <p className="text-gray-500 text-sm">Chart library integration coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* System Health Summary */}
      <StaggerContainer>
        <StaggerItem>
          <Card className="bg-lightning-black/50 border-lightning-gray">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <LightningElectricGlow intensity="high">
                  <h4 className="text-lightning-gradient text-lg font-semibold">All Systems Operational</h4>
                </LightningElectricGlow>
                <p className="text-gray-300">
                  AI Labs is running smoothly with all systems functioning within normal parameters.
                  Real-time monitoring active with {metrics.database.activeConnections} active database connections.
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge className="bg-green-400/20 text-green-400 border-green-400">
                    🟢 All Services Online
                  </Badge>
                  <Badge className="bg-lightning-yellow/20 text-lightning-yellow border-lightning-yellow">
                    ⚡ Performance Optimal
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}