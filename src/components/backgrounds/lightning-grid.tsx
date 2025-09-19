"use client"

import { useEffect, useRef, memo } from "react"
import { motion } from "motion/react"

interface LightningGridProps {
  intensity?: "low" | "medium" | "high"
  className?: string
}

function LightningGridComponent({ intensity = "medium", className = "" }: LightningGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Animation configuration based on intensity
    const config = {
      low: { gridSize: 120, opacity: 0.03, pulseSpeed: 0.8 },
      medium: { gridSize: 80, opacity: 0.05, pulseSpeed: 1.2 },
      high: { gridSize: 60, opacity: 0.08, pulseSpeed: 1.8 }
    }[intensity]

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01 * config.pulseSpeed

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set lightning colors
      const primaryColor = `rgba(255, 215, 0, ${config.opacity})` // Lightning yellow
      const secondaryColor = `rgba(255, 107, 53, ${config.opacity * 0.7})` // Lightning orange

      // Draw grid
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < canvas.width; x += config.gridSize) {
        const pulse = Math.sin(time + x * 0.01) * 0.3 + 0.7
        ctx.globalAlpha = pulse * config.opacity
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += config.gridSize) {
        const pulse = Math.cos(time + y * 0.01) * 0.3 + 0.7
        ctx.globalAlpha = pulse * config.opacity
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Occasional lightning arcs
      if (Math.random() < 0.002) {
        ctx.strokeStyle = secondaryColor
        ctx.lineWidth = 2
        ctx.globalAlpha = config.opacity * 2

        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        const endX = startX + (Math.random() - 0.5) * 200
        const endY = startY + (Math.random() - 0.5) * 200

        ctx.beginPath()
        ctx.moveTo(startX, startY)

        // Create zigzag lightning effect
        const steps = 5
        for (let i = 1; i <= steps; i++) {
          const progress = i / steps
          const x = startX + (endX - startX) * progress + (Math.random() - 0.5) * 30
          const y = startY + (endY - startY) * progress + (Math.random() - 0.5) * 30
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [intensity])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Fallback for devices that don't support canvas */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px"
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  )
}

export const LightningGrid = memo(LightningGridComponent)