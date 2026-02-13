"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    strength?: number
}

export function MagneticButton({
    children,
    className,
    strength = 0.3
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        setPosition({ x: deltaX, y: deltaY })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1
            }}
            className={cn(
                "relative px-6 py-3 overflow-hidden bg-primary/10 rounded-xl text-primary font-mono text-sm font-bold uppercase tracking-wider border border-primary/50 hover:bg-primary hover:text-black transition-colors duration-300 group",
                className
            )}
        >
            <motion.span
                className="relative z-10 flex items-center gap-2"
                animate={{
                    rotateX: -position.y * 0.1,
                    rotateY: position.x * 0.1
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
    )
}
