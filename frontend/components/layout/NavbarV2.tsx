"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, Terminal, ChevronRight, Command, Zap } from "lucide-react"
import { JoinModal } from "@/components/features/JoinModal"

export function NavbarV2() {
    const [scrolled, setScrolled] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [showJoinModal, setShowJoinModal] = useState(false)
    const router = useRouter()
    const { scrollY } = useScroll()

    // Dynamic Island Physics
    const width = useSpring(60, { stiffness: 300, damping: 30 })
    const height = useSpring(60, { stiffness: 300, damping: 30 })
    const borderRadius = useSpring(30, { stiffness: 300, damping: 30 })

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
            if (window.scrollY > 100 && isExpanded) {
                setIsExpanded(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isExpanded])

    useEffect(() => {
        if (isExpanded) {
            width.set(800) // Expanded width
            height.set(80) // Expanded height
            borderRadius.set(40)
        } else {
            width.set(scrolled ? 180 : 600) // Collapsed width logic
            height.set(60)
            borderRadius.set(30)
        }
    }, [isExpanded, scrolled, width, height, borderRadius])

    const navLinks = [
        { label: "Home", href: "/", id: "01" },
        { label: "Innovation", href: "#innovation", id: "02" },
        { label: "Events", href: "#events", id: "03" },
        { label: "Team", href: "#team", id: "04" },
    ]

    const scrollToSection = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault()
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
                setIsExpanded(false)
            }
        }
    }

    return (
        <>
            <JoinModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />

            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-start pointer-events-none">
                <motion.div
                    style={{
                        width,
                        height,
                        borderRadius
                    }}
                    className={cn(
                        "pointer-events-auto relative bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-500",
                        isExpanded ? "bg-black/90 border-primary/20 shadow-[0_20px_50px_rgba(0,255,128,0.1)]" : "hover:border-white/20"
                    )}
                    onMouseEnter={() => !scrolled && setIsExpanded(true)}
                    onMouseLeave={() => !scrolled && setIsExpanded(false)}
                >
                    {/* Inner Container */}
                    <div className="absolute inset-0 flex items-center justify-between px-2">

                        {/* Logo / Status */}
                        <div
                            className="flex items-center gap-3 cursor-pointer pl-4"
                            onClick={() => router.push('/')}
                        >
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <span className="font-mono font-bold text-lg text-white">&gt;_</span>
                                {scrolled && !isExpanded && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"
                                    />
                                )}
                            </div>

                            <AnimatePresence>
                                {(isExpanded || !scrolled) && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="font-mono font-bold text-sm tracking-wider whitespace-nowrap overflow-hidden"
                                    >
                                        GFG SYSTEM
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Links */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.nav
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                                    exit={{ opacity: 0 }}
                                    className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1"
                                >
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={(e) => scrollToSection(e, link.href)}
                                            className="relative px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </motion.nav>
                            )}
                        </AnimatePresence>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pr-2">
                            <AnimatePresence>
                                {(isExpanded || !scrolled) && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center gap-2"
                                    >



                                        {/* Join Network Button */}
                                        <button
                                            data-join-trigger
                                            onClick={() => setShowJoinModal(true)}
                                            className="group relative px-4 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-black border border-primary/20 hover:border-primary rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center gap-1.5">
                                                <Zap className="w-3 h-3" />
                                                JOIN NETWORK
                                            </span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Mobile/Menu Trigger */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors"
                            >
                                <motion.div
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                >
                                    {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </motion.div>
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar (Bottom Border) */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
                        style={{ width: '100%' }}
                    />
                </motion.div>
            </div>
        </>
    )
}
