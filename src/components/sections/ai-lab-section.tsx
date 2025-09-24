'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  CircularLightningPulseAlwaysOn,
  InViewLightningPulse
} from "@/components/animated-elements"
import { AIAgentChatTab } from "@/components/ai-labs/ai-agent-chat-tab"
import { DocumentRAGTab } from "@/components/ai-labs/document-rag-tab"
import { AnalyticsDashboardTab } from "@/components/ai-labs/analytics-dashboard-tab"
import { ArchitectureTab } from "@/components/ai-labs/architecture-tab"

interface AILabsHeroProps {
  onDemoComplete: () => void
}

function AILabsHero({ onDemoComplete }: AILabsHeroProps) {
  const [demoStep, setDemoStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const demoSteps = [
    "Initializing AI systems...",
    "Loading neural networks...",
    "Connecting to knowledge base...",
    "RAG system ready...",
    "AI Lab activated! ⚡"
  ]

  const startDemo = () => {
    if (isRunning) return
    setIsRunning(true)
    setDemoStep(0)

    const stepDuration = shouldReduceMotion ? 400 : 800

    demoSteps.forEach((_, index) => {
      setTimeout(() => {
        setDemoStep(index + 1)
        if (index === demoSteps.length - 1) {
          setTimeout(() => {
            setIsRunning(false)
            onDemoComplete()
          }, stepDuration)
        }
      }, index * stepDuration)
    })
  }

  return (
    <div className="text-center space-y-8 mb-16">
      <FadeIn>
        <div className="space-y-4">
          <CircularLightningPulseAlwaysOn intensity="medium" className="inline-block">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-lightning-gradient">
              AI Laboratory
            </h2>
          </CircularLightningPulseAlwaysOn>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience advanced AI capabilities through interactive demonstrations.
            From intelligent document analysis to real-time AI conversations.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline" className="border-lightning-yellow text-lightning-yellow">
              GPT-5-nano Powered
            </Badge>
            <Badge variant="outline" className="border-lightning-orange text-lightning-orange">
              Real RAG System
            </Badge>
            <Badge variant="outline" className="border-lightning-yellow text-lightning-yellow">
              Live Analytics
            </Badge>
            <Badge variant="outline" className="border-lightning-orange text-lightning-orange">
              Vector Database
            </Badge>
          </div>
        </div>
      </FadeIn>

      <SlideIn direction="up" delay={0.3}>
        <Card className="bg-lightning-dark/30 border-lightning-gray max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="space-y-6">
              <h3 className="text-lightning-yellow text-xl font-semibold">
                5-Second System Demo
              </h3>

              <div className="space-y-4">
                <div
                  onClick={startDemo}
                  className={`
                    p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
                    ${isRunning
                      ? 'border-lightning-yellow bg-lightning-yellow/10'
                      : 'border-lightning-gray hover:border-lightning-yellow/50 bg-lightning-black/30'
                    }
                  `}
                >
                  {isRunning ? (
                    <div className="flex items-center justify-center gap-3">
                      <InViewLightningPulse>
                        <div className="w-4 h-4 bg-lightning-yellow rounded-full animate-pulse" />
                      </InViewLightningPulse>
                      <span className="text-lightning-yellow font-medium">
                        {demoStep > 0 && demoStep <= demoSteps.length
                          ? demoSteps[demoStep - 1]
                          : 'Initializing...'}
                      </span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-2xl mb-2">⚡</div>
                      <p className="text-lightning-yellow font-medium">
                        Click to Start AI Demo
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Quick preview of AI capabilities
                      </p>
                    </div>
                  )}
                </div>

                {!isRunning && (
                  <p className="text-gray-500 text-sm">
                    Experience the power of modern AI systems in just 5 seconds
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </SlideIn>
    </div>
  )
}

interface AIPlaygroundTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

function AIPlaygroundTabs({ activeTab, onTabChange }: AIPlaygroundTabsProps) {
  const tabs = [
    { id: 'agent', label: 'AI Agent', icon: '🤖', description: 'Advanced AI conversations' },
    { id: 'documents', label: 'RAG System', icon: '📚', description: 'Document intelligence' },
    { id: 'analytics', label: 'Analytics', icon: '📊', description: 'Live system metrics' },
    { id: 'architecture', label: 'Architecture', icon: '⚙️', description: 'Technical details' }
  ]

  return (
    <div className="mb-8">
      {/* Mobile Tab Navigation - Swipeable */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <div className="flex gap-2 px-4 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex flex-col items-center gap-1 p-3 rounded-lg whitespace-nowrap min-w-[80px]
                  transition-all duration-300 text-sm font-medium
                  ${activeTab === tab.id
                    ? 'bg-lightning-gradient text-lightning-black'
                    : 'bg-lightning-gray/30 text-gray-300 hover:bg-lightning-gray/50'
                  }
                `}
                style={{ minHeight: '48px' }}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Tab Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${activeTab === tab.id ? 'bg-lightning-yellow' : 'bg-lightning-gray'}
              `}
            />
          ))}
        </div>
      </div>

      {/* Desktop Tab Navigation - Hover Effects */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-300
                ${activeTab === tab.id
                  ? 'border-lightning-yellow bg-lightning-yellow/10'
                  : 'border-lightning-gray bg-lightning-gray/20 hover:border-lightning-yellow/50'
                }
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tab.icon}</span>
                <h3 className={`font-semibold ${
                  activeTab === tab.id ? 'text-lightning-yellow' : 'text-white'
                }`}>
                  {tab.label}
                </h3>
              </div>
              <p className="text-gray-400 text-sm">{tab.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabContent({ tabId }: { tabId: string }) {
  // Return actual components for each tab
  switch (tabId) {
    case 'agent':
      return <AIAgentChatTab />

    case 'documents':
      return <DocumentRAGTab />

    case 'analytics':
      return <AnalyticsDashboardTab />

    case 'architecture':
      return <ArchitectureTab />

    default:
      return <PlaceholderTabContent tabId={tabId} />
  }
}

function PlaceholderTabContent({ tabId }: { tabId: string }) {
  const content = {
    documents: {
      title: "RAG Document System",
      description: "Real document processing with Supabase pgvector",
      features: ["Document upload", "Vector embeddings", "Semantic search"]
    },
    analytics: {
      title: "Live Analytics Dashboard",
      description: "Real-time metrics from your AI interactions",
      features: ["Usage tracking", "Response times", "System performance"]
    },
    architecture: {
      title: "Technical Architecture",
      description: "Deep dive into the AI system implementation",
      features: ["System components", "Data flow", "Infrastructure"]
    }
  }

  const tab = content[tabId as keyof typeof content]

  return (
    <Card className="bg-lightning-gray/30 border-lightning-gray min-h-[400px]">
      <CardHeader>
        <CardTitle className="text-lightning-yellow text-xl">
          {tab.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-gray-300">{tab.description}</p>

          <div>
            <h4 className="text-lightning-orange font-medium mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {tab.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <span className="text-lightning-yellow">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 p-4 bg-lightning-black/50 rounded-lg border border-lightning-gray">
            <p className="text-lightning-orange text-sm font-medium mb-2">🚧 Under Construction</p>
            <p className="text-gray-400 text-sm">
              This {tab.title.toLowerCase()} will be implemented in the next development phase.
              The component structure and integrations are ready.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AILabSection() {
  const [demoCompleted, setDemoCompleted] = useState(false)
  const [activeTab, setActiveTab] = useState('agent')

  return (
    <section id="ai-lab" className="relative py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <AILabsHero onDemoComplete={() => setDemoCompleted(true)} />

        {/* Main Content */}
        <StaggerContainer className="space-y-8">

          {/* AI Playground */}
          <StaggerItem>
            <Card className="bg-lightning-dark/20 border-lightning-gray/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lightning-yellow text-2xl sm:text-3xl flex items-center gap-3">
                    <CircularLightningPulseAlwaysOn intensity="low" className="inline-block">
                      <span>⚡</span>
                    </CircularLightningPulseAlwaysOn>
                    AI Playground
                  </CardTitle>

                  {demoCompleted && (
                    <Badge className="bg-lightning-gradient text-lightning-black font-semibold">
                      Systems Online
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Tab Navigation */}
                <AIPlaygroundTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {/* Tab Content */}
                <div className="relative">
                  <SlideIn key={activeTab} direction="up" duration={0.3}>
                    <TabContent tabId={activeTab} />
                  </SlideIn>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Professional CTA */}
          <StaggerItem>
            <Card className="bg-lightning-gradient/10 border-lightning-yellow text-center">
              <CardContent className="p-8">
                <h3 className="text-lightning-yellow text-xl font-semibold mb-3">
                  Ready to Build Something Amazing?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  These AI capabilities showcase what&apos;s possible with modern technology.
                  Let&apos;s discuss how we can implement similar solutions for your project.
                </p>
                <motion.a
                  href="#connect"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-lightning-gradient text-lightning-black font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Let&apos;s Connect ⚡
                </motion.a>
              </CardContent>
            </Card>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </section>
  )
}