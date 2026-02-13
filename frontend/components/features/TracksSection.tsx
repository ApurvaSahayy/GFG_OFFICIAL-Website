"use client"

import { motion } from "framer-motion"
import { Cpu, Palette, Megaphone, Settings } from "lucide-react"
import { GlitchText } from "@/components/ui/glitch-text"
import { NeonCard } from "@/components/ui/neon-card"
import { cn } from "@/lib/utils"

export function TracksSection() {
    const tracks = [
        {
            title: "Tech Team",
            description: "Building the future with code. innovative solutions in Web, App, AI, and Blockchain.",
            icon: Cpu,
            color: "text-blue-400",
            variant: "secondary"
        },
        {
            title: "Design Team",
            description: "Crafting visual experiences that captivate and inspire. UI/UX, Graphic Design, and Branding.",
            icon: Palette,
            color: "text-purple-400",
            variant: "primary"
        },
        {
            title: "PR & Outreach",
            description: "Amplifying our voice and connecting with the community. Social Media, Events, and Partnerships.",
            icon: Megaphone,
            color: "text-pink-400",
            variant: "accent"
        },
        {
            title: "Operations",
            description: "The backbone of our events. Logistics, Management, and Execution excellence.",
            icon: Settings,
            color: "text-yellow-400",
            variant: "secondary"
        }
    ]

    return (
        <section className="relative py-32 bg-transparent" id="innovation">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-x-12 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary/5 -skew-x-12 blur-3xl -z-10" />

            <div className="container relative z-10 px-6">
                <div className="text-center max-w-2xl mx-auto mb-20 animate-on-scroll">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <span className="text-sm font-mono text-primary font-bold tracking-[0.3em] uppercase">
                            // DOMAINS
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 text-white"
                    >
                        Focus <GlitchText text="Tracks" className="text-primary" />
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg font-light"
                    >
                        Explore our four core pillars of excellence. Choose your path and master the craft.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {tracks.map((track, i) => (
                        <motion.div
                            key={track.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <NeonCard
                                variant={track.variant as any}
                                className="h-full p-8 group hover:bg-white/5 transition-all"
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={cn(
                                        "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
                                        "bg-white/5 border border-white/10 group-hover:border-white/20",
                                        track.color
                                    )}>
                                        <track.icon className="w-7 h-7" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 font-space-grotesk text-white group-hover:text-glow transition-all">
                                        {track.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                                        {track.description}
                                    </p>

                                    <div className="flex items-center text-xs font-mono font-bold uppercase tracking-widest text-white/50 group-hover:text-primary transition-colors">
                                        <span className="mr-2">Explore </span>
                                        <div className="h-px flex-grow bg-white/10 group-hover:bg-primary/50 transition-colors" />
                                    </div>
                                </div>
                            </NeonCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
