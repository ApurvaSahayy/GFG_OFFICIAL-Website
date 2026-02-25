"use client"
import { useEffect, useRef, useState } from "react"
import JoinNetwork from "@/components/JoinNetwork";
import { JoinCard } from "@/components/features/misc-sections"
import { motion, AnimatePresence } from "framer-motion"
import { X, Users, Rocket, Zap, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface TeamDetail {
  title: string
  description: string
  icon: LucideIcon
  color: string
  variant: string
  focusAreas: string[]
  techStack: string[]
  groupPhoto?: string
  teamMembers: Array<{ name: string; role: string; avatar?: string }>
  achievements: string[]
  stats?: {
    memberCount?: number
    projectCount?: number
    successRate?: number
  }
}

interface TeamDetailModalProps {
  team: TeamDetail | null
  isOpen: boolean
  onClose: () => void
}

// Helper for color classes
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { gradient: string; glow: string; border: string }> = {
    "text-blue-400": {
      gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
      border: "border-blue-500/30"
    },
    "text-purple-400": {
      gradient: "from-purple-500/20 via-purple-600/10 to-transparent",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
      border: "border-purple-500/30"
    },
    "text-pink-400": {
      gradient: "from-pink-500/20 via-pink-600/10 to-transparent",
      glow: "shadow-[0_0_30px_rgba(236,72,153,0.3)]",
      border: "border-pink-500/30"
    },
    "text-yellow-400": {
      gradient: "from-yellow-500/20 via-yellow-600/10 to-transparent",
      glow: "shadow-[0_0_30px_rgba(234,179,8,0.3)]",
      border: "border-yellow-500/30"
    }
  }
  return colorMap[color] || colorMap["text-blue-400"]
}

// Section divider
const SectionDivider = ({ icon: Icon, title }: { icon: LucideIcon; title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-primary" />
      <h3 className="text-xl font-bold font-space-grotesk text-white">{title}</h3>
    </div>
    <div className="flex-1 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
  </div>
)

export function TeamDetailModal({ team, isOpen, onClose }: TeamDetailModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
const joinCardRef = useRef<HTMLDivElement>(null)
  const [showJoin, setShowJoin] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowJoin(false) // reset when switching teams
    }
  }, [team, isOpen])

  useEffect(() => {
    if (showJoin && joinCardRef.current && scrollContainerRef.current) {
      setTimeout(() => {
        joinCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [showJoin])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      return () => {
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  if (!isOpen || !team) return null
  const colorClasses = getColorClasses(team.color)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl my-8 bg-black/95 border border-white/10 rounded-2xl pointer-events-auto max-h-[85vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110 group"
              >
                <X className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>

              {/* Scrollable Content */}
              <div
                ref={scrollContainerRef}
                className="overflow-y-auto scroll-smooth px-8 py-6"
                style={{ maxHeight: "75vh"}}
              >
                {/* Header */}
                <div className={cn("relative mb-8 pb-6 border-b border-white/10", colorClasses.gradient)}>
                  <div className="flex items-start gap-6">
                    <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center relative bg-gradient-to-br from-white/10 to-white/5 border", colorClasses.border)}>
                      <team.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-2">{team.title}</h2>
                      <p className="text-white/60 text-sm">{team.description}</p>
                    </div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div>
                  <SectionDivider icon={Target} title="Focus Areas" />
                  <div className="flex flex-wrap gap-2">
                    {team.focusAreas.map((area, i) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-white/10 text-white text-sm">{area}</span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <SectionDivider icon={Zap} title="Tech Stack & Tools" />
                  <div className="flex flex-wrap gap-2">
                    {team.techStack.map((tech, i) => (
                      <span key={i} className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Group Photo */}
                {team.groupPhoto && (
                  <div>
                    <SectionDivider icon={Users} title="Team Group Photo" />
                    <img src={team.groupPhoto} alt={`${team.title} Group`} className="w-full max-w-3xl rounded-xl border border-white/10 shadow-lg mb-6" />
                  </div>
                )}

                {/* Team Members */}
                {team.teamMembers.length > 0 && (
                  <div>
                    <SectionDivider icon={Users} title="Team Members" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {team.teamMembers.map((member, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-3">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">{member.name.charAt(0)}</div>
                            )}
                            <div>
                              <p className="text-white font-semibold">{member.name}</p>
                              <p className="text-white/50 text-xs">{member.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Join Section */}
<div className="pt-8 border-t border-white/10">
  <SectionDivider icon={Rocket} title={`Join ${team.title}`} />
  <div className="mt-6 flex justify-center">
  {!showJoin ? (
    <button
      onClick={() => setShowJoin(true)}
      className="px-8 py-3 rounded-xl bg-primary text-black font-bold hover:scale-105 transition-all"
    >
      Join {team.title}
    </button>
  ) : (
    <div className="w-full max-w-md mx-auto">
      <JoinNetwork /> {/* This shows your network info */}
    </div>
  )}
</div>
</div>
              </div> {/* End scrollable content */}
            </motion.div> {/* End modal card */}
          </div> {/* End modal wrapper */}
        </>
      )}
    </AnimatePresence>
  )
}