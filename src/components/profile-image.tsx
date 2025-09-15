'use client'

import Image from 'next/image'
import { Floating } from '@/components/animated-elements'

interface ProfileImageProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ProfileImage({ className = "", size = 'lg' }: ProfileImageProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-40 h-40',
    lg: 'w-48 h-64'
  }

  const imageSizes = {
    sm: '128px',
    md: '160px',
    lg: '192px'
  }

  return (
    <Floating intensity={8} duration={4}>
      <div className={`relative ${className}`}>
        <div className={`relative ${sizeClasses[size]} mx-auto`}>
          {/* Dynamic background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-lightning-yellow/10 via-lightning-orange/5 to-transparent rounded-lg"></div>

          {/* Lightning glow backdrop */}
          <div className="absolute inset-2 bg-lightning-gradient opacity-5 blur-md rounded-lg animate-lightning-pulse"></div>

          {/* Image container - no circular cropping needed for transparent PNG */}
          <div className="relative w-full h-full group">
            <Image
              src="/profile-picture.png"
              alt="Michael Jeff Achumbre, AI-First Developer & Automation Builder"
              fill
              className="object-contain object-center transition-all duration-300 group-hover:scale-105"
              sizes={`(max-width: 768px) ${imageSizes[size]}, ${imageSizes[size]}`}
              priority
            />
          </div>

          {/* Subtle interactive glow */}
          <div className="absolute inset-0 bg-lightning-yellow/0 hover:bg-lightning-yellow/5 rounded-lg transition-colors duration-500"></div>
        </div>
      </div>
    </Floating>
  )
}