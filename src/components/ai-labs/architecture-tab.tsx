'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  StaggerContainer,
  StaggerItem,
  CircularLightningPulseAlwaysOn,
  HoverScale
} from "@/components/animated-elements"

interface TechStackItem {
  name: string
  version: string
  description: string
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'deployment' | 'monitoring'
  docs?: string
}

interface ArchitectureComponent {
  id: string
  title: string
  description: string
  techStack: TechStackItem[]
  connections: string[]
  features: string[]
  codeExample?: string
}

const techStack: TechStackItem[] = [
  {
    name: 'Next.js',
    version: '15.x',
    description: 'React framework with App Router for server-side rendering and API routes',
    category: 'frontend',
    docs: 'https://nextjs.org'
  },
  {
    name: 'React',
    version: '19.x',
    description: 'Component-based UI library with server components support',
    category: 'frontend',
    docs: 'https://react.dev'
  },
  {
    name: 'TypeScript',
    version: '5.x',
    description: 'Type-safe JavaScript for enhanced development experience',
    category: 'frontend',
    docs: 'https://typescriptlang.org'
  },
  {
    name: 'Tailwind CSS',
    version: '3.x',
    description: 'Utility-first CSS framework for rapid UI development',
    category: 'frontend',
    docs: 'https://tailwindcss.com'
  },
  {
    name: 'AI SDK',
    version: '5.x',
    description: 'Vercel AI SDK for streamlined AI integration',
    category: 'ai',
    docs: 'https://sdk.vercel.ai'
  },
  {
    name: 'GPT-5-nano',
    version: 'Latest',
    description: 'Advanced language model for technical conversations',
    category: 'ai'
  },
  {
    name: 'Supabase',
    version: 'Latest',
    description: 'Backend-as-a-Service with PostgreSQL and real-time features',
    category: 'backend',
    docs: 'https://supabase.com'
  },
  {
    name: 'pgvector',
    version: '0.5+',
    description: 'PostgreSQL extension for vector similarity search',
    category: 'database'
  },
  {
    name: 'Motion',
    version: '11.x',
    description: 'Production-ready motion library for React animations',
    category: 'frontend'
  },
  {
    name: 'Zod',
    version: '4.x',
    description: 'TypeScript-first schema validation library',
    category: 'backend'
  }
]

const architectureComponents: ArchitectureComponent[] = [
  {
    id: 'ai-agent',
    title: 'AI Agent System',
    description: 'Advanced conversational AI powered by GPT-5-nano with specialized technical knowledge',
    techStack: techStack.filter(t => ['GPT-5-nano', 'AI SDK', 'Zod'].includes(t.name)),
    connections: ['rate-limiter', 'analytics', 'ui-layer'],
    features: [
      'Context-aware conversations',
      'Technical expertise specialization',
      'Real-time response streaming',
      'Token usage optimization',
      'Custom system prompts'
    ],
    codeExample: `// AI Agent Implementation
const response = await fetch('/api/ai/chat', {
  method: 'POST',
  body: JSON.stringify({
    message: userInput,
    context: 'ai-labs-agent',
    systemPrompt: 'Technical expert specialization'
  })
})`
  },
  {
    id: 'rag-system',
    title: 'RAG Processing Pipeline',
    description: 'Document intelligence system using vector embeddings for semantic search',
    techStack: techStack.filter(t => ['Supabase', 'pgvector', 'AI SDK', 'GPT-5-nano'].includes(t.name)),
    connections: ['database', 'ai-agent', 'analytics'],
    features: [
      '6-step document processing',
      'Vector embedding generation',
      'Semantic similarity search',
      'Source attribution',
      'Free tier optimization'
    ],
    codeExample: `// RAG Implementation
const embeddings = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: documentChunks
})

await supabase.from('documents')
  .insert({ content, embedding: embeddings })`
  },
  {
    id: 'database',
    title: 'Supabase Backend',
    description: 'PostgreSQL database with vector search capabilities and real-time subscriptions',
    techStack: techStack.filter(t => ['Supabase', 'pgvector', 'PostgreSQL'].includes(t.name)),
    connections: ['rag-system', 'rate-limiter', 'analytics'],
    features: [
      'Vector similarity search',
      'Row Level Security (RLS)',
      'Real-time subscriptions',
      'RESTful API generation',
      'Free tier: 500MB storage'
    ],
    codeExample: `-- Vector Search Query
SELECT content, 1 - (embedding <=> $1) AS similarity
FROM documents
WHERE 1 - (embedding <=> $1) > 0.8
ORDER BY similarity DESC
LIMIT 5;`
  },
  {
    id: 'rate-limiter',
    title: 'Rate Limiting System',
    description: 'Custom rate limiting with usage tracking and Korean timezone resets',
    techStack: techStack.filter(t => ['Supabase', 'Next.js'].includes(t.name)),
    connections: ['ai-agent', 'rag-system', 'database'],
    features: [
      'Per-user question limits (10/week)',
      'Document upload limits (3/week)',
      'Korean timezone resets (Monday 12:00 AM KST)',
      'Real-time usage tracking',
      'Graceful degradation'
    ],
    codeExample: `// Rate Limiting Logic
const userUsage = await supabase
  .from('user_usage')
  .select('questions_used, uploads_used, week_start')
  .eq('user_id', userId)
  .single()

const canUse = userUsage.questions_used < 10`
  },
  {
    id: 'ui-layer',
    title: 'Lightning UI System',
    description: 'Custom design system with responsive animations and accessibility features',
    techStack: techStack.filter(t => ['React', 'TypeScript', 'Tailwind CSS', 'Motion'].includes(t.name)),
    connections: ['ai-agent', 'rag-system', 'analytics'],
    features: [
      'Mobile-first responsive design',
      'Lightning theme consistency',
      'Smooth scroll navigation',
      'Glass morphism effects',
      'Performance-optimized animations'
    ],
    codeExample: `// Lightning Animation Component
<CircularLightningPulseAlwaysOn intensity="high">
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="lightning-gradient-bg"
  >
    Interactive Element
  </motion.div>
</CircularLightningPulseAlwaysOn>`
  },
  {
    id: 'analytics',
    title: 'Analytics & Monitoring',
    description: 'Real-time system metrics and performance monitoring dashboard',
    techStack: techStack.filter(t => ['Next.js', 'Supabase', 'React'].includes(t.name)),
    connections: ['ai-agent', 'rag-system', 'database', 'rate-limiter'],
    features: [
      'Real-time metrics collection',
      'System health monitoring',
      'Usage analytics',
      'Performance tracking',
      'Auto-refresh capabilities'
    ],
    codeExample: `// Metrics Collection
const metrics = await Promise.all([
  getAIAgentMetrics(),
  getRAGSystemMetrics(),
  getDatabaseMetrics(),
  getRateLimitingStats()
])

return { systemHealth: 'operational', ...metrics }`
  }
]

const categoryColors = {
  frontend: 'border-blue-400 text-blue-400',
  backend: 'border-green-400 text-green-400',
  database: 'border-purple-400 text-purple-400',
  ai: 'border-lightning-yellow text-lightning-yellow',
  deployment: 'border-orange-400 text-orange-400',
  monitoring: 'border-red-400 text-red-400'
}

export function ArchitectureTab() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTechStack = selectedCategory
    ? techStack.filter(item => item.category === selectedCategory)
    : techStack

  const getSelectedComponentData = () => {
    return architectureComponents.find(comp => comp.id === selectedComponent)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-lightning-yellow text-xl font-semibold">Technical Architecture</h3>
        <p className="text-gray-400 text-sm">Deep dive into AI Labs system implementation</p>
      </div>

      {/* Architecture Overview */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {architectureComponents.map((component) => (
          <StaggerItem key={component.id}>
            <HoverScale scale={1.02}>
              <Card
                className={`cursor-pointer transition-all duration-300 ${
                  selectedComponent === component.id
                    ? 'bg-lightning-yellow/10 border-lightning-yellow'
                    : 'bg-lightning-gray/30 border-lightning-gray hover:border-lightning-yellow/50'
                }`}
                onClick={() => setSelectedComponent(
                  selectedComponent === component.id ? null : component.id
                )}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lightning-yellow text-base flex items-center gap-2">
                    <CircularLightningPulseAlwaysOn intensity="low">
                      <span className="text-lg">
                        {component.id === 'ai-agent' && '🤖'}
                        {component.id === 'rag-system' && '📚'}
                        {component.id === 'database' && '🗄️'}
                        {component.id === 'rate-limiter' && '⚡'}
                        {component.id === 'ui-layer' && '🎨'}
                        {component.id === 'analytics' && '📊'}
                      </span>
                    </CircularLightningPulseAlwaysOn>
                    {component.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{component.description}</p>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {component.techStack.slice(0, 3).map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className={`text-xs px-2 py-1 ${categoryColors[tech.category]}`}
                        >
                          {tech.name}
                        </Badge>
                      ))}
                      {component.techStack.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-1 text-gray-400 border-gray-400">
                          +{component.techStack.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 pt-1">
                      <span>Connected to:</span>
                      <span>{component.connections.length} systems</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </HoverScale>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Detailed Component View */}
      <AnimatePresence>
        {selectedComponent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-lightning-gradient/5 border-lightning-yellow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lightning-yellow text-xl">
                    {getSelectedComponentData()?.title} Details
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedComponent(null)}
                    className="text-gray-400 hover:text-lightning-yellow"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-lightning-orange font-medium mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {getSelectedComponentData()?.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed">
                          <span className="text-lightning-yellow mt-1 flex-shrink-0">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-lightning-orange font-medium mb-3">Technology Stack</h4>
                    <div className="space-y-2">
                      {getSelectedComponentData()?.techStack.map((tech, index) => (
                        <div key={index} className="flex items-center justify-between gap-2 text-sm">
                          <span className="text-gray-300 flex-shrink-0">{tech.name}</span>
                          <Badge variant="outline" className={`text-xs ${categoryColors[tech.category]}`}>
                            {tech.version}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                {getSelectedComponentData()?.codeExample && (
                  <div>
                    <h4 className="text-lightning-orange font-medium mb-3">Implementation Example</h4>
                    <Card className="bg-lightning-black border-lightning-gray">
                      <CardContent className="p-4">
                        <pre className="text-xs text-gray-300 overflow-x-auto">
                          <code>{getSelectedComponentData()?.codeExample}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Connections */}
                <div>
                  <h4 className="text-lightning-orange font-medium mb-3">System Connections</h4>
                  <div className="flex flex-wrap gap-2">
                    {getSelectedComponentData()?.connections.map((connection, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedComponent(connection)}
                        className="text-xs border-lightning-gray text-gray-300 hover:border-lightning-yellow hover:text-lightning-yellow"
                      >
                        {architectureComponents.find(comp => comp.id === connection)?.title || connection}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech Stack Overview */}
      <StaggerContainer>
        <StaggerItem>
          <Card className="bg-lightning-gray/30 border-lightning-gray">
            <CardHeader>
              <CardTitle className="text-lightning-yellow text-lg">Complete Tech Stack</CardTitle>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={`text-xs ${!selectedCategory ? 'border-lightning-yellow text-lightning-yellow' : 'border-gray-400 text-gray-400'}`}
                >
                  All
                </Button>
                {Object.keys(categoryColors).map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs capitalize ${
                      selectedCategory === category
                        ? 'border-lightning-yellow text-lightning-yellow'
                        : 'border-gray-400 text-gray-400'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTechStack.map((tech, index) => (
                  <Card key={index} className="bg-lightning-black/50 border-lightning-gray/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h5 className="text-white font-medium flex-shrink-0">{tech.name}</h5>
                        <Badge variant="outline" className={`text-xs ${categoryColors[tech.category]}`}>
                          {tech.version}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-xs mb-2 leading-relaxed">{tech.description}</p>
                      {tech.docs && (
                        <a
                          href={tech.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lightning-yellow text-xs hover:underline"
                        >
                          Documentation →
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* System Flow */}
      <StaggerContainer>
        <StaggerItem>
          <Card className="bg-lightning-black/30 border-lightning-gray">
            <CardHeader>
              <CardTitle className="text-lightning-yellow text-lg">Data Flow Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <CircularLightningPulseAlwaysOn intensity="low">
                    <span className="text-lightning-yellow flex-shrink-0">1.</span>
                  </CircularLightningPulseAlwaysOn>
                  <span className="leading-relaxed"><strong>User Input:</strong> Question or document upload through Lightning UI</span>
                </div>
                <div className="flex items-start gap-3">
                  <CircularLightningPulseAlwaysOn intensity="low">
                    <span className="text-lightning-yellow flex-shrink-0">2.</span>
                  </CircularLightningPulseAlwaysOn>
                  <span className="leading-relaxed"><strong>Rate Limiting:</strong> Check usage limits against Supabase records</span>
                </div>
                <div className="flex items-start gap-3">
                  <CircularLightningPulseAlwaysOn intensity="low">
                    <span className="text-lightning-yellow flex-shrink-0">3.</span>
                  </CircularLightningPulseAlwaysOn>
                  <span className="leading-relaxed"><strong>Processing:</strong> AI SDK v5 handles LLM communication and streaming</span>
                </div>
                <div className="flex items-start gap-3">
                  <CircularLightningPulseAlwaysOn intensity="low">
                    <span className="text-lightning-yellow flex-shrink-0">4.</span>
                  </CircularLightningPulseAlwaysOn>
                  <span className="leading-relaxed"><strong>RAG Integration:</strong> Vector search in pgvector for relevant context</span>
                </div>
                <div className="flex items-start gap-3">
                  <CircularLightningPulseAlwaysOn intensity="low">
                    <span className="text-lightning-yellow flex-shrink-0">5.</span>
                  </CircularLightningPulseAlwaysOn>
                  <span className="leading-relaxed"><strong>Response Generation:</strong> GPT-5-nano generates contextual response</span>
                </div>
                <div className="flex items-start gap-3">
                  <CircularLightningPulseAlwaysOn intensity="low">
                    <span className="text-lightning-yellow flex-shrink-0">6.</span>
                  </CircularLightningPulseAlwaysOn>
                  <span className="leading-relaxed"><strong>Analytics Tracking:</strong> Record metrics for dashboard visualization</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}