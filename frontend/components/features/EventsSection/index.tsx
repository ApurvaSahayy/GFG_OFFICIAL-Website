"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, History } from "lucide-react"
import { Event } from "./types"
import { UpcomingEventCard } from "./UpcomingEventCard"
import { PastEventCard } from "./PastEventCard"

const DUMMY_EVENTS: Event[] = [
    {
        id: "1",
        title: "Intro to DSA",
        description: "Master the fundamentals of Data Structures and Algorithms.",
        date: "2026-01-29",
        time: "10:00 AM",
        location: "Auditorium 1",
        category: "Workshop",
        type: "upcoming",
        tags: ["C++", "Java", "Algorithms"],
        registration: {
            status: "Open",
            capacity: 100,
            registered: 45,
            deadline: "2026-01-28",
            link: "#"
        }
    },
    {
        id: "2",
        title: "Resume Workshop",
        description: "Learn industry secrets to craft a resume that gets you hired.",
        date: "2026-01-24",
        time: "2:00 PM",
        location: "Seminar Hall",
        category: "Career",
        type: "upcoming",
        tags: ["Interview", "Soft Skills"],
        registration: {
            status: "Open",
            capacity: 50,
            registered: 12,
            deadline: "2026-01-23",
            link: "#"
        }
    },
    {
        id: "3",
        title: "System Design 101",
        description: "Scalability, Load Balancing, and Database Sharding explained.",
        date: "2026-02-01",
        time: "11:00 AM",
        location: "Lab 3",
        category: "Tech Talk",
        type: "upcoming",
        tags: ["Architecture", "Backend"],
        registration: {
            status: "Waitlist",
            capacity: 60,
            registered: 60,
            deadline: "2026-01-31",
            link: "#"
        }
    },
    {
        id: "4",
        title: "HackNITR 5.0",
        description: "Annual hackathon event.",
        date: "2025-12-15",
        time: "9:00 AM",
        location: "Campus Wide",
        category: "Hackathon",
        type: "past",
        tags: ["Hackathon", "Web3"],
        participants: 500,
        media: { photos: 120, videos: 5, gallery: [] }
    }
]

export function EventsSection() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

    const upcomingEvents = DUMMY_EVENTS.filter(e => e.type === "upcoming")
    const pastEvents = DUMMY_EVENTS.filter(e => e.type === "past")

    return (
        <section id="events" className="py-20 bg-background relative selection:bg-primary/30">
            <div className="container px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold font-space-grotesk mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Events</span>
                        <span className="text-primary">.Timeline()</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Join our workshops, hackathons, and seminars. Level up your skills with the community.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="flex p-1 bg-secondary/50 rounded-full border border-white/5 backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab("upcoming")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "upcoming"
                                    ? "bg-primary text-black shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:text-white"
                                }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Upcoming
                        </button>
                        <button
                            onClick={() => setActiveTab("past")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "past"
                                    ? "bg-primary text-black shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:text-white"
                                }`}
                        >
                            <History className="w-4 h-4" />
                            Past Events
                        </button>
                    </div>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === "upcoming" ? (
                        <motion.div
                            key="upcoming"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {upcomingEvents.map((event, i) => (
                                <UpcomingEventCard key={event.id} event={event} index={i} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="past"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        >
                            {pastEvents.map((event, i) => (
                                <PastEventCard key={event.id} event={event} index={i} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
