"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Terminal, Zap, Globe, Cpu, Code2, Database, Network } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlitchText } from "@/components/ui/glitch-text"
import { NeonCard } from "@/components/ui/neon-card"
import { ParticleField } from "@/components/ui/particle-field"
import { TextReveal } from "@/components/ui/text-reveal"

export function HeroSectionV2() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    // Core Rotation
    const rotate = useSpring(0, { stiffness: 10, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        const rotateX = (clientY - centerY) / 50
        const rotateY = (clientX - centerX) / 50
        rotate.set(rotateX + rotateY)
    }

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 bg-[#030303]"
        >
            {/* 1. Background Grid & Particles */}
            <div className="absolute inset-0 bg-transparent pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
                <ParticleField particleCount={120} className="opacity-40" />
            </div>

            {/* 2. Central Neural Core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full rounded-full border border-primary/20 border-dashed"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-10 rounded-full border border-primary/10 border-dotted"
                />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="container relative z-10 px-4 flex flex-col items-center text-center mt-12 lg:mt-0"
            >
                {/* System Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-12 hover:border-primary/50 transition-colors group cursor-crosshair"
                >
                    <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#00FF80]" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                        SYSTEM.ROOT_ACCESS_GRANTED
                    </span>
                </motion.div>

                {/* Main Heading Structure */}
                <div className="relative mb-6">
                    {/* Decorative Brackets */}
                    <div className="absolute -left-12 top-0 text-6xl font-thin text-white/5 font-mono select-none hidden md:block">{'{'}</div>
                    <div className="absolute -right-12 bottom-0 text-6xl font-thin text-white/5 font-mono select-none hidden md:block">{'}'}</div>

                    <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.9] font-space-grotesk relative z-10">
                        <span className="block mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white/80">DIGITAL</span>
                        <GlitchText
                            text="ARCHITECTS"
                            className="bg-clip-text text-transparent bg-gradient-to-b from-primary via-green-400 to-primary/60 drop-shadow-[0_0_30px_rgba(0,255,128,0.5)]"
                        />
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-lg md:text-xl text-muted-foreground font-mono text-center max-w-2xl mx-auto"
                    >
                        Building the <span className="text-primary font-bold">future</span> of technology, one line at a time.
                    </motion.p>
                </div>

                {/* Subtext with Terminal Style */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-2xl mx-auto mb-12 text-left bg-black/60 border border-white/10 rounded-xl p-5 font-mono text-sm shadow-2xl backdrop-blur-md hover:border-primary/30 transition-all duration-500 group"
                >
                    <div className="flex gap-2 mb-3 border-b border-white/5 pb-2">
                        <Terminal className="w-4 h-4 text-primary group-hover:animate-pulse" />
                        <span className="text-muted-foreground">gfg@system:~</span>
                        <div className="ml-auto flex gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500/50" />
                            <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex">
                            <span className="text-green-500 mr-2">$</span>
                            <span className="text-gray-300">init_sequence --force --mode=innovation</span>
                        </div>
                        <div className="flex">
                            <span className="text-blue-500 mr-2">{'>'}</span>
                            <span className="text-primary">Loading future protocols...</span>
                        </div>
                        <div className="flex">
                            <span className="text-blue-500 mr-2">{'>'}</span>
                            <TextReveal
                                text="Compiling ideas into reality..."
                                className="text-gray-400"
                                delay={1.5}
                            />
                        </div>
                        <div className="flex mt-2">
                            <span className="text-purple-500 mr-2">{'>'}</span>
                            <TextReveal
                                text="System ready. Welcome to the future."
                                className="text-primary/80"
                                delay={2.5}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 mb-16"
                >
                    <button
                        onClick={() => {
                            const joinBtn = document.querySelector('[data-join-trigger]') as HTMLElement;
                            joinBtn?.click();
                        }}
                        className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-black font-mono font-bold uppercase tracking-wider rounded-full transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(0,255,128,0.3)] hover:shadow-[0_0_50px_rgba(0,255,128,0.5)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Join the Network
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <button
                        onClick={() => {
                            const aboutSection = document.querySelector('#innovation');
                            aboutSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/50 font-mono font-bold uppercase tracking-wider rounded-full transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Terminal className="w-5 h-5" />
                            Explore Projects
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </motion.div>

                {/* Feature Grid (Holographic Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    <FeatureCard
                        icon={Network}
                        title="Neural Network"
                        desc="Advanced community interconnection protocols."
                        delay={0.8}
                    />
                    <FeatureCard
                        icon={Cpu}
                        title="Core Processing"
                        desc="High-performance technical workshops and events."
                        delay={0.9}
                    />
                    <FeatureCard
                        icon={Database}
                        title="Data Forge"
                        desc="Open-source project repositories and resources."
                        delay={1.0}
                    />
                </div>
            </motion.div>
        </section>
    )
}

function FeatureCard({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="group relative p-6 bg-white/5 border border-white/5 hover:border-primary/30 rounded-xl transition-all duration-300 hover:bg-white/[0.07] overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-start text-left">
                <div className="p-3 rounded-lg bg-black/50 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-space-grotesk group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                    {desc}
                </p>
            </div>
        </motion.div>
    )
}
