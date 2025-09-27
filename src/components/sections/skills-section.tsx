"use client"

import { Suspense, lazy } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  HoverScale,
  InViewFloating,
  InViewStaggerContainer,
  StaggerItem,
  ScrollReveal
} from "@/components/animated-elements"

// Dynamic import for background animation
const FloatingTech = lazy(() => import("@/components/backgrounds/floating-tech").then(module => ({ default: module.FloatingTech })))

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🌐",
      technologies: "React 19, Next.js 15, TypeScript, Tailwind CSS v4",
      description: "Responsive web applications with modern design systems",
      experience: "Developed through focused coding sessions and real client projects",
      enhancement: "Strategic use of Cursor IDE, Claude Code CLI, and GitHub Copilot for accelerated development"
    },
    {
      title: "Backend & Full-Stack",
      icon: "🔧",
      technologies: "Node.js, API Routes, Database Integration, AI SDK v5",
      description: "Building complete applications from frontend to backend",
      experience: "gracekimkor.com - full-stack platform demonstrating modern development practices",
      enhancement: "AI-assisted architecture design, automated testing, and performance optimization"
    },
    {
      title: "AI Integration & Development",
      icon: "🤖",
      technologies: "AI SDK, OpenAI, Anthropic, RAG Systems, Document Processing",
      description: "Building AI-enhanced applications that solve real problems",
      experience: "Using AI not just in projects, but as development partners",
      enhancement: "Strategic integration of OpenAI, Anthropic, and custom AI workflows for enhanced productivity"
    },
    {
      title: "Design & User Experience",
      icon: "🎨",
      technologies: "Adobe Creative Suite, UI/UX design principles",
      description: "Clean, functional design with attention to user experience",
      experience: "Lightning-themed design system with modern aesthetics",
      enhancement: "Great software isn't just functional - it's intuitive and engaging"
    }
  ]

  return (
    <section id="skills" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-lightning-dark/30 overflow-hidden">
      {/* Floating Tech Background Animation - Updated */}
      <Suspense fallback={<div className="absolute inset-0 bg-lightning-dark/30" />}>
        <FloatingTech intensity="medium" />
      </Suspense>

      <div className="relative z-10 container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-8xl">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-impact text-lightning-gradient mb-4">
              Lightning-Powered Tech Stack
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
              Intensive development sessions and strategic learning approach translate into capabilities across modern
              development technologies, amplified by AI-powered tools for maximum efficiency and quality.
            </p>
          </div>
        </ScrollReveal>

        <InViewStaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {skillCategories.map((skill, index) => (
            <StaggerItem key={index}>
              <HoverScale scale={1.02}>
                <Card className="h-full bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/50 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <InViewFloating intensity={6} duration={3 + index * 0.5}>
                        <div className="text-3xl sm:text-4xl">{skill.icon}</div>
                      </InViewFloating>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">
                        {skill.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      {skill.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-lightning-yellow font-semibold mb-2">Core Technologies</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {skill.technologies}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lightning-yellow font-semibold mb-2">Experience</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {skill.experience}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lightning-yellow font-semibold mb-2">AI Enhancement</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {skill.enhancement}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}
        </InViewStaggerContainer>

      </div>
    </section>
  )
}