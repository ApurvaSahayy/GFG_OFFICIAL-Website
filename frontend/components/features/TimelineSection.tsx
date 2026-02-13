"use client"

import { motion } from "framer-motion"
import { Timeline } from "@/components/ui/timeline"
import { Calendar, MapPin, Users, Trophy } from "lucide-react"

export function TimelineSection() {
    const timelineItems = [
        {
            title: "Chapter Foundation",
            description: "GeeksforGeeks Student Chapter ITER was established to create a thriving community of tech enthusiasts and innovators.",
            date: "September 2022",
            icon: <Trophy className="w-5 h-5" />,
            status: "completed" as const
        },
        {
            title: "First Major Hackathon",
            description: "Successfully organized our inaugural 24-hour hackathon with over 200+ participants and industry mentors.",
            date: "January 2023",
            icon: <Users className="w-5 h-5" />,
            status: "completed" as const
        },
        {
            title: "Technical Workshop Series",
            description: "Launched weekly coding workshops covering DSA, Web Development, AI/ML, and competitive programming.",
            date: "March 2023",
            icon: <Calendar className="w-5 h-5" />,
            status: "completed" as const
        },
        {
            title: "Inter-College Competition",
            description: "Hosting our flagship inter-college coding competition with prizes worth ₹1L+ and opportunities for top performers.",
            date: "February 2024",
            icon: <MapPin className="w-5 h-5" />,
            status: "current" as const
        },
        {
            title: "Industry Collaboration Summit",
            description: "Planning partnerships with leading tech companies for internships, mentorship, and placement opportunities.",
            date: "Q2 2024",
            status: "upcoming" as const
        }
    ]

    return (
        <section className="relative py-32 overflow-hidden bg-background" id="timeline">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_hsl(var(--primary)/0.05),transparent_70%)]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container relative z-10 px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-md mb-6 text-xs font-mono text-primary font-bold tracking-[0.3em] uppercase">
                        OUR JOURNEY
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6">
                        <span className="text-primary">#</span> Evolution Timeline
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                        From humble beginnings to becoming one of the most active tech communities on campus
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto">
                    <Timeline items={timelineItems} orientation="vertical" />
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    )
}
