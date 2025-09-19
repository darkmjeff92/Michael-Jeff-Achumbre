"use client"

import { memo } from "react"
import { motion } from "motion/react"

interface FloatingTechProps {
  intensity?: "low" | "medium" | "high"
  className?: string
}

interface TechIcon {
  icon: string
  size: number
  delay: number
  duration: number
  x: string
  y: string
}

function FloatingTechComponent({ intensity = "medium", className = "" }: FloatingTechProps) {
  // Configuration based on intensity
  const config = {
    low: { iconCount: 8, baseOpacity: 0.1, maxSize: 24 },
    medium: { iconCount: 12, baseOpacity: 0.15, maxSize: 32 },
    high: { iconCount: 16, baseOpacity: 0.2, maxSize: 40 }
  }[intensity]

  // Tech icons using Unicode symbols and simple shapes
  const techSymbols = [
    "⚡", "🔗", "⚙️", "💡", "🔮", "🚀", "⭐", "💫",
    "◆", "◇", "▲", "▼", "●", "◐", "◑", "◒"
  ]

  // Generate random tech icons
  const techIcons: TechIcon[] = Array.from({ length: config.iconCount }, (_, i) => ({
    icon: techSymbols[i % techSymbols.length],
    size: Math.random() * (config.maxSize - 16) + 16,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 25,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Floating tech icons */}
      {techIcons.map((tech, i) => (
        <motion.div
          key={i}
          className="absolute text-lightning-yellow/50"
          style={{
            left: tech.x,
            top: tech.y,
            fontSize: `${tech.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, config.baseOpacity, config.baseOpacity * 0.7, config.baseOpacity],
            scale: [0.8, 1.2, 0.9, 1.1],
            rotate: [0, 360],
            y: [-20, 20, -15, 10],
            x: [-10, 10, -5, 15]
          }}
          transition={{
            duration: tech.duration,
            delay: tech.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 1]
          }}
        >
          {tech.icon}
        </motion.div>
      ))}

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.01) 0%, transparent 70%)
            `
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute border border-lightning-yellow/20"
          style={{
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '0' : '4px'
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.3, 0.9],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

export const FloatingTech = memo(FloatingTechComponent)