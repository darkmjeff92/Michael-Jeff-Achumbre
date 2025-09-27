'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TechStackBadge } from '@/components/tech-stack-badge'
import { LivePreview } from '@/components/live-preview'
import { ProjectData } from '@/lib/project-data'

interface ProjectModalProps {
  project: ProjectData | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.4,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="fixed inset-4 sm:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <Card className="h-full bg-gradient-to-br from-lightning-dark to-lightning-gray border-lightning-yellow/50 shadow-2xl">
              {/* Header */}
              <CardHeader className="border-b border-lightning-gray/50 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-black text-lightning-gradient">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-lightning-gradient text-lightning-black">
                        {project.category.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-lightning-yellow/30 text-lightning-yellow">
                        {project.timeline}
                      </Badge>
                    </div>
                  </div>

                  {/* Close Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-gray-400 hover:text-lightning-yellow hover:bg-lightning-gray/30"
                    >
                      <span className="text-xl">✕</span>
                    </Button>
                  </motion.div>
                </div>
              </CardHeader>

              {/* Scrollable Content */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Live Preview */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-lightning-yellow mb-4 flex items-center gap-2">
                    <span>🚀</span> Live Project
                  </h3>
                  <LivePreview
                    url={project.liveUrl}
                    title={project.title}
                    isModal={true}
                  />
                </motion.section>

                {/* Project Overview */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* Challenge */}
                  <Card className="bg-lightning-gray/30 border-lightning-gray/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-lightning-orange flex items-center gap-2">
                        <span>🎯</span> Challenge
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {project.challenge}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Solution */}
                  <Card className="bg-lightning-gray/30 border-lightning-gray/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-lightning-yellow flex items-center gap-2">
                        <span>💡</span> Solution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {project.solution}
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                {/* Metrics */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-lightning-yellow mb-4 flex items-center gap-2">
                    <span>📊</span> Project Metrics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {project.metrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                      >
                        <Card className="bg-lightning-gradient/10 border-lightning-yellow/30 text-center p-4">
                          <div className="text-2xl mb-2">{metric.icon}</div>
                          <div className="font-bold text-lightning-yellow text-lg">
                            {metric.value}
                          </div>
                          <div className="text-sm font-medium text-gray-300 mb-1">
                            {metric.label}
                          </div>
                          <div className="text-xs text-gray-400">
                            {metric.description}
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Tech Stack */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-lightning-yellow mb-4 flex items-center gap-2">
                    <span>⚙️</span> Technology Stack
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(
                      project.techStack.reduce((acc, tech) => {
                        if (!acc[tech.category]) acc[tech.category] = []
                        acc[tech.category].push(tech)
                        return acc
                      }, {} as Record<string, typeof project.techStack>)
                    ).map(([category, techs]) => (
                      <Card key={category} className="bg-lightning-gray/30 border-lightning-gray/50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-semibold text-lightning-orange capitalize">
                            {category.replace('-', ' ')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {techs.map((tech, index) => (
                            <TechStackBadge
                              key={tech.name}
                              tech={tech}
                              delay={index * 0.05}
                            />
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.section>

                {/* Results */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-lightning-yellow mb-4 flex items-center gap-2">
                    <span>🎉</span> Results & Impact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                        className="flex items-start gap-3 p-3 bg-lightning-gray/20 rounded-lg border border-lightning-gray/30"
                      >
                        <div className="w-6 h-6 bg-lightning-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-lightning-black text-xs font-bold">✓</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {result}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-lightning-gray/30"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      asChild
                      className="w-full bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90 h-12"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <span>🚀</span>
                        Visit Live Site
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow transition-colors h-12 px-8"
                    >
                      Close Details
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}