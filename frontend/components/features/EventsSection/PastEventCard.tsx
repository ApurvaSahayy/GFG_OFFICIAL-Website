"use client"

import { Image as ImageIcon, Users, ArrowUpRight } from "lucide-react"
import { Event } from "./types"
import { motion } from "framer-motion"
import { NeonCard } from "@/components/ui/neon-card"

interface PastEventCardProps {
    event: Event
    index: number
}

export function PastEventCard({ event, index }: PastEventCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <NeonCard variant="secondary" className="group aspect-video relative overflow-hidden cursor-pointer border-secondary/20 hover:border-secondary/50">
                {/* Background (Gradient for now) */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-black opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <span className="text-[10px] font-mono font-bold text-secondary mb-2 block tracking-widest uppercase">
                                    {new Date(event.date).toLocaleDateString()}
                                </span>
                                <h3 className="text-xl font-bold text-white leading-tight font-space-grotesk group-hover:text-secondary transition-colors">
                                    {event.title}
                                </h3>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-secondary group-hover:border-secondary transition-all">
                                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black" />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 border-t border-white/10 pt-4">
                            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                                <ImageIcon className="w-3 h-3 text-secondary" />
                                <span>{event.media?.photos || 0} Photos</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                                <Users className="w-3 h-3 text-secondary" />
                                <span>{event.participants} Attendees</span>
                            </div>
                        </div>
                    </div>
                </div>
            </NeonCard>
        </motion.div>
    )
}
