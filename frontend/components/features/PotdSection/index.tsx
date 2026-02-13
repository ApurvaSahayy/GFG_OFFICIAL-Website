"use client"

import { motion } from "framer-motion"
import { ProblemPanel } from "./ProblemPanel"
import { EditorPanel } from "./EditorPanel"

export function PotdSection() {
    return (
        <section id="potd" className="py-24 bg-background relative selection:bg-green-500/30">
            {/* Background Decor */}
            <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold font-space-grotesk mb-4">
                        Problem of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Day</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Daily coding challenges to sharpen your skills.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto h-[600px] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row bg-card/20 backdrop-blur-sm">
                    {/* Left: Problem */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full">
                        <ProblemPanel />
                    </div>

                    {/* Right: Editor */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                        {/* Split line decoration */}
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />
                        <EditorPanel />
                    </div>
                </div>
            </div>
        </section>
    )
}
