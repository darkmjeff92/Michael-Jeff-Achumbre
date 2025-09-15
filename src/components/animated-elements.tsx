'use client'

import { motion, useReducedMotion } from "motion/react"
import { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.6, className = "" }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
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
  const directionOffset = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 }
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, x: 0, y: 0 } : {
        opacity: 0,
        ...directionOffset[direction]
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
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

  // Skip animation if user prefers reduced motion
  if (shouldReduceMotion) {
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
          className="inline-block mr-1"
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