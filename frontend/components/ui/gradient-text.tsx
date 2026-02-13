"use client"

import { cn } from "@/lib/utils"

interface GradientTextProps {
    children: React.ReactNode
    className?: string
    gradient?: "primary" | "secondary" | "rainbow" | "cyber"
    animate?: boolean
}

export function GradientText({
    children,
    className,
    gradient = "primary",
    animate = true
}: GradientTextProps) {
    const gradients = {
        primary: "from-primary via-secondary to-primary",
        secondary: "from-secondary via-accent to-secondary",
        rainbow: "from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
        cyber: "from-primary via-secondary via-accent to-primary"
    }

    return (
        <span
            className={cn(
                "inline-block text-transparent bg-clip-text bg-gradient-to-r",
                gradients[gradient],
                animate && "bg-[length:200%_auto] animate-gradient",
                className
            )}
        >
            {children}
        </span>
    )
}
