"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FullPageModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export function FullPageModal({ isOpen, onClose, children, className }: FullPageModalProps) {
    // Lock body scroll when modal is open
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
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100]"
                    style={{ position: 'fixed' }}
                >
                    {/* Backdrop - prevent scroll propagation */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="absolute inset-0 bg-black/80"
                        onClick={onClose}
                        onWheel={(e) => e.preventDefault()}
                        onTouchMove={(e) => e.preventDefault()}
                        style={{ touchAction: 'none' }}
                    />

                    {/* Modal Content Container */}
                    <div
                        className={cn(
                            "relative w-full h-full",
                            "flex flex-col",
                            "bg-background",
                            "border-t border-primary/30",
                            className
                        )}
                        style={{
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Top gradient border */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent z-10" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className={cn(
                                "absolute top-6 right-6 z-50",
                                "p-2 rounded-lg",
                                "bg-black/50 hover:bg-black/70 backdrop-blur-md",
                                "border border-white/10 hover:border-primary/50",
                                "transition-all duration-200",
                                "group"
                            )}
                            aria-label="Close"
                        >
                            <X className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors" />
                        </button>

                        {/* Scrollable Content Area */}
                        <div
                            className="flex-1 overflow-y-auto overflow-x-hidden"
                            style={{
                                overscrollBehavior: 'contain',
                                WebkitOverflowScrolling: 'touch',
                                isolation: 'isolate'
                            }}
                        >
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
