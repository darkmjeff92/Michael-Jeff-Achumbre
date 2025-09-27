'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { TechStackItem } from '@/lib/project-data'

interface TechStackBadgeProps {
  tech: TechStackItem
  delay?: number
}

const categoryColors = {
  frontend: 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:border-blue-400',
  backend: 'bg-green-500/10 text-green-400 border-green-500/30 hover:border-green-400',
  database: 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:border-purple-400',
  deployment: 'bg-orange-500/10 text-orange-400 border-orange-500/30 hover:border-orange-400',
  ai: 'bg-lightning-yellow/10 text-lightning-yellow border-lightning-yellow/30 hover:border-lightning-yellow',
  styling: 'bg-pink-500/10 text-pink-400 border-pink-500/30 hover:border-pink-400'
}

export function TechStackBadge({ tech, delay = 0 }: TechStackBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.23, 1, 0.32, 1]
      }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Badge
          variant="outline"
          className={`
            ${categoryColors[tech.category]}
            relative cursor-pointer transition-all duration-300
            hover:shadow-lg hover:shadow-current/20
            flex items-center gap-2 px-3 py-1
          `}
        >
          <span className="text-sm">{tech.icon}</span>
          <span className="font-medium">{tech.name}</span>
        </Badge>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{
              duration: 0.2,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-lightning-dark border border-lightning-gray rounded-lg p-3 shadow-xl min-w-48 max-w-64">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{tech.icon}</span>
                <span className="font-semibold text-lightning-yellow text-sm">
                  {tech.name}
                </span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                {tech.description}
              </p>

              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-lightning-gray"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}