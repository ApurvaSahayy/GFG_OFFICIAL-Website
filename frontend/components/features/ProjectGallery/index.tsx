"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Project } from "./types"
import { ProjectCard } from "./ProjectCard"
import { FilterBar } from "./FilterBar"

const DUMMY_PROJECTS: Project[] = [
    {
        id: "1",
        title: "Bhumicare",
        category: "Tech",
        description: "Empowering sustainable agriculture through technology. Bridging the gap between farmers and modern solutions.",
        image: "/projects/campus.jpg", // Placeholder
        tech: [
            { name: "React", color: "bg-blue-400" },
            { name: "Node.js", color: "bg-green-500" },
            { name: "MongoDB", color: "bg-green-400" }
        ],
        stats: { stars: 120, forks: 45, contributors: 12, status: "Live" },
        links: { github: "https://github.com/FOX-KNIGHT/BhuMiCare", demo: "#" },
        featured: true
    },
    {
        id: "2",
        title: "Nirama",
        category: "Startup",
        description: "Innovative healthcare startup focused on accessible diagnostics and preventive care solutions.",
        image: "/projects/block.jpg", // Placeholder
        tech: [
            { name: "Next.js", color: "bg-black" },
            { name: "AI/ML", color: "bg-purple-500" },
            { name: "Cloud", color: "bg-orange-400" }
        ],
        stats: { stars: 85, forks: 20, contributors: 5, status: "Beta" },
        links: { github: "#", demo: "#" }
    },
    {
        id: "3",
        title: "Test",
        category: "Frontend",
        description: "A showcase of advanced frontend development skills, animations, and interactive UI components.",
        image: "/projects/ai.jpg", // Placeholder
        tech: [
            { name: "React", color: "bg-blue-300" },
            { name: "Tailwind", color: "bg-cyan-500" },
            { name: "Framer", color: "bg-pink-500" }
        ],
        stats: { stars: 200, forks: 50, contributors: 8, status: "Development" },
        links: { github: "#" }
    },
    {
        id: "4",
        title: "GFG OFFICIAL",
        category: "Web Dev",
        description: "The official platform for the GFG Student Chapter, connecting students with resources and events.",
        image: "/projects/course.jpg", // Placeholder
        tech: [
            { name: "Next.js", color: "bg-black" },
            { name: "TypeScript", color: "bg-blue-600" },
            { name: "Tailwind", color: "bg-cyan-400" }
        ],
        stats: { stars: 45, forks: 10, contributors: 15, status: "Live" },
        links: { github: "https://github.com/FOX-KNIGHT/GFG_OFFICIAL", demo: "#" }
    }
]

const CATEGORIES = ["All", "Tech", "Startup", "Frontend", "Web Dev"]

export function ProjectGallery() {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const filteredProjects = selectedCategory === "All"
        ? DUMMY_PROJECTS
        : DUMMY_PROJECTS.filter(p => p.category === selectedCategory)

    return (
        <section id="innovation" className="py-24 bg-background relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

            <div className="container px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold font-space-grotesk mb-4">
                        Innovation <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">Showcase</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Explore ground-breaking projects built by our community.
                    </p>
                </div>

                <FilterBar
                    categories={CATEGORIES}
                    activeCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                />

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
