'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  variant?: 'full' | 'mark' | 'text'
  theme?: 'default' | 'white' | 'black'
  animated?: boolean
  clickable?: boolean
  onClick?: () => void
  className?: string
  width?: number
  height?: number
}

const sizeMap = {
  sm: { width: 100, height: 32 },
  md: { width: 180, height: 60 },
  lg: { width: 240, height: 80 },
  xl: { width: 360, height: 120 },
  custom: { width: 200, height: 67 } // Default fallback
}

export function Logo({
  size = 'md',
  variant = 'full',
  theme = 'default',
  animated = false,
  clickable = false,
  onClick,
  className,
  width,
  height
}: LogoProps) {
  // Use custom dimensions if provided, otherwise use size map
  const dimensions = width && height
    ? { width, height }
    : sizeMap[size]

  // Logo source based on variant and theme
  const getLogoSrc = () => {
    if (theme === 'white') {
      return '/logos/logo-white.png'
    }
    if (variant === 'full') {
      return '/logos/my-logo.png'  // Use the original logo for now
    }
    // Fallback to original
    return '/logos/my-logo.png'
  }

  const logoContent = (
    <div className={cn(
      'flex items-center',
      clickable && 'cursor-pointer hover:opacity-80 transition-opacity duration-200',
      className
    )}>
      <Image
        src={getLogoSrc()}
        alt="Michael Jeff Achumbre - AI-First Developer Logo"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        priority={size === 'lg' || size === 'xl'} // Prioritize larger logos
        quality={95}
      />
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1]
        }}
        whileHover={clickable ? { scale: 1.05 } : undefined}
        onClick={onClick}
      >
        {logoContent}
      </motion.div>
    )
  }

  return (
    <div onClick={onClick}>
      {logoContent}
    </div>
  )
}

// Convenience components for common use cases
export function NavigationLogo({ className, onClick }: { className?: string, onClick?: () => void }) {
  return (
    <Logo
      size="sm"
      variant="full"
      clickable={true}
      onClick={onClick}
      className={cn("flex-shrink-0", className)}
    />
  )
}

export function HeroLogo({ className }: { className?: string }) {
  return (
    <Logo
      size="xl"
      variant="full"
      animated={true}
      className={className}
    />
  )
}

export function FooterLogo({ className }: { className?: string }) {
  return (
    <Logo
      size="sm"
      variant="full"
      className={className}
    />
  )
}