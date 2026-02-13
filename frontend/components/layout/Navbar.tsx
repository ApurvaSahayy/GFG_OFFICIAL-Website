"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, Terminal, ChevronRight } from "lucide-react"
import { JoinModal } from "@/components/features/JoinModal"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [showJoinModal, setShowJoinModal] = useState(false)
    const router = useRouter()
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

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
                setIsOpen(false)
            }
        }
    }

    return (
        <>
            <JoinModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary z-[60] origin-left"
                style={{ scaleX }}
            />

            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 40, damping: 20, delay: 0.5 }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <div
                    className={cn(
                        "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between",
                        "backdrop-blur-xl border",
                        scrolled
                            ? "w-[90%] md:w-[600px] rounded-full bg-black/40 border-white/5 shadow-[0_8px_32px_rgba(0,255,128,0.15)] px-4 py-2"
                            : "w-[95%] max-w-7xl bg-transparent border-transparent px-6 py-4"
                    )}
                >
                    {/* Logo Area */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => router.push('/')}
                    >
                        <div className="w-10 h-10 flex items-center justify-center bg-black/50 rounded-xl border border-white/10 text-primary font-mono font-bold text-lg group-hover:bg-primary group-hover:text-black transition-all duration-300 relative overflow-hidden shadow-lg">
                            <span className="z-10">&gt;_</span>
                            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </div>
                    </div>

                    {/* Desktop Nav - Dynamic visibility based on scroll */}
                    <nav className={cn(
                        "hidden md:flex items-center gap-1 transition-all duration-500",
                        scrolled ? "absolute left-1/2 -translate-x-1/2" : ""
                    )}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={cn(
                                    "relative px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300",
                                    "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={() => setShowJoinModal(true)}
                            className="relative px-4 py-1.5 overflow-hidden bg-white/5 rounded-full text-white font-mono text-[10px] font-bold uppercase tracking-wider border border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 group"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                JOIN
                            </span>
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground hover:text-primary transition-colors z-50 rounded-full bg-white/5"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            className="fixed top-24 left-4 right-4 bg-[#0A0A0A]/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden md:hidden z-40 pointer-events-auto p-4 shadow-2xl"
                        >
                            <div className="flex flex-col space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                                    >
                                        <span className="font-mono text-muted-foreground group-hover:text-white transition-colors font-bold uppercase tracking-wider text-sm flex items-center gap-3">
                                            <span className="text-[10px] text-primary/50">0{link.id}</span>
                                            {link.label}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                                    </Link>
                                ))}
                                <div className="h-px bg-white/5 my-2" />
                                <button
                                    onClick={() => {
                                        setIsOpen(false)
                                        setShowJoinModal(true)
                                    }}
                                    className="w-full mt-2 bg-primary text-black font-space-grotesk font-bold py-3 rounded-xl uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors"
                                >
                                    Join Network
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    )
}
