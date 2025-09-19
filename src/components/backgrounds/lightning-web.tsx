"use client"

import { useEffect, useRef, useState, memo } from "react"
import { motion } from "motion/react"

interface LightningWebProps {
  intensity?: "low" | "medium" | "high"
  className?: string
  interactive?: boolean
}

interface WebNode {
  x: number
  y: number
  label: string
  active: boolean
  connections: number[]
}

function LightningWebComponent({ intensity = "medium", className = "", interactive = false }: LightningWebProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

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
      low: { maxConnections: 2, pulseSpeed: 0.8, lightningChance: 0.001 },
      medium: { maxConnections: 3, pulseSpeed: 1.2, lightningChance: 0.002 },
      high: { maxConnections: 4, pulseSpeed: 1.8, lightningChance: 0.003 }
    }[intensity]

    // Create skill nodes in a web formation
    const skillNodes: WebNode[] = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, label: "React", active: false, connections: [1, 2, 7] },
      { x: canvas.width * 0.4, y: canvas.height * 0.2, label: "Next.js", active: false, connections: [0, 2, 3] },
      { x: canvas.width * 0.6, y: canvas.height * 0.3, label: "TypeScript", active: false, connections: [0, 1, 4] },
      { x: canvas.width * 0.8, y: canvas.height * 0.4, label: "AI SDK", active: false, connections: [1, 4, 5] },
      { x: canvas.width * 0.7, y: canvas.height * 0.6, label: "Node.js", active: false, connections: [2, 3, 6] },
      { x: canvas.width * 0.5, y: canvas.height * 0.7, label: "Database", active: false, connections: [3, 4, 6] },
      { x: canvas.width * 0.3, y: canvas.height * 0.6, label: "Tailwind", active: false, connections: [4, 5, 7] },
      { x: canvas.width * 0.2, y: canvas.height * 0.5, label: "Motion", active: false, connections: [0, 6] }
    ]

    let animationId: number
    let time = 0

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return

      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      let nearestNode: number | null = null
      let minDistance = Infinity

      skillNodes.forEach((node, index) => {
        const distance = Math.sqrt(Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2))
        if (distance < 50 && distance < minDistance) {
          minDistance = distance
          nearestNode = index
        }
      })

      setHoveredNode(nearestNode)

      // Activate nodes and their connections
      skillNodes.forEach((node, index) => {
        node.active = index === nearestNode || (nearestNode !== null && skillNodes[nearestNode].connections.includes(index))
      })
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      time += 0.01 * config.pulseSpeed

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      skillNodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const connectedNode = skillNodes[connectionIndex]

          // Enhanced connection for active nodes
          const isActive = node.active || connectedNode.active
          const baseOpacity = isActive ? 0.6 : 0.2
          const pulse = Math.sin(time + i * 0.5) * 0.3 + 0.7

          // Lightning effect for active connections
          if (isActive && Math.random() < config.lightningChance) {
            ctx.strokeStyle = `rgba(255, 107, 53, ${baseOpacity * pulse})`
            ctx.lineWidth = 3
            ctx.shadowBlur = 10
            ctx.shadowColor = "#FF6B35"
          } else {
            ctx.strokeStyle = `rgba(255, 215, 0, ${baseOpacity * pulse * 0.5})`
            ctx.lineWidth = isActive ? 2 : 1
            ctx.shadowBlur = isActive ? 5 : 0
            ctx.shadowColor = "#FFD700"
          }

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)

          // Add some curve to the connections
          const midX = (node.x + connectedNode.x) / 2 + Math.sin(time + i) * 10
          const midY = (node.y + connectedNode.y) / 2 + Math.cos(time + i) * 10

          ctx.quadraticCurveTo(midX, midY, connectedNode.x, connectedNode.y)
          ctx.stroke()

          // Reset shadow
          ctx.shadowBlur = 0
        })
      })

      // Draw nodes
      skillNodes.forEach((node, i) => {
        const isHovered = hoveredNode === i
        const pulse = Math.sin(time + i * 0.7) * 0.3 + 0.7
        const radius = isHovered ? 15 : (node.active ? 12 : 8)

        // Node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2)
        const glowOpacity = isHovered ? 0.8 : (node.active ? 0.6 : 0.3)
        gradient.addColorStop(0, `rgba(255, 215, 0, ${glowOpacity * pulse})`)
        gradient.addColorStop(1, `rgba(255, 215, 0, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Node core
        ctx.fillStyle = isHovered ? `rgba(255, 107, 53, 0.9)` : `rgba(255, 215, 0, ${0.8 * pulse})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Node border
        ctx.strokeStyle = `rgba(255, 255, 255, ${isHovered ? 0.8 : 0.4})`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [intensity, interactive, hoveredNode])

  return (
    <div className={`absolute inset-0 overflow-hidden ${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Fallback static web */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Simple connection lines */}
          <motion.line
            x1="20%" y1="30%" x2="40%" y2="20%"
            stroke="rgba(255, 215, 0, 0.3)"
            strokeWidth="1"
            filter="url(#glow)"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.line
            x1="40%" y1="20%" x2="60%" y2="30%"
            stroke="rgba(255, 215, 0, 0.3)"
            strokeWidth="1"
            filter="url(#glow)"
            animate={{ opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.line
            x1="60%" y1="30%" x2="80%" y2="40%"
            stroke="rgba(255, 215, 0, 0.3)"
            strokeWidth="1"
            filter="url(#glow)"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </svg>
      </div>
    </div>
  )
}

export const LightningWeb = memo(LightningWebComponent)