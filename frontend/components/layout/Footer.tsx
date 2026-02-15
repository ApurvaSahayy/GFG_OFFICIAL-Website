"use client"

import { Github, Twitter, Linkedin, Mail, Heart, Terminal } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import { Command } from "lucide-react";

export function Footer() {
    const scrollToSection = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault()
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    const socialLinks = [
        { icon: Github, href: "https://github.com/GFG-OFFICIAL" },
        { icon: Twitter, href: "https://x.com/gfg_iter" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/gfgiter/posts/?feedView=all" },
        { icon: Mail, href: "mailto:gfgiter@gmail.com" }
    ]

    return (
        <footer className="relative bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="container relative z-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-2 text-2xl font-bold font-space-grotesk tracking-tighter">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 overflow-hidden relative">
                                <Image
                                    src="/GFG_OFFICIAL-Website/gfg-official-logo.png"
                                    alt="GFG Logo"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <span className="text-white">GFG<span className="text-primary">-ITER</span></span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Empowering students to build, innovate, and ship software that matters. Code the future with us.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full" />
                            Explore
                        </h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {[
                                { label: 'Events', href: '#events' },
                                { label: 'Projects', href: '#innovation' },
                                { label: 'Team', href: '#system-architects' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer"
                                    >
                                        <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary">&gt;</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                            <span className="w-1 h-4 bg-secondary rounded-full" />
                            Community
                        </h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {[
                                { label: 'Join Community', href: 'https://chat.whatsapp.com/Hr0puwutetlK6dc1MTXXJZ' },
                                { label: 'GitHub Org', href: 'https://github.com/GFG-OFFICIAL' },
                                { label: 'Instagram', href: 'https://www.instagram.com/p/DShF7VrgI0L/?igsh=MWI3NTVyN250Z21kaA==' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-secondary transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary">&gt;</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Terminal */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                            <span className="w-1 h-4 bg-accent rounded-full" />
                            System.Log
                        </h4>
                        <div className="bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xs text-green-400">
                            <div className="mb-2">
                                <span className="text-blue-400">root@gfg-sc:~$</span> npm install community
                            </div>
                            <div className="mb-2 text-white/70">
                                [success] Added 500+ members...
                            </div>
                            <div className="mb-2">
                                <span className="text-blue-400">root@gfg-sc:~$</span> ./launch-event.sh
                            </div>
                            <div className="animate-pulse">_</div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        © 2026 GFG Student Chapter. All systems operational.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <span>Made by GFG</span>
                        <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                        <span>and &lt;Code/&gt;</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
