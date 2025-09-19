"use client"

import { Suspense, lazy } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionLoading } from "@/components/loading-spinner"

// Dynamic imports for heavy components
const DataFlow = lazy(() => import("@/components/backgrounds/data-flow").then(module => ({ default: module.DataFlow })))
const ProjectComplexityAnalyzer = lazy(() => import("@/components/project-complexity-analyzer").then(module => ({ default: module.ProjectComplexityAnalyzer })))
const RAGDocumentDemo = lazy(() => import("@/components/rag-document-demo").then(module => ({ default: module.RAGDocumentDemo })))
const AIShowcaseSection = lazy(() => import("@/components/ai-showcase-section").then(module => ({ default: module.AIShowcaseSection })))
import {
  FadeIn,
  SlideIn,
  HoverScale,
  Floating,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  GradientShine
} from "@/components/animated-elements"

export function AILabSection() {
  const aiFeatures = [
    {
      title: "RAG System Demo",
      subtitle: "Ask My AI Anything",
      icon: "🔍",
      description: "Upload documents (PDF, DOCX, TXT) and ask questions about the content",
      technology: "RAG (Retrieval-Augmented Generation) with vector embeddings and semantic search",
      privacy: "Documents processed temporarily and deleted after session",
      tryText: "Upload a document and ask: 'What are the key points?' or 'Summarize this for me'",
      proves: "Advanced AI integration, document processing, and practical problem-solving"
    },
    {
      title: "Complexity Analyzer",
      subtitle: "Project Estimation Intelligence",
      icon: "⚡",
      description: "Analyzes project descriptions and provides intelligent complexity assessments",
      technology: "AI-powered effort estimation, risk analysis, technology recommendations",
      privacy: "All analysis done locally with secure processing",
      tryText: "Describe any software project and get instant intelligent analysis",
      proves: "Business-focused AI applications that solve real problems"
    },
    {
      title: "AI Code Assistant",
      subtitle: "Watch AI Help Me Code",
      icon: "🤖",
      description: "Live demonstration of AI-assisted development workflow",
      technology: "Integration with Claude Code CLI and Cursor IDE workflow",
      privacy: "Code generation happens in real-time with full transparency",
      tryText: "Request a specific component or function and watch AI help build it",
      proves: "Cutting-edge development workflow and AI-enhanced productivity"
    },
    {
      title: "Intelligent Contact",
      subtitle: "Smart Form That Adapts",
      icon: "💬",
      description: "Contact form that intelligently adapts based on your project type",
      technology: "Dynamic questions, requirement gathering, automatic project classification",
      privacy: "Form data processed securely with intelligent response generation",
      tryText: "Start describing a project and watch the form become smarter",
      proves: "User experience enhancement through thoughtful AI integration"
    }
  ]

  return (
    <section id="ai-lab" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-lightning-dark/30 overflow-hidden">
      {/* Data Flow Background Animation */}
      <Suspense fallback={<div className="absolute inset-0 bg-lightning-dark/30" />}>
        <DataFlow intensity="high" />
      </Suspense>

      <div className="relative z-10 container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-8xl">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-impact text-lightning-gradient mb-4">
              Intelligence Playground
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
              Don't just read about my AI skills - experience them directly. These live demos showcase practical
              AI implementations you can interact with right now.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive AI Features Grid */}
        <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-16">
          {aiFeatures.map((feature, index) => (
            <StaggerItem key={index}>
              <HoverScale scale={1.02}>
                <Card className="h-full bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/50 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Floating intensity={6} duration={3 + index * 0.5}>
                        <div className="text-3xl sm:text-4xl">{feature.icon}</div>
                      </Floating>
                      <div>
                        <CardTitle className="text-lightning-yellow text-lg sm:text-xl">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-lightning-orange text-sm font-medium">
                          {feature.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <strong>What It Does:</strong> {feature.description}
                    </p>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      <strong>Technology:</strong> {feature.technology}
                    </p>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      <strong>Privacy:</strong> {feature.privacy}
                    </p>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      <strong>Try It:</strong> {feature.tryText}
                    </p>

                    <div className="pt-2">
                      <Badge variant="outline" className="border-lightning-yellow text-lightning-yellow text-xs">
                        {feature.proves}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Live AI Demos */}
        <div className="space-y-12 lg:space-y-16">
          {/* Project Complexity Analyzer */}
          <ScrollReveal>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-lightning-yellow mb-6 text-center">
                ⚡ Live Demo: Project Complexity Analyzer
              </h3>
              <Suspense fallback={<SectionLoading />}>
                <ProjectComplexityAnalyzer />
              </Suspense>
            </div>
          </ScrollReveal>

          {/* RAG Document Analysis Demo */}
          <ScrollReveal>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-lightning-yellow mb-6 text-center">
                🔍 Live Demo: RAG Document Analysis
              </h3>
              <Suspense fallback={<SectionLoading />}>
                <RAGDocumentDemo />
              </Suspense>
            </div>
          </ScrollReveal>

          {/* AI Showcase Features */}
          <ScrollReveal>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-lightning-yellow mb-6 text-center">
                🔍 Additional AI Features
              </h3>
              <Suspense fallback={<SectionLoading />}>
                <AIShowcaseSection />
              </Suspense>
            </div>
          </ScrollReveal>
        </div>

        {/* Privacy & Data Handling */}
        <ScrollReveal>
          <div className="mt-16 lg:mt-20">
            <GradientShine>
              <Card className="bg-lightning-gradient/10 border-lightning-yellow">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow text-xl sm:text-2xl text-center flex items-center justify-center gap-2">
                    <span>🔒</span>
                    Privacy & Data Handling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lightning-yellow font-semibold mb-3">Data Security</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Document Uploads:</strong> Processed temporarily, automatically deleted after session ends</li>
                        <li>• <strong>Conversations:</strong> AI interactions stored locally, not sent to external servers unnecessarily</li>
                        <li>• <strong>Privacy First:</strong> No sensitive data is permanently stored or shared</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lightning-yellow font-semibold mb-3">Demo Purpose</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Skill Demonstration:</strong> These tools primarily showcase AI development capabilities</li>
                        <li>• <strong>Safe Testing:</strong> Don't upload sensitive business information</li>
                        <li>• <strong>Full Functionality:</strong> While demos, all features work as production-ready applications</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-gray-400 italic">
                      <strong>Disclaimer:</strong> While fully functional, these tools are primarily for showcasing
                      AI development capabilities and should not be used for sensitive business data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </GradientShine>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}