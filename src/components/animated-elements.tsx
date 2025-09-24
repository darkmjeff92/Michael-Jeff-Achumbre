'use client'

import { motion, useReducedMotion } from "motion/react"
import { ReactNode, useState, useEffect } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.6, className = "" }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // During SSR or if reduced motion is preferred, render without animation
  if (!isClient || shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 1.11, 0.81, 0.99] // Linear-inspired easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SlideInProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
}

export function SlideIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = ""
}: SlideInProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const directionOffset = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 }
  }

  // During SSR or if reduced motion is preferred, render without animation
  if (!isClient || shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction]
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.23, 1, 0.32, 1] // Framer-inspired impressive easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface LightningPulseProps {
  children: ReactNode
  className?: string
}

export function LightningPulse({ children, className = "" }: LightningPulseProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : {
        boxShadow: [
          "0 0 0px rgba(255, 215, 0, 0.3)",
          "0 0 20px rgba(255, 215, 0, 0.8)",
          "0 0 0px rgba(255, 215, 0, 0.3)",
        ]
      }}
      transition={shouldReduceMotion ? {} : {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface HoverScaleProps {
  children: ReactNode
  scale?: number
  duration?: number
  className?: string
}

export function HoverScale({
  children,
  scale = 1.02,
  duration = 0.2,
  className = ""
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        transition: { duration, ease: [0.23, 1, 0.32, 1] }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FloatingProps {
  children: ReactNode
  intensity?: number
  duration?: number
  className?: string
}

export function Floating({
  children,
  intensity = 10,
  duration = 4,
  className = ""
}: FloatingProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : {
        y: [-intensity/2, intensity/2, -intensity/2],
        rotate: [-0.5, 0.5, -0.5]
      }}
      transition={shouldReduceMotion ? {} : {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = ""
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.21, 1.11, 0.81, 0.99]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface GradientShineProps {
  children: ReactNode
  className?: string
}

export function GradientShine({ children, className = "" }: GradientShineProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        variants={{
          initial: { x: "-100%" },
          hover: { x: "100%" }
        }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1]
        }}
      />
      {children}
    </motion.div>
  )
}

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export function Typewriter({
  text,
  delay = 0,
  speed = 50,
  className = ""
}: TypewriterProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Skip animation if user prefers reduced motion or during SSR
  if (shouldReduceMotion || !isClient) {
    return <div className={className}>{text}</div>
  }

  const words = text.split(' ')

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: speed / 1000
          }
        }
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          className="inline-block"
          style={{ marginRight: index < words.length - 1 ? '0.25rem' : '0' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface ScrollRevealProps {
  children: ReactNode
  threshold?: number
  className?: string
}

export function ScrollReveal({
  children,
  threshold = 0.1,
  className = ""
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={shouldReduceMotion ? { duration: 0 } : {
        duration: 0.8,
        ease: [0.21, 1.11, 0.81, 0.99]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Viewport-aware versions of animation components
interface InViewFadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export function InViewFadeIn({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = ""
}: InViewFadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={shouldReduceMotion ? { duration: 0 } : {
        duration: duration,
        delay: delay,
        ease: [0.21, 1.11, 0.81, 0.99]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface InViewSlideInProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export function InViewSlideIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  className = ""
}: InViewSlideInProps) {
  const shouldReduceMotion = useReducedMotion()

  const directionOffset = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 }
  }

  return (
    <motion.div
      initial={shouldReduceMotion ?
        { opacity: 1, x: 0, y: 0 } :
        { opacity: 0, ...directionOffset[direction] }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={shouldReduceMotion ? { duration: 0 } : {
        duration: duration,
        delay: delay,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface InViewStaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  threshold?: number
  className?: string
}

export function InViewStaggerContainer({
  children,
  staggerDelay = 0.1,
  threshold = 0.1,
  className = ""
}: InViewStaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface InViewFloatingProps {
  children: ReactNode
  intensity?: number
  duration?: number
  threshold?: number
  className?: string
}

export function InViewFloating({
  children,
  intensity = 10,
  duration = 4,
  threshold = 0.1,
  className = ""
}: InViewFloatingProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : {
        y: [-intensity/2, intensity/2, -intensity/2],
        rotate: [-0.5, 0.5, -0.5]
      }}
      whileInView={shouldReduceMotion ? {} : {
        y: [-intensity/2, intensity/2, -intensity/2],
        rotate: [-0.5, 0.5, -0.5]
      }}
      viewport={{ amount: threshold }}
      transition={shouldReduceMotion ? {} : {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface InViewLightningPulseProps {
  children: ReactNode
  threshold?: number
  className?: string
}

export function InViewLightningPulse({
  children,
  threshold = 0.1,
  className = ""
}: InViewLightningPulseProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      whileInView={shouldReduceMotion ? {} : {
        boxShadow: [
          "0 0 0px rgba(255, 215, 0, 0.3)",
          "0 0 20px rgba(255, 215, 0, 0.8)",
          "0 0 0px rgba(255, 215, 0, 0.3)",
        ]
      }}
      viewport={{ amount: threshold }}
      transition={shouldReduceMotion ? {} : {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface CircularLightningPulseProps {
  children: ReactNode
  intensity?: "low" | "medium" | "high"
  threshold?: number
  className?: string
}

export function CircularLightningPulse({
  children,
  intensity = "medium",
  threshold = 0.1,
  className = ""
}: CircularLightningPulseProps) {
  const shouldReduceMotion = useReducedMotion()

  // Lightning-themed glow configurations with professional timing
  const glowConfig = {
    low: {
      primaryGlow: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))",
      secondaryGlow: "drop-shadow(0 0 4px rgba(255, 107, 53, 0.2))",
      peakGlow: "drop-shadow(0 0 16px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 8px rgba(255, 107, 53, 0.4))",
      duration: 5 // Calm breathing rhythm
    },
    medium: {
      primaryGlow: "drop-shadow(0 0 12px rgba(255, 215, 0, 0.6))",
      secondaryGlow: "drop-shadow(0 0 6px rgba(255, 107, 53, 0.3))",
      peakGlow: "drop-shadow(0 0 24px rgba(255, 215, 0, 1)) drop-shadow(0 0 12px rgba(255, 107, 53, 0.6))",
      duration: 4 // Professional presence
    },
    high: {
      primaryGlow: "drop-shadow(0 0 16px rgba(255, 215, 0, 0.8))",
      secondaryGlow: "drop-shadow(0 0 8px rgba(255, 107, 53, 0.4))",
      peakGlow: "drop-shadow(0 0 32px rgba(255, 215, 0, 1)) drop-shadow(0 0 16px rgba(255, 107, 53, 0.8)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
      duration: 3 // Active but not frantic
    }
  }

  const config = glowConfig[intensity]

  return (
    <motion.div
      className={className}
      style={{
        // Ensure the container doesn't interfere with circular shape
        display: "inline-block"
      }}
      whileInView={shouldReduceMotion ? {} : {
        filter: [
          config.primaryGlow,
          config.peakGlow,
          config.secondaryGlow,
          config.primaryGlow
        ]
      }}
      viewport={{ amount: threshold }}
      transition={shouldReduceMotion ? {} : {
        duration: config.duration,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1], // Natural breathing easing (inhale, exhale)
        times: [0, 0.4, 0.6, 1] // Natural breathing rhythm (40% inhale, 60% exhale)
      }}
    >
      {children}
    </motion.div>
  )
}

interface CircularLightningPulseAlwaysOnProps {
  children: ReactNode
  intensity?: "low" | "medium" | "high"
  className?: string
}

export function CircularLightningPulseAlwaysOn({
  children,
  intensity = "medium",
  className = ""
}: CircularLightningPulseAlwaysOnProps) {
  const shouldReduceMotion = useReducedMotion()

  // Lightning-themed glow configurations with professional timing
  const glowConfig = {
    low: {
      primaryGlow: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))",
      secondaryGlow: "drop-shadow(0 0 4px rgba(255, 107, 53, 0.2))",
      peakGlow: "drop-shadow(0 0 16px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 8px rgba(255, 107, 53, 0.4))",
      duration: 5 // Calm breathing rhythm
    },
    medium: {
      primaryGlow: "drop-shadow(0 0 12px rgba(255, 215, 0, 0.6))",
      secondaryGlow: "drop-shadow(0 0 6px rgba(255, 107, 53, 0.3))",
      peakGlow: "drop-shadow(0 0 24px rgba(255, 215, 0, 1)) drop-shadow(0 0 12px rgba(255, 107, 53, 0.6))",
      duration: 4 // Professional presence
    },
    high: {
      primaryGlow: "drop-shadow(0 0 16px rgba(255, 215, 0, 0.8))",
      secondaryGlow: "drop-shadow(0 0 8px rgba(255, 107, 53, 0.4))",
      peakGlow: "drop-shadow(0 0 32px rgba(255, 215, 0, 1)) drop-shadow(0 0 16px rgba(255, 107, 53, 0.8)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
      duration: 3 // Active but not frantic
    }
  }

  const config = glowConfig[intensity]

  return (
    <motion.div
      className={className}
      style={{
        // Ensure the container doesn't interfere with circular shape
        display: "inline-block"
      }}
      animate={shouldReduceMotion ? {} : {
        filter: [
          config.primaryGlow,
          config.peakGlow,
          config.secondaryGlow,
          config.primaryGlow
        ]
      }}
      transition={shouldReduceMotion ? {} : {
        duration: config.duration,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1], // Natural breathing easing (inhale, exhale)
        times: [0, 0.4, 0.6, 1] // Natural breathing rhythm (40% inhale, 60% exhale)
      }}
    >
      {children}
    </motion.div>
  )
}

interface LightningBoltProps {
  size?: number
  intensity?: "low" | "medium" | "high"
  className?: string
  variant?: "strike" | "glow" | "idle"
}

export function LightningBolt({
  size = 24,
  intensity = "medium",
  className = "",
  variant = "strike"
}: LightningBoltProps) {
  const shouldReduceMotion = useReducedMotion()

  // Lightning theme colors based on intensity
  const colorConfig = {
    low: {
      stroke: "#FFD700", // Lightning yellow
      strokeWidth: 0.8,
      glow: "drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))"
    },
    medium: {
      stroke: "#FFD700", // Lightning yellow
      strokeWidth: 1,
      glow: "drop-shadow(0 0 6px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 3px rgba(255, 107, 53, 0.4))"
    },
    high: {
      stroke: "#FFFFFF", // Electric white
      strokeWidth: 1.2,
      glow: "drop-shadow(0 0 8px rgba(255, 255, 255, 1)) drop-shadow(0 0 4px rgba(255, 215, 0, 1)) drop-shadow(0 0 2px rgba(255, 107, 53, 0.6))"
    }
  }

  // Animation variants for different behaviors
  const lightningVariants = {
    idle: {
      pathLength: 0,
      opacity: 0,
      filter: "none"
    },
    strike: {
      pathLength: 1,
      opacity: 1,
      filter: colorConfig[intensity].glow
    },
    glow: {
      pathLength: 1,
      opacity: [0.6, 1, 0.6],
      filter: colorConfig[intensity].glow
    }
  }

  // Transition configuration
  const transitionConfig = {
    idle: {},
    strike: {
      pathLength: { duration: 0.8, ease: "easeOut" },
      opacity: { duration: 0.2 },
      filter: { duration: 0.3 }
    },
    glow: {
      pathLength: { duration: 0.5, ease: "easeOut" },
      opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      filter: { duration: 0.3 }
    }
  }

  const config = colorConfig[intensity]

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className="pointer-events-none"
        style={{ filter: "none" }}
        role="img"
        aria-label="Lightning animation effect"
        aria-hidden={variant === "idle" ? "true" : "false"}
      >
        <title>Lightning bolt animation</title>
        {/* Bootstrap Icons lightning bolt path */}
        <motion.path
          d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z"
          fill="none"
          stroke={config.stroke}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={shouldReduceMotion ? {} : lightningVariants}
          animate={shouldReduceMotion ? "idle" : variant}
          transition={shouldReduceMotion ? {} : transitionConfig[variant]}
        />
      </motion.svg>
    </div>
  )
}

interface CircularLightningGlowProps {
  children: ReactNode
  intensity?: "low" | "medium" | "high"
  className?: string
}

export function CircularLightningGlow({
  children,
  intensity = "medium",
  className = ""
}: CircularLightningGlowProps) {
  const shouldReduceMotion = useReducedMotion()

  // Professional breathing rhythm base animation
  const baseConfig = {
    low: {
      primaryGlow: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))",
      peakGlow: "drop-shadow(0 0 16px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 8px rgba(255, 107, 53, 0.4))",
      duration: 5
    },
    medium: {
      primaryGlow: "drop-shadow(0 0 12px rgba(255, 215, 0, 0.6))",
      peakGlow: "drop-shadow(0 0 24px rgba(255, 215, 0, 1)) drop-shadow(0 0 12px rgba(255, 107, 53, 0.6))",
      duration: 4
    },
    high: {
      primaryGlow: "drop-shadow(0 0 16px rgba(255, 215, 0, 0.8))",
      peakGlow: "drop-shadow(0 0 32px rgba(255, 215, 0, 1)) drop-shadow(0 0 16px rgba(255, 107, 53, 0.8))",
      duration: 3
    }
  }

  const config = baseConfig[intensity]

  return (
    <div className={`relative ${className}`} style={{ display: "inline-block" }}>
      {/* Base breathing glow */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          filter: [
            config.primaryGlow,
            config.peakGlow,
            config.primaryGlow
          ]
        }}
        transition={shouldReduceMotion ? {} : {
          duration: config.duration,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1], // Natural breathing
          times: [0, 0.4, 1] // Inhale peak, exhale
        }}
        style={{ display: "inline-block" }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface LightningElectricGlowProps {
  children: ReactNode
  intensity?: "low" | "medium" | "high"
  className?: string
  strikeFrequency?: number // seconds between strikes
}

export function LightningElectricGlow({
  children,
  intensity = "medium",
  className = "",
  strikeFrequency = 4
}: LightningElectricGlowProps) {
  const shouldReduceMotion = useReducedMotion()
  const [lightningVariant, setLightningVariant] = useState<"idle" | "strike" | "glow">("idle")

  useEffect(() => {
    if (shouldReduceMotion) return

    // Strike frequency configuration based on intensity
    const frequencyConfig = {
      low: strikeFrequency + 2,    // Slower strikes
      medium: strikeFrequency,     // Default frequency
      high: strikeFrequency - 1    // Faster strikes
    }

    const actualFrequency = frequencyConfig[intensity]
    const breathingDuration = intensity === "low" ? 5000 : intensity === "medium" ? 4000 : 3000

    // Calculate timing to trigger lightning at breathing peaks (40% of breathing cycle)
    const breathingPeakTiming = breathingDuration * 0.4

    let isActive = true
    const timeouts: NodeJS.Timeout[] = []

    const triggerLightning = () => {
      if (!isActive) return

      // Random delay before next strike (±30% variation for natural feel)
      const baseDelay = actualFrequency * 1000
      const randomVariation = baseDelay * 0.3 * (Math.random() - 0.5) // ±15%
      const randomDelay = baseDelay + randomVariation

      const delayTimeout = setTimeout(() => {
        if (!isActive) return

        // Wait for next breathing peak to trigger lightning
        const nextBreathingPeak = breathingPeakTiming - (Date.now() % breathingDuration)
        const peakDelay = nextBreathingPeak > 0 ? nextBreathingPeak : breathingPeakTiming

        const peakTimeout = setTimeout(() => {
          if (!isActive) return
          setLightningVariant("strike")

          // Reset to idle after strike duration
          const resetTimeout = setTimeout(() => {
            if (!isActive) return
            setLightningVariant("idle")
            triggerLightning() // Schedule next strike
          }, 800) // Strike duration
          timeouts.push(resetTimeout)
        }, peakDelay)
        timeouts.push(peakTimeout)
      }, randomDelay)
      timeouts.push(delayTimeout)
    }

    // Start the lightning cycle after a short delay
    const initialDelay = Math.random() * 1000 + 500 // Random initial delay 0.5-1.5s
    const initialTimeout = setTimeout(triggerLightning, initialDelay)
    timeouts.push(initialTimeout)

    // Cleanup function
    return () => {
      isActive = false
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [intensity, shouldReduceMotion, strikeFrequency])

  return (
    <div className={`relative ${className}`} style={{ display: "inline-block" }}>
      {/* Base circular breathing glow */}
      <CircularLightningGlow intensity={intensity}>
        {children}
      </CircularLightningGlow>

      {/* Lightning bolt overlay */}
      <LightningBolt
        size={32}
        intensity={intensity}
        variant={lightningVariant}
        className="z-10"
      />
    </div>
  )
}
