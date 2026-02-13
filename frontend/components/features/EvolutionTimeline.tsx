"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Coffee, Users, ChevronRight, Calendar, Image as ImageIcon, ArrowRight, LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { SplitScreenLayout } from "@/components/ui/SplitScreenLayout"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { PhotoMasonry } from "@/components/ui/PhotoMasonry"
import { PhotoCarousel } from "@/components/ui/PhotoCarousel"
import { AdvancedLightbox } from "@/components/ui/AdvancedLightbox"
import { timelineData, type MediaItem, type TimelineSection, type Subsection } from "@/data/timeline-content"

// Navigation state types
type ViewState =
    | { level: 'overview' }
    | { level: 'split-view', sectionId: string, subsectionId?: string }

export function EvolutionTimeline() {
    const [viewState, setViewState] = useState<ViewState>({ level: 'overview' })
    const [lightboxMedia, setLightboxMedia] = useState<MediaItem[] | null>(null)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    const sections = timelineData
    const isSplitViewOpen = viewState.level === 'split-view'

    // Navigation functions
    const openSection = (sectionId: string) => {
        setViewState({ level: 'split-view', sectionId })
    }

    const navigateToSubsection = (sectionId: string, subsectionId: string) => {
        setViewState({ level: 'split-view', sectionId, subsectionId })
    }

    const closeSplitView = () => {
        setViewState({ level: 'overview' })
    }

    const openLightbox = (media: MediaItem[], index: number) => {
        setLightboxMedia(media)
        setLightboxIndex(index)
    }

    // Get current active data
    const currentSection = viewState.level === 'split-view'
        ? sections.find(s => s.id === viewState.sectionId)
        : undefined

    const currentSubsection = viewState.level === 'split-view' && currentSection && viewState.subsectionId
        ? currentSection.subsections?.find(sub => sub.id === viewState.subsectionId)
        : undefined

    // Icon mapping
    const iconMap = {
        "foundation": Award,
        "chai-links": Coffee,
        "founders": Users
    }

    const colorClasses = {
        primary: {
            bg: "bg-primary/10",
            border: "border-primary/30",
            text: "text-primary",
            glow: "shadow-[0_0_40px_rgba(0,255,128,0.5)]",
            gradient: "from-primary/20 to-transparent",
            hoverBg: "hover:bg-primary/20"
        },
        secondary: {
            bg: "bg-secondary/10",
            border: "border-secondary/30",
            text: "text-secondary",
            glow: "shadow-[0_0_40px_rgba(0,240,255,0.5)]",
            gradient: "from-secondary/20 to-transparent",
            hoverBg: "hover:bg-secondary/20"
        },
        accent: {
            bg: "bg-accent/10",
            border: "border-accent/30",
            text: "text-accent",
            glow: "shadow-[0_0_40px_rgba(255,0,255,0.5)]",
            gradient: "from-accent/20 to-transparent",
            hoverBg: "hover:bg-accent/20"
        }
    }

    return (
        <section className="relative py-32 overflow-hidden bg-background" id="evolution">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary)/0.05),transparent_70%)]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(hsl(var(--primary)/0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container relative z-10 px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="inline-block px-6 py-2 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-md mb-6 text-xs font-mono text-primary font-bold tracking-[0.3em] uppercase"
                    >
                        OUR JOURNEY
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl font-bold font-space-grotesk mb-6">
                        <span className="text-primary">#</span> Evolution{" "}
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Timeline
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        Explore our chapter's milestones through an immersive visual journey
                    </p>
                </motion.div>

                {/* Overview Cards */}
                <div className="max-w-6xl mx-auto grid gap-8">
                    {sections.map((section, index) => {
                        const colors = colorClasses[section.color as keyof typeof colorClasses]
                        const Icon = iconMap[section.id as keyof typeof iconMap]
                        const totalMedia = section.subsections
                            ? section.subsections.reduce((sum, sub) => sum + (sub.media?.length || 0), 0)
                            : section.media?.length || 0

                        return (
                            <motion.button
                                key={section.id}
                                onClick={() => openSection(section.id)}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.01, y: -4 }}
                                whileTap={{ scale: 0.99 }}
                                className={cn(
                                    "group relative glass-card rounded-3xl p-8 md:p-12",
                                    "border-2 transition-all duration-500",
                                    "hover:border-primary/50",
                                    colors.border,
                                    "text-left w-full overflow-hidden"
                                )}
                            >
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                                    colors.gradient
                                )} />

                                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "relative p-5 rounded-2xl transition-all duration-500",
                                            colors.bg,
                                            colors.text,
                                            "group-hover:scale-110"
                                        )}>
                                            <Icon className="w-8 h-8 md:w-10 md:h-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2 group-hover:text-white transition-colors">
                                                {section.title}
                                            </h3>
                                            <p className={cn("font-mono text-sm uppercase tracking-wider", colors.text)}>
                                                {section.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                        {totalMedia > 0 && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground/80 bg-background/30 px-4 py-2 rounded-full border border-white/5">
                                                <ImageIcon className="w-4 h-4" />
                                                <span>{totalMedia} memories</span>
                                            </div>
                                        )}
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                                            colors.bg,
                                            colors.text,
                                            "group-hover:translate-x-2"
                                        )}>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            {/* Split Screen Application-Like Interface */}
            {currentSection && (
                <SplitScreenLayout
                    isOpen={isSplitViewOpen}
                    onClose={closeSplitView}
                    leftPanel={
                        <NavigationPanel
                            sections={sections}
                            currentSection={currentSection}
                            currentSubsectionId={viewState.level === 'split-view' ? viewState.subsectionId : undefined}
                            onSelectSection={openSection}
                            onSelectSubsection={(subId) => navigateToSubsection(currentSection.id, subId)}
                        />
                    }
                    rightPanel={
                        <ContentPanel
                            section={currentSection}
                            subsection={currentSubsection}
                            onOpenLightbox={openLightbox}
                        />
                    }
                />
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxMedia && (
                    <AdvancedLightbox
                        media={lightboxMedia}
                        initialIndex={lightboxIndex}
                        onClose={() => setLightboxMedia(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

interface NavigationPanelProps {
    sections: TimelineSection[]
    currentSection: TimelineSection
    currentSubsectionId?: string
    onSelectSection: (id: string) => void
    onSelectSubsection: (id: string) => void
}

function NavigationPanel({
    sections,
    currentSection,
    currentSubsectionId,
    onSelectSection,
    onSelectSubsection
}: NavigationPanelProps) {
    return (
        <div className="p-6 md:p-8 space-y-8 min-h-full">
            <div className="mb-8">
                <h3 className="text-xs font-mono uppercase text-muted-foreground mb-4 tracking-widest">
                    Chapters
                </h3>
                <div className="space-y-2">
                    {sections.map(section => {
                        const isActive = section.id === currentSection.id
                        return (
                            <button
                                key={section.id}
                                onClick={() => onSelectSection(section.id)}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group",
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium border border-primary/20"
                                        : "hover:bg-white/5 text-muted-foreground hover:text-white"
                                )}
                            >
                                <span className="font-space-grotesk">{section.title}</span>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                            </button>
                        )
                    })}
                </div>
            </div>

            {currentSection.subsections && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={currentSection.id}
                >
                    <h3 className="text-xs font-mono uppercase text-muted-foreground mb-4 tracking-widest flex items-center gap-2">
                        <List className="w-3 h-3" />
                        Contents
                    </h3>
                    <div className="relative pl-4 space-y-1">
                        {/* Vertical line */}
                        <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />

                        {currentSection.subsections.map(sub => {
                            const isSubActive = sub.id === currentSubsectionId
                            return (
                                <button
                                    key={sub.id}
                                    onClick={() => onSelectSubsection(sub.id)}
                                    className={cn(
                                        "w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 block relative",
                                        isSubActive
                                            ? "bg-white/5 text-white font-medium pl-6"
                                            : "text-muted-foreground hover:text-white hover:pl-6"
                                    )}
                                >
                                    {isSubActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full"
                                        />
                                    )}
                                    {sub.title}
                                </button>
                            )
                        })}
                    </div>
                </motion.div>
            )}
        </div>
    )
}

interface ContentPanelProps {
    section: TimelineSection
    subsection?: Subsection
    onOpenLightbox: (media: MediaItem[], index: number) => void
}

function ContentPanel({ section, subsection, onOpenLightbox }: ContentPanelProps) {
    const colors = {
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent"
    }[section.color]

    // Content for subsection view
    if (subsection) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={`sub-${subsection.id}`}
                className="py-12 md:py-16 px-6 md:px-12"
            >
                <Breadcrumb
                    items={[
                        { label: section.title },
                        { label: subsection.title }
                    ]}
                    className="mb-8"
                />

                <div className="max-w-4xl mb-12">
                    <h2 className={cn("text-4xl md:text-6xl font-bold font-space-grotesk mb-4", colors)}>
                        {subsection.title}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        {subsection.description}
                    </p>

                    {subsection.date && (
                        <div className="flex items-center gap-2 mt-6 text-sm font-mono text-muted-foreground/80">
                            <Calendar className="w-4 h-4" />
                            <span>{subsection.date}</span>
                        </div>
                    )}
                </div>

                <div className="min-h-[400px]">
                    {subsection.media && subsection.media.length > 0 ? (
                        section.id === 'chai-links' ? (
                            <PhotoCarousel
                                media={subsection.media}
                                onMediaClick={(media, index) => onOpenLightbox(subsection.media, index)}
                            />
                        ) : (
                            <PhotoMasonry
                                media={subsection.media}
                                onMediaClick={(media, index) => onOpenLightbox(subsection.media, index)}
                            />
                        )
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </motion.div>
        )
    }

    // Content for main section view
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={`sec-${section.id}`}
            className="py-12 md:py-16 px-6 md:px-12"
        >
            <div className="mb-12">
                <span className={cn("inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider mb-4", colors)}>
                    Overview
                </span>
                <h2 className="text-5xl md:text-7xl font-bold font-space-grotesk mb-4">
                    {section.title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    {section.subtitle}
                </p>
            </div>

            {section.media && section.media.length > 0 && (
                <div className="mb-16">
                    <h3 className="text-xl font-bold font-space-grotesk mb-6 flex items-center gap-2">
                        <LayoutGrid className="w-5 h-5 text-primary" />
                        Highlights Gallery
                    </h3>
                    <PhotoMasonry
                        media={section.media}
                        onMediaClick={(media, index) => onOpenLightbox(section.media || [], index)}
                        columns={3}
                    />
                </div>
            )}

            {!section.subsections && (!section.media || section.media.length === 0) && (
                <EmptyState />
            )}
        </motion.div>
    )
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 glass-card rounded-3xl border-2 border-dashed border-white/10">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
            </div>
            <p className="text-xl text-muted-foreground/50 font-medium">No memories captured yet</p>
            <p className="text-sm text-muted-foreground/30 mt-2">Check back later for updates</p>
        </div>
    )
}
