"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SplitScreenLayoutProps {
    isOpen: boolean
    onClose: () => void
    leftPanel: React.ReactNode
    rightPanel: React.ReactNode
    leftPanelWidth?: string
    className?: string
}

export function SplitScreenLayout({
    isOpen,
    onClose,
    leftPanel,
    rightPanel,
    leftPanelWidth = "400px",
    className
}: SplitScreenLayoutProps) {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const rightPanelRef = useRef<HTMLDivElement>(null)

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollbarWidth}px`
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }

        return () => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }, [isOpen])

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isMobileNavOpen) {
                    setIsMobileNavOpen(false)
                } else if (isOpen) {
                    onClose()
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose, isMobileNavOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[60] flex flex-col md:flex-row bg-background/95 backdrop-blur-xl"
                >
                    {/* Mobile Header */}
                    <div className="md:hidden flex items-center justify-between p-4 border-b border-primary/10 bg-background/50 backdrop-blur-md z-50">
                        <button
                            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                            className="p-2 rounded-lg bg-primary/5 text-primary"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-bold font-space-grotesk text-lg">Timeline</span>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Left Panel - Navigation */}
                    <motion.div
                        className={cn(
                            "fixed inset-y-0 left-0 z-40 bg-background/80 md:bg-transparent md:static md:z-auto",
                            "border-r border-primary/10 flex flex-col",
                            "transition-transform duration-300 ease-in-out md:transform-none"
                        )}
                        style={{
                            width: `min(100%, ${leftPanelWidth})`,
                            transform: typeof window !== 'undefined' && window.innerWidth < 768 && !isMobileNavOpen
                                ? 'translateX(-100%)'
                                : 'none'
                        }}
                    >
                        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                            {leftPanel}
                        </div>
                    </motion.div>

                    {/* Mobile Nav Overlay */}
                    {isMobileNavOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-30 md:hidden"
                            onClick={() => setIsMobileNavOpen(false)}
                        />
                    )}

                    {/* Right Panel - Content */}
                    <div className="flex-1 relative flex flex-col h-full overflow-hidden">
                        {/* Desktop Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={onClose}
                            className="hidden md:flex absolute top-6 right-8 z-50 p-3 rounded-full bg-black/20 hover:bg-red-500/20 text-white/50 hover:text-red-400 backdrop-blur-md border border-white/5 transition-all duration-300 hover:rotate-90"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        {/* Top Gradient */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />

                        {/* Scrollable Content Area */}
                        <div
                            ref={rightPanelRef}
                            className={cn(
                                "flex-1 overflow-y-auto overflow-x-hidden relative",
                                "scroll-smooth", // CSS smooth scrolling
                                className
                            )}
                            onWheel={(e) => e.stopPropagation()}
                            style={{
                                overscrollBehavior: 'contain',
                                isolation: 'isolate'
                            }}
                        >
                            <div className="max-w-7xl mx-auto w-full min-h-full">
                                {rightPanel}
                            </div>

                            {/* Bottom padding for scroll */}
                            <div className="h-32" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
