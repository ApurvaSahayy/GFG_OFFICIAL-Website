"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface NeonCardProps extends React.ComponentProps<typeof motion.div> {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "accent"
}

export function NeonCard({ children, className, variant = "primary", ...props }: NeonCardProps) {
    const variantStyles = {
        primary: "border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,255,128,0.2)]",
        secondary: "border-secondary/20 hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]",
        accent: "border-accent/20 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,0,255,0.2)]"
    }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "relative overflow-hidden rounded-xl border bg-black/40 backdrop-blur-xl transition-all duration-300",
                variantStyles[variant],
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
            {children}
        </motion.div>
    )
}
