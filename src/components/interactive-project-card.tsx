'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TechStackBadge } from '@/components/tech-stack-badge'
import { LivePreview } from '@/components/live-preview'
import { ProjectData } from '@/lib/project-data'

interface InteractiveProjectCardProps {
  project: ProjectData
  featured?: boolean
  onExpand?: (project: ProjectData) => void
}

export function InteractiveProjectCard({
  project,
  featured = false,
  onExpand
}: InteractiveProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showTechStack, setShowTechStack] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleExpand = () => {
    onExpand?.(project)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={`
        relative group cursor-pointer
        ${featured ? 'col-span-full' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleExpand}
    >
      {/* Lightning Glow Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-1 bg-lightning-gradient opacity-20 rounded-xl blur-sm"
      />

      <Card className={`
        relative h-full transition-all duration-500 ease-out
        bg-gradient-to-br from-lightning-dark to-lightning-gray
        border-lightning-gray hover:border-lightning-yellow/50
        ${isHovered ? 'shadow-xl shadow-lightning-yellow/20' : 'shadow-lg'}
        ${featured ? 'min-h-96 lg:min-h-[500px]' : 'min-h-80'}
      `}>
        <CardHeader className="space-y-3 xs:space-y-4 p-4 xs:p-6">
          {/* Project Title & Category */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <CardTitle className={`
                  font-black text-lightning-gradient
                  ${featured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'}
                `}>
                  {project.title}
                </CardTitle>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Badge variant="outline" className="bg-lightning-yellow/10 text-lightning-yellow border-lightning-yellow/30">
                  {project.category.replace('-', ' ').toUpperCase()}
                </Badge>
              </motion.div>
            </div>

            {/* Featured Badge */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Badge className="bg-lightning-gradient text-lightning-black font-semibold">
                  ⭐ Featured Project
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className={`
              text-gray-300 leading-relaxed
              ${featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}
            `}
          >
            {project.description}
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-4 xs:space-y-6 p-4 xs:p-6">
          {/* Live Preview */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <LivePreview
                url={project.liveUrl}
                title={project.title}
                hideActions={true}
              />
            </motion.div>
          )}


          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className={`
              grid gap-3 xs:gap-4
              ${featured ? 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 xs:grid-cols-2'}
            `}
          >
            {project.metrics.slice(0, featured ? 4 : 2).map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                className="text-center p-2 xs:p-3 rounded-lg bg-lightning-gray/30 border border-lightning-gray/50"
              >
                <div className="text-xl mb-1">{metric.icon}</div>
                <div className="font-bold text-lightning-yellow text-sm sm:text-base">
                  {metric.value}
                </div>
                <div className="text-xs text-gray-400">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="space-y-3"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowTechStack(!showTechStack)
              }}
              className="w-full justify-between text-lightning-yellow hover:text-lightning-orange hover:bg-lightning-gray/30"
            >
              <span className="flex items-center gap-2">
                <span>⚙️</span>
                Tech Stack ({project.techStack.length})
              </span>
              <motion.span
                animate={{ rotate: showTechStack ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.span>
            </Button>

            {/* Tech Stack Overlay */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showTechStack ? 'auto' : 0,
                opacity: showTechStack ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-3 bg-lightning-dark/50 rounded-lg border border-lightning-gray/30">
                {project.techStack.map((tech, index) => (
                  <TechStackBadge
                    key={tech.name}
                    tech={tech}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="flex flex-col gap-3 xs:gap-3 sm:flex-row xs:pt-4 pt-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                asChild
                className="w-full bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
                onClick={(e) => e.stopPropagation()}
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
                className="border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow transition-colors"
              >
                <span className="mr-2">🔍</span>
                <span className="hidden xs:inline">
                  {featured ? 'Explore Development Process' : 'See How It Was Built'}
                </span>
                <span className="xs:hidden">
                  {featured ? 'Explore Process' : 'View Details'}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>

        {/* Hover Lightning Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: `
              radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 100% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
            `
          }}
        />
      </Card>
    </motion.div>
  )
}