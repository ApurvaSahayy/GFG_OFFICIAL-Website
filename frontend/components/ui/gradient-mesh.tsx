"use client"

import { cn } from "@/lib/utils"

interface GradientMeshProps {
    className?: string
    colors?: string[]
    blur?: "sm" | "md" | "lg" | "xl"
}

export function GradientMesh({
    className,
    colors = ["primary", "secondary", "accent"],
    blur = "xl"
}: GradientMeshProps) {
    const blurMap = {
        sm: "blur-[80px]",
        md: "blur-[120px]",
        lg: "blur-[160px]",
        xl: "blur-[200px]"
    }

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {/* Top Left */}
            <div
                className={cn(
                    "absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full opacity-20 animate-pulse-slow",
                    blurMap[blur],
                    colors[0] === "primary" ? "bg-primary" : colors[0] === "secondary" ? "bg-secondary" : "bg-accent"
                )}
                style={{ animationDelay: "0s", animationDuration: "8s" }}
            />

            {/* Top Right */}
            <div
                className={cn(
                    "absolute top-[20%] right-[15%] w-[35%] h-[35%] rounded-full opacity-15 animate-pulse-slow",
                    blurMap[blur],
                    colors[1] === "primary" ? "bg-primary" : colors[1] === "secondary" ? "bg-secondary" : "bg-accent"
                )}
                style={{ animationDelay: "2s", animationDuration: "10s" }}
            />

            {/* Bottom Center */}
            <div
                className={cn(
                    "absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[45%] h-[45%] rounded-full opacity-10 animate-pulse-slow",
                    blurMap[blur],
                    colors[2] === "primary" ? "bg-primary" : colors[2] === "secondary" ? "bg-secondary" : "bg-accent"
                )}
                style={{ animationDelay: "4s", animationDuration: "12s" }}
            />
        </div>
    )
}
