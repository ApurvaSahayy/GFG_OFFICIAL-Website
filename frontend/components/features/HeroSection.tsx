"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Terminal, Zap, Globe, Cpu, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlitchText } from "@/components/ui/glitch-text"
import { NeonCard } from "@/components/ui/neon-card"
import { ParticleField } from "@/components/ui/particle-field"
import { GradientMesh } from "@/components/ui/gradient-mesh"
import { FloatingShapes } from "@/components/ui/floating-shapes"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { TextReveal } from "@/components/ui/text-reveal"

export function HeroSection() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    const techStack = [
        "TYPESCRIPT", "TAILWINDCSS", "NODE.JS", "SUPABASE", "POSTGRESQL", "NEXT.JS", "REACT", "DOCKER"
    ]

    const previewProjects = [
        {
            title: "AI Resume Screener",
            status: "Live",
            icon: Cpu,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/20",
            variant: "primary"
        },
        {
            title: "Smart Campus App",
            status: "Beta",
            icon: Globe,
            color: "text-secondary",
            bg: "bg-secondary/10",
            border: "border-secondary/20",
            variant: "secondary"
        },
        {
            title: "CodeConnect CLI",
            status: "Dev",
            icon: Terminal,
            color: "text-accent",
            bg: "bg-accent/10",
            border: "border-accent/20",
            variant: "accent"
        }
    ]

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Dynamic Background with Enhanced Effects */}
            <div className="absolute inset-0 bg-transparent pointer-events-none">
                <ParticleField particleCount={80} />
                <GradientMesh colors={["primary", "secondary", "accent"]} blur="xl" />
                <FloatingShapes count={6} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_hsl(var(--primary)/0.15),transparent_70%)]" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="container relative z-10 px-4 flex flex-col items-center text-center mt-12 lg:mt-0"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 border border-secondary/20 backdrop-blur-md mb-8 hover:border-secondary/50 transition-colors cursor-default"
                >
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_#00F0FF]" />
                    <span className="text-xs font-mono text-secondary font-bold tracking-[0.3em] uppercase text-glow-blue">
                        SYSTEM.VER.2.0_ONLINE
                    </span>
                </motion.div>

                {/* Main Heading */}
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] font-space-grotesk text-white mb-8 relative z-10 select-none">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative inline-block"
                    >
                        <span className="relative z-10">THE</span>
                        <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-50" />
                    </motion.div>

                    <br />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative inline-block"
                    >
                        <GlitchText text="INNOVATION" className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500" />
                    </motion.div>

                    <br />

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative inline-block"
                    >
                        <span className="text-stroke-2 text-transparent hover:text-white/10 transition-colors duration-500">FORGE</span>
                    </motion.div>
                </h1>

                {/* Subtext */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-12 font-light leading-relaxed font-mono"
                >
                    <TextReveal
                        text="Where ideas are compiled into reality. We don't just learn technology; we architect the future."
                        variant="blur"
                        delay={0.8}
                    />
                </motion.div>

                {/* Tech Stack Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="w-full max-w-5xl mb-20 overflow-hidden relative border-y border-white/5 py-6 bg-black/20 backdrop-blur-sm"
                >
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

                    <div className="flex w-max animate-marquee gap-16 items-center">
                        {[...techStack, ...techStack].map((tech, i) => (
                            <div key={i} className="flex items-center gap-2 group cursor-default">
                                <Zap className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="text-sm font-mono font-bold text-muted-foreground/50 tracking-[0.2em] uppercase group-hover:text-primary group-hover:text-glow transition-all duration-300">
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Project Preview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                    {previewProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + (i * 0.1) }}
                        >
                            <NeonCard variant={project.variant as any} className="p-8 h-full flex flex-col items-start hover:scale-[1.02]">
                                <div className="flex items-center justify-between w-full mb-6 relative z-10">
                                    <div className={cn("p-3 rounded-lg bg-white/5", project.color)}>
                                        <project.icon className="w-8 h-8" />
                                    </div>
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border",
                                        "border-white/10 bg-white/5",
                                        project.color
                                    )}>
                                        {project.status}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2 font-space-grotesk relative z-10 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <div className="w-12 h-1 bg-white/10 rounded-full mt-auto group-hover:w-full group-hover:bg-primary/50 transition-all duration-500" />
                            </NeonCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />
        </section>
    )
}
