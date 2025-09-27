'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface LivePreviewProps {
  url: string
  title: string
  isModal?: boolean
  hideActions?: boolean
}

export function LivePreview({ url, title, isModal = false, hideActions = false }: LivePreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
  }

  // Fallback timeout to ensure loading state clears
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 10000) // 10 second timeout

    return () => clearTimeout(timeout)
  }, [])

  const containerClasses = isModal
    ? "h-80 xs:h-96 sm:h-[500px] lg:h-[600px]"
    : "h-40 xs:h-48 sm:h-64 lg:h-80"

  return (
    <motion.div
      className="space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preview Container */}
      <motion.div
        whileHover={{ scale: isModal ? 1.02 : 1.05 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative"
      >
        <Card className={`
          ${containerClasses} relative overflow-hidden border-lightning-gray
          ${isHovered ? 'border-lightning-yellow/50' : ''}
          transition-colors duration-300
        `}>
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-lightning-dark flex items-center justify-center z-10">
              <div className="text-center space-y-3">
                <div className="relative">
                  <div className="w-8 h-8 border-2 border-lightning-gray border-t-lightning-yellow rounded-full animate-spin mx-auto"></div>
                </div>
                <p className="text-gray-400 text-sm">Loading live preview...</p>
              </div>
            </div>
          )}

          {/* Iframe */}
          <iframe
            src={url}
            title={`Live preview of ${title}`}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-lightning-gradient/5 pointer-events-none"
          />

          {/* Lightning Glow Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: isHovered
                ? '0 0 20px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)'
                : 'none'
            }}
          />
        </Card>
      </motion.div>

      {/* Action Buttons */}
      {!hideActions && (
        <div className="flex flex-col gap-2 xs:gap-3 sm:flex-row sm:justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90 transition-opacity"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>🚀</span>
                Visit Live Site
              </a>
            </Button>
          </motion.div>

          {!isModal && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow transition-colors"
              >
                <span className="mr-2">🔍</span>
                <span className="hidden xs:inline">View Details</span>
                <span className="xs:hidden">Details</span>
              </Button>
            </motion.div>
          )}
        </div>
      )}

      {/* Lightning Pulse Effect */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-px bg-lightning-gradient opacity-50"
      />
    </motion.div>
  )
}