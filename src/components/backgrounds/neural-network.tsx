"use client"

import { useEffect, useRef, memo } from "react"
import { motion } from "motion/react"

interface NeuralNetworkProps {
  intensity?: "low" | "medium" | "high"
  className?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

function NeuralNetworkComponent({ intensity = "medium", className = "" }: NeuralNetworkProps) {
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

    // Configuration based on intensity
    const config = {
      low: { nodeCount: 30, maxConnections: 3, connectionDistance: 120, speed: 0.3 },
      medium: { nodeCount: 50, maxConnections: 4, connectionDistance: 150, speed: 0.5 },
      high: { nodeCount: 80, maxConnections: 5, connectionDistance: 180, speed: 0.8 }
    }[intensity]

    // Create nodes
    const nodes: Node[] = []
    for (let i = 0; i < config.nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        connections: []
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })

      // Find connections
      nodes.forEach((node, i) => {
        node.connections = []
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            )
            if (distance < config.connectionDistance && node.connections.length < config.maxConnections) {
              node.connections.push(j)
            }
          }
        })
      })

      // Draw connections
      ctx.strokeStyle = `rgba(255, 215, 0, 0.2)` // Lightning yellow
      ctx.lineWidth = 1
      nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const connectedNode = nodes[connectionIndex]
          const distance = Math.sqrt(
            Math.pow(node.x - connectedNode.x, 2) + Math.pow(node.y - connectedNode.y, 2)
          )

          // Fade connection based on distance
          const opacity = (1 - distance / config.connectionDistance) * 0.3
          ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(connectedNode.x, connectedNode.y)
          ctx.stroke()

          // Add data flow particles
          if (Math.random() < 0.1) {
            const progress = (Math.sin(time * 2 + i) + 1) / 2
            const particleX = node.x + (connectedNode.x - node.x) * progress
            const particleY = node.y + (connectedNode.y - node.y) * progress

            ctx.fillStyle = `rgba(255, 107, 53, ${opacity * 2})` // Lightning orange
            ctx.beginPath()
            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time + i * 0.5) * 0.3 + 0.7
        const radius = 3 + pulse * 2

        // Node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2)
        gradient.addColorStop(0, `rgba(255, 215, 0, ${0.6 * pulse})`)
        gradient.addColorStop(1, `rgba(255, 215, 0, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Node core
        ctx.fillStyle = `rgba(255, 215, 0, ${0.8 * pulse})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

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

      {/* Fallback animated background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-lightning-yellow rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}

export const NeuralNetwork = memo(NeuralNetworkComponent)