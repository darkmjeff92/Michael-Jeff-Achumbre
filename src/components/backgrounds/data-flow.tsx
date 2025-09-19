"use client"

import { memo } from "react"
import { motion } from "motion/react"

interface DataFlowProps {
  intensity?: "low" | "medium" | "high"
  className?: string
}

interface DataStream {
  id: number
  direction: "horizontal" | "vertical" | "diagonal"
  delay: number
  duration: number
  opacity: number
  thickness: number
}

function DataFlowComponent({ intensity = "medium", className = "" }: DataFlowProps) {
  // Configuration based on intensity
  const config = {
    low: { streamCount: 6, baseOpacity: 0.08, maxThickness: 2 },
    medium: { streamCount: 10, baseOpacity: 0.12, maxThickness: 3 },
    high: { streamCount: 14, baseOpacity: 0.16, maxThickness: 4 }
  }[intensity]

  // Generate data streams
  const dataStreams: DataStream[] = Array.from({ length: config.streamCount }, (_, i) => ({
    id: i,
    direction: ["horizontal", "vertical", "diagonal"][Math.floor(Math.random() * 3)] as any,
    delay: Math.random() * 15,
    duration: 8 + Math.random() * 12,
    opacity: config.baseOpacity + Math.random() * config.baseOpacity,
    thickness: 1 + Math.random() * config.maxThickness
  }))

  // AI-themed particles
  const aiParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 8
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Data flow lines */}
      {dataStreams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute"
          style={{
            background: stream.direction === "horizontal"
              ? `linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, ${stream.opacity}) 20%, rgba(255, 215, 0, ${stream.opacity * 0.8}) 50%, rgba(255, 107, 53, ${stream.opacity * 0.6}) 80%, transparent 100%)`
              : stream.direction === "vertical"
              ? `linear-gradient(180deg, transparent 0%, rgba(255, 215, 0, ${stream.opacity}) 20%, rgba(255, 215, 0, ${stream.opacity * 0.8}) 50%, rgba(255, 107, 53, ${stream.opacity * 0.6}) 80%, transparent 100%)`
              : `linear-gradient(135deg, transparent 0%, rgba(255, 215, 0, ${stream.opacity}) 20%, rgba(255, 215, 0, ${stream.opacity * 0.8}) 50%, rgba(255, 107, 53, ${stream.opacity * 0.6}) 80%, transparent 100%)`,
            height: stream.direction === "horizontal" ? `${stream.thickness}px` : "100%",
            width: stream.direction === "vertical" ? `${stream.thickness}px` : "100%",
            top: stream.direction === "horizontal" ? `${Math.random() * 100}%` : "0",
            left: stream.direction === "vertical" ? `${Math.random() * 100}%` : "0",
          }}
          initial={{
            opacity: 0,
            scaleX: stream.direction === "horizontal" ? 0 : 1,
            scaleY: stream.direction === "vertical" ? 0 : 1
          }}
          animate={{
            opacity: [0, 1, 0.7, 0],
            scaleX: stream.direction === "horizontal" ? [0, 1, 1, 0] : 1,
            scaleY: stream.direction === "vertical" ? [0, 1, 1, 0] : 1
          }}
          transition={{
            duration: stream.duration,
            delay: stream.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1]
          }}
        />
      ))}

      {/* AI Brain-like connection nodes */}
      {aiParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 107, 53, 0.4) 50%, transparent 100%)"
          }}
          animate={{
            scale: [0.5, 1.5, 1, 1.2, 0.8],
            opacity: [0.3, 0.8, 0.6, 0.9, 0.4],
            boxShadow: [
              "0 0 0px rgba(255, 215, 0, 0.3)",
              "0 0 20px rgba(255, 215, 0, 0.6)",
              "0 0 10px rgba(255, 215, 0, 0.4)",
              "0 0 25px rgba(255, 215, 0, 0.7)",
              "0 0 5px rgba(255, 215, 0, 0.3)"
            ]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Subtle pulse overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 107, 53, 0.015) 0%, transparent 50%)
          `
        }}
        animate={{
          opacity: [0.5, 1, 0.7, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Data packet indicators */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`packet-${i}`}
          className="absolute w-1 h-1 bg-lightning-yellow/60 rounded-full"
          style={{
            left: `${10 + i * 25}%`,
            top: `${20 + Math.random() * 60}%`
          }}
          animate={{
            x: [0, 100, 200, 300, 0],
            y: [0, -20, 20, -10, 0],
            opacity: [0, 1, 1, 1, 0],
            scale: [0.5, 1, 0.8, 1.2, 0.5]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export const DataFlow = memo(DataFlowComponent)