"use client"

import { cn } from "@/lib/utils"

interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    text: string
    as?: "span" | "h1" | "h2" | "h3" | "p"
}

export function GlitchText({ text, className, as: Component = "span", ...props }: GlitchTextProps) {
    return (
        <Component
            className={cn(
                "relative inline-block font-bold text-transparent bg-clip-text bg-white",
                className
            )}
            {...props}
        >
            <span className="relative z-10">{text}</span>
            <span
                aria-hidden="true"
                className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-70 animate-glitch-1"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)", transform: "translate(-2px)" }}
            >
                {text}
            </span>
            <span
                aria-hidden="true"
                className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-70 animate-glitch-2"
                style={{ clipPath: "polygon(0 80%, 100% 20%, 100% 100%, 0 100%)", transform: "translate(2px)" }}
            >
                {text}
            </span>
        </Component>
    )
}
