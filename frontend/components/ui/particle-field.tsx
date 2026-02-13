"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
}

interface ParticleFieldProps {
    className?: string
    particleCount?: number
    particleColor?: string
    connectionColor?: string
    maxDistance?: number
    mouseRadius?: number
}

export function ParticleField({
    className,
    particleCount = 100,
    particleColor = "rgba(0, 255, 128, 0.5)",
    connectionColor = "rgba(0, 255, 128, 0.1)",
    maxDistance = 150,
    mouseRadius = 200
}: ParticleFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef<number>(undefined)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        const initParticles = () => {
            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            }))
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            particlesRef.current.forEach((particle, i) => {
                // Mouse attraction
                const dx = mouseRef.current.x - particle.x
                const dy = mouseRef.current.y - particle.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius
                    particle.vx += (dx / distance) * force * 0.02
                    particle.vy += (dy / distance) * force * 0.02
                }

                // Apply velocity damping
                particle.vx *= 0.99
                particle.vy *= 0.99

                // Update position
                particle.x += particle.vx
                particle.y += particle.vy

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                // Keep in bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x))
                particle.y = Math.max(0, Math.min(canvas.height, particle.y))

                // Draw particle
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = particleColor
                ctx.fill()

                // Draw connections
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const other = particlesRef.current[j]
                    const dx = particle.x - other.x
                    const dy = particle.y - other.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < maxDistance) {
                        const opacity = 1 - distance / maxDistance
                        ctx.beginPath()
                        ctx.strokeStyle = connectionColor.replace(/[\d.]+\)$/g, `${opacity * 0.3})`)
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(other.x, other.y)
                        ctx.stroke()
                    }
                }
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        resizeCanvas()
        initParticles()
        window.addEventListener("resize", () => {
            resizeCanvas()
            initParticles()
        })
        window.addEventListener("mousemove", handleMouseMove)

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            window.removeEventListener("mousemove", handleMouseMove)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [particleCount, particleColor, connectionColor, maxDistance, mouseRadius])

    return (
        <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 pointer-events-none", className)}
        />
    )
}
