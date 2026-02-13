"use client"

import { SectionShell } from "@/components/layout/SectionShell"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter, Linkedin, Plus, Fingerprint, Wifi, QrCode, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { NeonCard } from "@/components/ui/neon-card"

const teamMembers = [
    { name: "Subasis Mishra", role: "President", id: "01", skill: "Leadership", color: "text-primary" },
    { name: "Vivek Ranjan", role: "Vice President", id: "02", skill: "Management", color: "text-secondary" },
    { name: "Raj Shehranshu", role: "Tech Lead", id: "03", skill: "Full Stack", color: "text-accent" },
    { name: "Runjhun Pradhan", role: "Design Lead", id: "04", skill: "UI/UX", color: "text-pink-500" },
    { name: "Mukesh Padhi", role: "Operation Lead", id: "05", skill: "Operations", color: "text-yellow-500" },
    { name: "Ayush Pradhan", role: "PR & Outreach", id: "06", skill: "Marketing", color: "text-purple-500" },
]

export function TeamSection() {
    return (
        <SectionShell id="team" badge="Personnel" title="System_Architects" subtitle="Authorized personnel with commit access.">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {teamMembers.map((member, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <NeonCard variant="primary" className="h-full group hover:border-primary/50">
                            {/* Top Bar (Lanyard Hole Area) */}
                            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
                                <div className="flex gap-2 items-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Active Status</span>
                                </div>
                                <div className="w-8 h-1.5 rounded-full bg-black/50 border border-white/10" />
                                <div className="text-[10px] font-mono text-muted-foreground">ID_NO.{member.id}</div>
                            </div>

                            {/* Main Content */}
                            <div className="p-6 flex flex-col items-center relative z-10">

                                {/* Photo Area */}
                                <div className="w-28 h-28 mb-6 relative group-hover:scale-105 transition-transform duration-500">
                                    <div className={cn("absolute inset-0 border-2 border-dashed rounded-full animate-spin-slow opacity-30 group-hover:opacity-100 transition-opacity", member.color.replace('text-', 'border-'))} />
                                    <div className="absolute inset-2 bg-gradient-to-b from-white/10 to-transparent rounded-full overflow-hidden flex items-center justify-center backdrop-blur-sm border border-white/5">
                                        {/* Avatar Fallback with Initials - Accessible Alt */}
                                        <div className={cn("text-3xl font-bold font-mono select-none text-glow", member.color)} role="img" aria-label={`Avatar for ${member.name}`}>
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-black border border-white/10 p-1.5 rounded-lg shadow-sm">
                                        <QrCode className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                {/* Identity */}
                                <div className="text-center w-full space-y-1 mb-6">
                                    <h3 className="text-lg font-bold font-space-grotesk text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                                        {member.name}
                                    </h3>
                                    <div className={cn("inline-flex items-center px-2 py-0.5 rounded border bg-white/5 text-xs font-mono uppercase tracking-widest", member.color.replace('text-', 'border-').replace('text-', 'text-'))}>
                                        {member.role}
                                    </div>
                                </div>

                                {/* Data Grid */}
                                <div className="w-full grid grid-cols-2 gap-px bg-white/10 mb-6 rounded-lg overflow-hidden border border-white/5">
                                    <div className="bg-black/20 p-2 text-center hover:bg-white/5 transition-colors">
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Clearance</div>
                                        <div className="text-xs font-bold font-mono text-white">Lvl 5</div>
                                    </div>
                                    <div className="bg-black/20 p-2 text-center hover:bg-white/5 transition-colors">
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Specialty</div>
                                        <div className={cn("text-xs font-bold font-mono", member.color)}>{member.skill}</div>
                                    </div>
                                </div>

                                {/* Social Access */}
                                <div className="flex gap-3 mt-auto">
                                    {[Github, Linkedin, Twitter].map((Icon, j) => (
                                        <a key={j} href="#" className="p-2 border border-white/10 bg-white/5 rounded-md hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 group/icon">
                                            <Icon className="w-4 h-4 transition-transform group-hover/icon:scale-110" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </NeonCard>
                    </motion.div>
                ))}

                {/* Recruitment Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <NeonCard variant="accent" className="h-full flex flex-col items-center justify-center p-6 border-dashed border-accent/30 hover:border-accent group cursor-pointer">
                        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors group-hover:scale-110 duration-300">
                            <Plus className="w-8 h-8 text-accent" />
                        </div>
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-bold font-space-grotesk text-white uppercase tracking-tight mb-2">Join The Squad</h3>
                            <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                                Open positions available for developers, designers, and creators.
                            </p>
                        </div>
                        <Badge variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black transition-colors uppercase tracking-widest text-[10px] py-2 px-4">
                            Apply_Now
                        </Badge>
                    </NeonCard>
                </motion.div>
            </div>

        </SectionShell>
    )
}
