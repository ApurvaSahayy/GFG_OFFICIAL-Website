"use client"

import { motion } from "framer-motion"
import { Terminal, Cpu, Globe, ArrowRight } from "lucide-react"

export function BrandSection() {
    return (
        <div className="hidden lg:flex flex-col justify-between h-full p-12 bg-zinc-900/50 backdrop-blur-xl relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

            {/* Logo Area */}
            <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                    <Terminal className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-4xl font-bold font-space-grotesk text-white mb-2">
                    GFG <span className="text-primary">Student Chapter</span>
                </h1>
                <p className="text-zinc-400 max-w-sm">
                    Access the command center. Manage events, track projects, and lead the innovation.
                </p>
            </div>

            {/* Feature Showcase */}
            <div className="relative z-10 space-y-8">
                <div className="flex gap-4 items-start group">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/30 transition-colors">
                        <Cpu className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-1">Project Management</h3>
                        <p className="text-sm text-zinc-500">Track milestones and deployments.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start group">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/30 transition-colors">
                        <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-1">Event Operations</h3>
                        <p className="text-sm text-zinc-500">Coordinate hackathons and workshops.</p>
                    </div>
                </div>
            </div>

            {/* Footer Stats */}
            <div className="relative z-10">
                <div className="flex gap-8 py-6 border-t border-white/10">
                    <div>
                        <div className="text-2xl font-bold text-white">2.5k+</div>
                        <div className="text-xs text-zinc-500 font-mono uppercase">Members</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">50+</div>
                        <div className="text-xs text-zinc-500 font-mono uppercase">Projects</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">100+</div>
                        <div className="text-xs text-zinc-500 font-mono uppercase">Events</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    SYSTEM ONLINE • V2.0.4
                </div>
            </div>
        </div>
    )
}
