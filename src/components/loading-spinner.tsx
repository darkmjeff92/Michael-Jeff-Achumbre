'use client'

import { motion } from "motion/react"

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`border-2 border-lightning-gray border-t-lightning-yellow rounded-full ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        aria-label="Loading"
        role="status"
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface PageLoadingProps {
  message?: string
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div className="min-h-screen bg-lightning-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-lightning-white text-lg">{message}</p>
      </div>
    </div>
  )
}

interface SectionLoadingProps {
  message?: string
  className?: string
}

export function SectionLoading({ message = "Loading section...", className = "" }: SectionLoadingProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center space-y-3">
        <LoadingSpinner size="md" />
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  )
}