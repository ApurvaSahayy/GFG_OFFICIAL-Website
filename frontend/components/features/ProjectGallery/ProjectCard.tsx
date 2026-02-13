"use client"

import { motion } from "framer-motion"
import { Project } from "./types"
import { Github, ExternalLink, Star, GitFork, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
    project: Project
    index: number
    className?: string
}

const CATEGORY_COLORS: Record<string, string> = {
    "Social Impact": "text-green-500 bg-green-500/10 border-green-500/20",
    "Deep Tech": "text-purple-500 bg-purple-500/10 border-purple-500/20",
    "Education": "text-blue-500 bg-blue-500/10 border-blue-500/20",
    "Blockchain": "text-orange-500 bg-orange-500/10 border-orange-500/20",
    "AI/ML": "text-pink-500 bg-pink-500/10 border-pink-500/20",
    "Tech": "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    "Startup": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    "Frontend": "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    "Web Dev": "text-sky-500 bg-sky-500/10 border-sky-500/20",
}

export function ProjectCard({ project, index, className }: ProjectCardProps) {
    const isFeatured = project.featured

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={cn(
                "group relative bg-card border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300",
                isFeatured ? "md:col-span-2 md:row-span-2" : "col-span-1",
                className
            )}
        >
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                {/* Placeholder for actual image - ideally use next/image here */}
                {/* <div className="w-full h-full bg-secondary/30 group-hover:scale-105 transition-transform duration-700" /> */}
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50"
                />
            </div>

            <div className="relative z-20 h-full flex flex-col p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-auto">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", CATEGORY_COLORS[project.category] || "text-gray-500 border-gray-500/20")}>
                        {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                        {project.links.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors text-white">
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                        {project.links.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors text-white">
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="mt-8">
                    <h3 className={cn("font-bold text-white mb-2 leading-tight", isFeatured ? "text-3xl md:text-4xl" : "text-xl")}>
                        {project.title}
                    </h3>
                    <p className={cn("text-muted-foreground mb-4", isFeatured ? "text-base max-w-lg" : "text-sm line-clamp-2")}>
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.slice(0, isFeatured ? 6 : 3).map((t) => (
                            <span key={t.name} className="flex items-center gap-1 text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-muted-foreground border border-white/5">
                                <span className={cn("w-1.5 h-1.5 rounded-full", t.color)} />
                                {t.name}
                            </span>
                        ))}
                    </div>

                    {/* Footer Stats */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-xs font-mono text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <GitFork className="w-3 h-3" />
                            <span>{project.stats.forks}</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                            <span className={cn(
                                "w-2 h-2 rounded-full",
                                project.stats.status === "Live" ? "bg-green-500 animate-pulse" :
                                    project.stats.status === "Beta" ? "bg-blue-500" : "bg-orange-500"
                            )} />
                            {project.stats.status}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
