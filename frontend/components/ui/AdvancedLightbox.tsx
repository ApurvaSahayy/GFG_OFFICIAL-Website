"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ZoomOut, Download, Share2, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImageWithLoader } from "./ImageWithLoader"
import type { MediaItem } from "@/data/timeline-content"

interface AdvancedLightboxProps {
    media: MediaItem[]
    initialIndex: number
    onClose: () => void
}

export function AdvancedLightbox({ media, initialIndex, onClose }: AdvancedLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)
    const [zoomLevel, setZoomLevel] = useState(1)
    const [isPanning, setIsPanning] = useState(false)
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
    const [isFullscreen, setIsFullscreen] = useState(false)

    const currentMedia = media[currentIndex]
    const canZoom = currentMedia.type === "image"

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            resetZoom()
        }
    }

    const handleNext = () => {
        if (currentIndex < media.length - 1) {
            setCurrentIndex(currentIndex + 1)
            resetZoom()
        }
    }

    const resetZoom = () => {
        setZoomLevel(1)
        setPanPosition({ x: 0, y: 0 })
    }

    const handleZoomIn = () => {
        if (canZoom) {
            setZoomLevel((prev) => Math.min(prev + 0.5, 4))
        }
    }

    const handleZoomOut = () => {
        if (canZoom) {
            setZoomLevel((prev) => {
                const newZoom = Math.max(prev - 0.5, 1)
                if (newZoom === 1) setPanPosition({ x: 0, y: 0 })
                return newZoom
            })
        }
    }

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen()
            setIsFullscreen(true)
        } else {
            await document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = currentMedia.url
        link.download = currentMedia.url.split('/').pop() || 'download'
        link.click()
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: currentMedia.caption || 'Photo',
                    text: currentMedia.caption || 'Check out this photo',
                    url: currentMedia.url
                })
            } catch (err) {
                console.log('Share cancelled or failed')
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(currentMedia.url)
            alert('Link copied to clipboard!')
        }
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") handlePrevious()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "+" || e.key === "=") handleZoomIn()
            if (e.key === "-") handleZoomOut()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [currentIndex, zoomLevel])

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex flex-col"
        >
            {/* Header Controls */}
            <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="text-white/70 text-sm font-mono">
                        {currentIndex + 1} / {media.length}
                    </span>
                    {currentMedia.caption && (
                        <span className="text-white/50 text-sm hidden md:block">
                            • {currentMedia.caption}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Toggle fullscreen"
                    >
                        <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Download"
                    >
                        <Download className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Share"
                    >
                        <Share2 className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Close (ESC)"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="relative max-w-full max-h-full"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) onClose()
                        }}
                    >
                        {currentMedia.type === "image" ? (
                            <motion.div
                                drag={zoomLevel > 1}
                                dragConstraints={{
                                    left: -100 * (zoomLevel - 1),
                                    right: 100 * (zoomLevel - 1),
                                    top: -100 * (zoomLevel - 1),
                                    bottom: 100 * (zoomLevel - 1)
                                }}
                                dragElastic={0.1}
                                onDragStart={() => setIsPanning(true)}
                                onDragEnd={() => setIsPanning(false)}
                                style={{
                                    scale: zoomLevel,
                                    cursor: zoomLevel > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default'
                                }}
                                className="max-w-[90vw] max-h-[80vh]"
                            >
                                <ImageWithLoader
                                    src={currentMedia.url}
                                    alt={currentMedia.caption || "Lightbox image"}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                        ) : (
                            <div className="max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center text-white">
                                    <div className="text-center">
                                        <svg className="w-24 h-24 mx-auto mb-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                        <p className="text-sm opacity-80">Video: {currentMedia.url.split('/').pop()}</p>
                                        <p className="text-xs opacity-60 mt-2">Video playback coming soon</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className={cn(
                                "absolute left-4 top-1/2 -translate-y-1/2",
                                "p-3 rounded-full bg-black/50 backdrop-blur-sm",
                                "hover:bg-black/70 transition-all",
                                "disabled:opacity-30 disabled:cursor-not-allowed"
                            )}
                        >
                            <ChevronLeft className="w-8 h-8 text-white" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex === media.length - 1}
                            className={cn(
                                "absolute right-4 top-1/2 -translate-y-1/2",
                                "p-3 rounded-full bg-black/50 backdrop-blur-sm",
                                "hover:bg-black/70 transition-all",
                                "disabled:opacity-30 disabled:cursor-not-allowed"
                            )}
                        >
                            <ChevronRight className="w-8 h-8 text-white" />
                        </button>
                    </>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="p-4 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    {/* Caption */}
                    <div className="flex-1">
                        {currentMedia.caption && (
                            <p className="text-white text-sm md:text-base font-medium">
                                {currentMedia.caption}
                            </p>
                        )}
                        <div className="flex gap-3 mt-1 text-xs text-white/60">
                            {currentMedia.date && <span>{currentMedia.date}</span>}
                            {currentMedia.location && <span>• {currentMedia.location}</span>}
                        </div>
                    </div>

                    {/* Zoom Controls */}
                    {canZoom && (
                        <div className="flex items-center gap-2 ml-4">
                            <button
                                onClick={handleZoomOut}
                                disabled={zoomLevel <= 1}
                                className={cn(
                                    "p-2 hover:bg-white/10 rounded-lg transition-colors",
                                    "disabled:opacity-30 disabled:cursor-not-allowed"
                                )}
                                title="Zoom out (-)"
                            >
                                <ZoomOut className="w-5 h-5 text-white" />
                            </button>
                            <span className="text-white text-sm font-mono w-12 text-center">
                                {zoomLevel}x
                            </span>
                            <button
                                onClick={handleZoomIn}
                                disabled={zoomLevel >= 4}
                                className={cn(
                                    "p-2 hover:bg-white/10 rounded-lg transition-colors",
                                    "disabled:opacity-30 disabled:cursor-not-allowed"
                                )}
                                title="Zoom in (+)"
                            >
                                <ZoomIn className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
