"use client"

import { motion } from "framer-motion"
import { TeamMember } from "./types"
import { Github, Linkedin, Twitter, Mail, Award, Zap, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

interface MemberCardProps {
    member: TeamMember
    index: number
}

const ROLE_COLORS: Record<string, { primary: string, bg: string, border: string }> = {
    "President": { primary: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30" },
    "Vice President": { primary: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30" },
    "Tech Lead": { primary: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" },
    "Design Lead": { primary: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/30" },
    "Operation Lead": { primary: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
    "PR & Outreach": { primary: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
    "Member": { primary: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-500/30" }
}

export function MemberCard({ member, index }: MemberCardProps) {
    const colors = ROLE_COLORS[member.role] || ROLE_COLORS["Member"]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "group relative overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg",
                colors.border,
                "hover:shadow-" + colors.primary.split('-')[1] + "/20" // Dynamic shadow attempt, might need static
            )}
        >
            {/* Header / ID Badge Style */}
            <div className={cn("px-4 py-2 flex justify-between items-center border-b", colors.border, colors.bg)}>
                <span className={cn("text-xs font-mono font-bold uppercase tracking-wider", colors.primary)}>
                    {member.role}
                </span>
                <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse",
                        member.role === "President" ? "bg-purple-500" : "bg-green-500"
                    )} />
                    <span className="text-[10px] text-muted-foreground font-mono">
                        {member.id}
                    </span>
                </div>
            </div>

            <div className="p-6">
                {/* Profile Photo Area */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className={cn("absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow opacity-50", colors.primary.replace('text', 'border'))} />
                    <div className="absolute inset-1 rounded-full bg-secondary overflow-hidden">
                        {/* Placeholder Image */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                    </div>
                </div>

                {/* Info */}
                <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                        {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono mb-2">
                        {member.role}
                    </p>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-secondary text-secondary-foreground border border-white/5">
                        <Briefcase className="w-3 h-3" />
                        {member.specialty}
                    </div>
                </div>

                {/* Stats Grid (Hover Reveal) */}
                <div className="grid grid-cols-2 gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2 rounded bg-white/5 text-center">
                        <div className="text-lg font-bold text-white">{member.stats.projectsLed}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Projects</div>
                    </div>
                    <div className="p-2 rounded bg-white/5 text-center">
                        <div className="text-lg font-bold text-white">{member.stats.contributionScore}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Score</div>
                    </div>
                </div>

                {/* Social Actions */}
                <div className="flex justify-center gap-3">
                    {member.social.github && (
                        <a href={member.social.github} className="text-muted-foreground hover:text-white transition-colors">
                            <Github className="w-4 h-4" />
                        </a>
                    )}
                    {member.social.linkedin && (
                        <a href={member.social.linkedin} className="text-muted-foreground hover:text-blue-400 transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    )}
                    {member.social.twitter && (
                        <a href={member.social.twitter} className="text-muted-foreground hover:text-sky-400 transition-colors">
                            <Twitter className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
