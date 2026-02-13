export interface Technology {
    name: string
    icon?: any // Lucide icon or string
    color: string
}

export interface Project {
    id: string
    title: string
    category: "Social Impact" | "Deep Tech" | "Education" | "Blockchain" | "AI/ML" | "Tech" | "Startup" | "Frontend" | "Web Dev"
    description: string
    longDescription?: string
    image: string
    logo?: string
    tech: Technology[]
    stats: {
        stars: number
        forks: number
        contributors: number
        status: "Live" | "Beta" | "Development" | "Archived"
    }
    links: {
        demo?: string
        github?: string
        docs?: string
    }
    featured?: boolean
}
