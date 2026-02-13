"use client"

import { Calendar, Users, ArrowRight, Clock } from "lucide-react"
import { Event } from "./types"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { NeonCard } from "@/components/ui/neon-card"

interface UpcomingEventCardProps {
    event: Event
    index: number
}

export function UpcomingEventCard({ event, index }: UpcomingEventCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <NeonCard variant="primary" className="h-full flex flex-col p-6 group">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                        <code className="text-xl font-bold font-mono">
                            &lt;/&gt;
                        </code>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-muted-foreground group-hover:border-primary/50 group-hover:text-white transition-colors">
                        {event.category}
                    </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors font-space-grotesk">
                    {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                    {event.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono font-bold text-primary/70 bg-primary/5 border border-primary/10 px-2 py-1 rounded hover:bg-primary/20 transition-colors cursor-default">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6 font-mono">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{event.time}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 group-hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <Users className="w-3 h-3 text-primary" />
                        <span>{event.registration?.registered} registered</span>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-primary transition-colors group/btn">
                        Register
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </NeonCard>
        </motion.div>
    )
}
