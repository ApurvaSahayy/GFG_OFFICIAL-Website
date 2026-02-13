"use client"

import { TeamMember } from "./types"
import { MemberCard } from "./MemberCard"
import { motion } from "framer-motion"

const DUMMY_TEAM: TeamMember[] = [
    {
        id: "GFG-001",
        name: "Alex Rivera",
        role: "President",
        position: "leadership",
        photo: "/team/alex.jpg",
        email: "alex@gfg.com",
        specialty: "Full Stack Arch",
        bio: "Building things that matter.",
        achievements: ["Hackathon Winner", "GSoC Mentor"],
        skills: ["React", "Node", "AWS"],
        joinedDate: "2023",
        social: { github: "#", linkedin: "#", twitter: "#" },
        stats: { projectsLed: 12, eventsOrganized: 5, contributionScore: 98 }
    },
    {
        id: "GFG-002",
        name: "Sarah Chen",
        role: "Vice President",
        position: "leadership",
        photo: "/team/sarah.jpg",
        email: "sarah@gfg.com",
        specialty: "AI/ML Systems",
        bio: "Data driven decisions.",
        achievements: ["Research Paper", "Kaggle Grandmaster"],
        skills: ["Python", "PyTorch", "Docker"],
        joinedDate: "2023",
        social: { github: "#", linkedin: "#" },
        stats: { projectsLed: 8, eventsOrganized: 10, contributionScore: 95 }
    },
    {
        id: "GFG-003",
        name: "Mike Ross",
        role: "Tech Lead",
        position: "lead",
        photo: "/team/mike.jpg",
        email: "mike@gfg.com",
        specialty: "Blockchain",
        bio: "Decentralize everything.",
        achievements: [],
        skills: ["Solidity", "Rust"],
        joinedDate: "2024",
        social: { github: "#" },
        stats: { projectsLed: 5, eventsOrganized: 2, contributionScore: 88 }
    },
    {
        id: "GFG-004",
        name: "Jessica Pearson",
        role: "Design Lead",
        position: "lead",
        photo: "/team/jess.jpg",
        email: "jess@gfg.com",
        specialty: "UI/UX",
        bio: "Pixels with purpose.",
        achievements: [],
        skills: ["Figma", "Three.js"],
        joinedDate: "2024",
        social: { linkedin: "#" },
        stats: { projectsLed: 4, eventsOrganized: 6, contributionScore: 90 }
    },
    {
        id: "GFG-005",
        name: "Harvey Specter",
        role: "Operation Lead",
        position: "lead",
        photo: "/team/harvey.jpg",
        email: "harvey@gfg.com",
        specialty: "Management",
        bio: "Closer.",
        achievements: [],
        skills: ["Agile", "Scrum"],
        joinedDate: "2024",
        social: { linkedin: "#" },
        stats: { projectsLed: 15, eventsOrganized: 20, contributionScore: 92 }
    },
    {
        id: "GFG-006",
        name: "Donna Paulsen",
        role: "PR & Outreach",
        position: "lead",
        photo: "/team/donna.jpg",
        email: "donna@gfg.com",
        specialty: "Communications",
        bio: "I know everything.",
        achievements: [],
        skills: ["Public Speaking", "Marketing"],
        joinedDate: "2024",
        social: { linkedin: "#", twitter: "#" },
        stats: { projectsLed: 2, eventsOrganized: 25, contributionScore: 94 }
    }
]

export function TeamSection() {
    const leadership = DUMMY_TEAM.filter(m => m.position === "leadership")
    const leads = DUMMY_TEAM.filter(m => m.position === "lead")

    return (
        <section id="team" className="py-24 bg-background relative selection:bg-purple-500/30">
            <div className="container px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl lg:text-5xl font-bold font-space-grotesk mb-4">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Architects</span>
                    </h2>
                    <p className="text-muted-foreground">
                        The minds behind the code.
                    </p>
                </div>

                {/* Leadership Level */}
                <div className="flex justify-center gap-8 mb-16 flex-wrap">
                    {leadership.map((member, i) => (
                        <div key={member.id} className="w-full max-w-sm">
                            <MemberCard member={member} index={i} />
                        </div>
                    ))}
                </div>

                {/* Leads Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {leads.map((member, i) => (
                        <MemberCard key={member.id} member={member} index={i + 2} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                        <button className="px-8 py-3 rounded-full bg-background hover:bg-white/5 text-white font-bold transition-colors">
                            Join the Team
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
