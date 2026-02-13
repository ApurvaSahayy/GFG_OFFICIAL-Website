"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineItem {
    title: string
    description: string
    date?: string
    icon?: React.ReactNode
    status?: "completed" | "current" | "upcoming"
}

interface TimelineProps {
    items: TimelineItem[]
    orientation?: "vertical" | "horizontal"
    className?: string
}

export function Timeline({
    items,
    orientation = "vertical",
    className
}: TimelineProps) {
    return (
        <div className={cn(
            "relative",
            orientation === "vertical" ? "space-y-8" : "flex gap-8",
            className
        )}>
            {/* Connecting Line */}
            <div className={cn(
                "absolute bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent",
                orientation === "vertical"
                    ? "left-[19px] top-0 w-0.5 h-full"
                    : "top-[19px] left-0 h-0.5 w-full bg-gradient-to-r"
            )} />

            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: orientation === "vertical" ? -20 : 0, y: orientation === "horizontal" ? 20 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cn(
                        "relative flex gap-6",
                        orientation === "vertical" ? "flex-row" : "flex-col items-center"
                    )}
                >
                    {/* Marker */}
                    <div className="relative flex-shrink-0">
                        <motion.div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 relative z-10",
                                item.status === "completed" && "bg-primary border-primary text-black",
                                item.status === "current" && "bg-secondary border-secondary text-black animate-pulse",
                                item.status === "upcoming" && "bg-background border-muted text-muted-foreground"
                            )}
                            whileHover={{ scale: 1.2 }}
                        >
                            {item.icon || (
                                <span className="text-xs font-bold font-mono">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            )}
                        </motion.div>

                        {/* Glow effect for current */}
                        {item.status === "current" && (
                            <div className="absolute inset-0 rounded-full bg-secondary/30 blur-xl animate-pulse" />
                        )}
                    </div>

                    {/* Content */}
                    <div className={cn(
                        "flex-1 glass-card p-6 rounded-xl group hover:border-primary/30 transition-colors",
                        orientation === "horizontal" && "text-center"
                    )}>
                        {item.date && (
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                {item.date}
                            </span>
                        )}
                        <h3 className="text-xl font-bold font-space-grotesk mt-2 mb-3 group-hover:text-primary transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>

                        {/* Status indicator */}
                        {item.status && (
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <span className={cn(
                                    "inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider",
                                    item.status === "completed" && "bg-primary/10 text-primary border border-primary/20",
                                    item.status === "current" && "bg-secondary/10 text-secondary border border-secondary/20",
                                    item.status === "upcoming" && "bg-muted/10 text-muted-foreground border border-muted/20"
                                )}>
                                    {item.status}
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
