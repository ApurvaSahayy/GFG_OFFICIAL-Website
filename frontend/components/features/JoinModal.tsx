"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Command, MessageCircle, Instagram, Linkedin, Mail, Twitter, ChevronRight, Copy, Check, Sparkles, Users, Zap } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface JoinModalProps {
    isOpen: boolean
    onClose: () => void
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
    const [copied, setCopied] = useState(false)

    const copyCode = () => {
        navigator.clipboard.writeText("npm join gfg-iter")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const socialLinks = [
        { icon: MessageCircle, href: "https://chat.whatsapp.com/Hr0puwutetlK6dc1MTXXJZ", label: "WhatsApp", color: "hover:text-green-500", bg: "hover:bg-green-500/10", borderColor: "group-hover:border-green-500/50" },
        { icon: Instagram, href: "https://www.instagram.com/p/DShF7VrgI0L/?igsh=MWI3NTVyN250Z21kaA==", label: "Instagram", color: "hover:text-pink-500", bg: "hover:bg-pink-500/10", borderColor: "group-hover:border-pink-500/50" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/gfgiter/posts/?feedView=all", label: "LinkedIn", color: "hover:text-blue-500", bg: "hover:bg-blue-500/10", borderColor: "group-hover:border-blue-500/50" },
        { icon: Twitter, href: "https://x.com/gfg_iter", label: "X (Twitter)", color: "hover:text-sky-500", bg: "hover:bg-sky-500/10", borderColor: "group-hover:border-sky-500/50" },
        { icon: Mail, href: "mailto:gfgiter@gmail.com", label: "Email", color: "hover:text-red-500", bg: "hover:bg-red-500/10", borderColor: "group-hover:border-red-500/50" },
    ]

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
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[70] p-4"
                    >
                        <div className="relative bg-gradient-to-b from-[#0A0A0A] to-black border border-primary/30 rounded-3xl overflow-hidden shadow-[0_0_80px_-12px_rgba(0,255,128,0.4)]">
                            {/* Animated Gradient Border */}
                            <motion.div
                                animate={{
                                    background: [
                                        "linear-gradient(0deg, rgba(0,255,128,0.3), rgba(128,0,255,0.3))",
                                        "linear-gradient(180deg, rgba(0,255,128,0.3), rgba(128,0,255,0.3))",
                                        "linear-gradient(360deg, rgba(0,255,128,0.3), rgba(128,0,255,0.3))",
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-50 pointer-events-none"
                            />

                            {/* Scanning Animation */}
                            <motion.div
                                initial={{ top: "-100%" }}
                                animate={{ top: "100%" }}
                                transition={{ duration: 2.5, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
                                className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent z-20 pointer-events-none blur-sm"
                            />

                            {/* Grid bg */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 p-2.5 rounded-full hover:bg-white/10 transition-all duration-300 z-30 group border border-white/10 hover:border-primary/50"
                            >
                                <X className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                            </button>

                            <div className="relative z-10 p-10 flex flex-col items-center text-center">
                                {/* Header Badge */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 backdrop-blur-sm"
                                >
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_10px_rgba(0,255,128,0.8)]"></span>
                                    </span>
                                    <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                                        Recruiting Soon
                                    </span>
                                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                                </motion.div>

                                {/* Icon */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                                    className="w-20 h-20 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-2xl flex items-center justify-center mb-8 border border-primary/30 shadow-lg shadow-primary/20 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-primary/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <Users className="w-10 h-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                </motion.div>

                                {/* Heading */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-3xl font-bold font-space-grotesk text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white"
                                >
                                    Join the Network
                                </motion.h3>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-muted-foreground text-sm font-mono mb-10 max-w-[320px] leading-relaxed"
                                >
                                    We're preparing for the next intake. Connect with us to stay updated and be part of something extraordinary.
                                </motion.p>

                                {/* Command Box */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={copyCode}
                                    className="w-full bg-black/60 border border-white/20 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-primary/60 transition-all duration-300 group mb-10 relative overflow-hidden backdrop-blur-sm"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                                            <ChevronRight className="w-4 h-4 text-primary" />
                                        </div>
                                        <code className="text-sm font-mono text-gray-200 font-semibold">npm join gfg-iter</code>
                                    </div>
                                    <div className="relative z-10 p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/30 transition-colors">
                                        {copied ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                                        )}
                                    </div>
                                </motion.div>

                                {/* Social Links Header */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="w-full mb-4"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Connect With Us</span>
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </div>
                                </motion.div>

                                {/* Social Links Grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="grid grid-cols-5 gap-3 w-full"
                                >
                                    {socialLinks.map((social, i) => (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
                                            className={cn(
                                                "group aspect-square flex items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-110 relative overflow-hidden",
                                                social.bg,
                                                social.borderColor
                                            )}
                                            title={social.label}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <social.icon className={cn("w-5 h-5 text-muted-foreground transition-all duration-300 relative z-10", social.color)} />
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
