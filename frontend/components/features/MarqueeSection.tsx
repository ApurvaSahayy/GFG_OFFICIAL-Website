"use client"

import { cn } from "@/lib/utils"

const TECHNOLOGIES = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "NODE.JS", "PYTHON", "AI/ML", "CLOUD", "DEVOPS", "OPEN SOURCE"
]

export function MarqueeSection() {
    return (
        <section className="relative w-full border-y border-white/5 bg-background/50 backdrop-blur-sm overflow-hidden py-6">
            <div className="flex w-full whitespace-nowrap overflow-hidden mask-fade-sides">
                <div className="flex animate-marquee gap-16 min-w-full items-center justify-around px-8">
                    {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
                        <span key={i} className="text-xl font-bold font-mono text-muted-foreground/30 flex items-center gap-4 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
