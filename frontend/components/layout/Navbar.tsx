"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import gfgLogo from "@/public/gfg-official-logo.png"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, Zap } from "lucide-react"
import { JoinModal } from "@/components/features/JoinModal"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showJoinModal, setShowJoinModal] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Innovation", href: "#innovation" },
        { label: "Events", href: "#events" },
        { label: "Team", href: "#team" },
    ]



    const scrollToSection = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault()
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
                setMobileMenuOpen(false)
            }
        }
        // For non-hash links like "/", allow default navigation
    }

    return (
        <>
            <JoinModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />

            {/* Floating Glass Dock */}
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className={cn(
                        "pointer-events-auto flex items-center justify-between p-2 pl-4 pr-2 rounded-full border transition-all duration-300",
                        scrolled
                            ? "bg-black/80 backdrop-blur-xl border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-fit min-w-[320px] max-w-5xl gap-6"
                            : "bg-transparent border-transparent w-full max-w-7xl"
                    )}
                >
                    {/* Logo Section */}
                    <button onClick={() => router.push('/')} className="flex items-center gap-2 group shrink-0 cursor-pointer">
                        <div className="relative w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 overflow-hidden group-hover:border-primary/50 transition-colors">
                            <Image src={gfgLogo} alt="GFG Logo" width={20} height={20} className="object-contain" />
                        </div>
                        <span className={cn(
                            "font-space-grotesk font-bold text-sm tracking-wide hidden sm:block transition-all duration-300",
                            scrolled ? "hidden lg:block" : "block"
                        )}>
                            GFG<span className="text-muted-foreground">ITER</span>
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className={cn(
                        "hidden md:flex items-center gap-1 transition-all duration-300",
                        scrolled ? "relative" : "absolute left-1/2 -translate-x-1/2"
                    )}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                {...(link.href.startsWith('#') && { onClick: (e) => scrollToSection(e, link.href) })}
                                onMouseEnter={() => setHoveredLink(link.label)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className="relative px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-white transition-colors"
                            >
                                {hoveredLink === link.label && (
                                    <motion.div
                                        layoutId="navbar-pill"
                                        className="absolute inset-0 bg-white/5 rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Social Icons (Desktop) */}


                        {/* Join Button */}
                        <button
                            onClick={() => setShowJoinModal(true)}
                            data-join-trigger
                            className="group relative px-5 py-2 rounded-full bg-white text-black font-medium text-xs overflow-hidden transition-transform active:scale-95"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-white to-primary opacity-0 group-hover:opacity-20 transition-opacity" />
                            <span className="relative flex items-center gap-2">
                                Join Network
                                <Zap className="w-3.5 h-3.5 fill-current" />
                            </span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-white/70 hover:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </motion.div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-24 left-4 right-4 z-40 p-4 rounded-2xl bg-[#050505]/90 backdrop-blur-2xl border border-white/10 shadow-2xl md:hidden"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <Image src={gfgLogo} alt="GFG Logo" width={32} height={32} className="object-contain" />
                        </div>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    {...(link.href.startsWith('#') && { onClick: (e) => scrollToSection(e, link.href) })}
                                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            <Link href="/login" className="p-4 text-center text-sm text-muted-foreground hover:text-white">
                                Member Login
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
