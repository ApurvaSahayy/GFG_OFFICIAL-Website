"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImageWithLoader } from "./ImageWithLoader"
import type { MediaItem } from "@/data/timeline-content"

interface PhotoCarouselProps {
    media: MediaItem[]
    onMediaClick?: (media: MediaItem, index: number) => void
    autoPlay?: boolean
    autoPlayInterval?: number
}

export function PhotoCarousel({
    media,
    onMediaClick,
    autoPlay = false,
    autoPlayInterval = 5000
}: PhotoCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [dragDirection, setDragDirection] = useState(0)
    const autoPlayRef = useRef<NodeJS.Timeout>(undefined)

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50
        if (info.offset.x > swipeThreshold) {
            handlePrevious()
        } else if (info.offset.x < -swipeThreshold) {
            handleNext()
        }
    }

    // Auto-play functionality
    useEffect(() => {
        if (autoPlay) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
            }, autoPlayInterval)
            return () => {
                if (autoPlayRef.current) clearInterval(autoPlayRef.current)
            }
        }
    }, [autoPlay, autoPlayInterval, media.length])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrevious()
            if (e.key === "ArrowRight") handleNext()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handlePrevious, handleNext])

    if (!media || media.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">No media available</p>
            </div>
        )
    }

    return (
        <div className="relative group">
            {/* Main Carousel */}
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/20">
                <AnimatePresence initial={false} custom={dragDirection} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={dragDirection}
                        initial={{ opacity: 0, x: dragDirection > 0 ? 300 : -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dragDirection > 0 ? -300 : 300 }}
                        transition={{ duration: 0.3 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing"
                        onClick={() => onMediaClick?.(media[currentIndex], currentIndex)}
                    >
                        {media[currentIndex].type === "image" ? (
                            <ImageWithLoader
                                src={media[currentIndex].url}
                                alt={media[currentIndex].caption || `Slide ${currentIndex + 1}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                                <div className="text-center text-white">
                                    <svg className="w-24 h-24 mx-auto mb-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    <p className="text-sm opacity-80">Video: {media[currentIndex].url.split('/').pop()}</p>
                                </div>
                            </div>
                        )}

                        {/* Caption Overlay */}
                        {media[currentIndex].caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-12">
                                <p className="text-white text-lg font-medium">
                                    {media[currentIndex].caption}
                                </p>
                                {media[currentIndex].date && (
                                    <p className="text-white/70 text-sm mt-1">
                                        {media[currentIndex].date}
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className={cn(
                                "absolute left-4 top-1/2 -translate-y-1/2 z-10",
                                "p-3 rounded-full bg-black/50 backdrop-blur-sm",
                                "hover:bg-black/70 transition-all",
                                "opacity-0 group-hover:opacity-100",
                                "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
                            )}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={handleNext}
                            className={cn(
                                "absolute right-4 top-1/2 -translate-y-1/2 z-10",
                                "p-3 rounded-full bg-black/50 backdrop-blur-sm",
                                "hover:bg-black/70 transition-all",
                                "opacity-0 group-hover:opacity-100",
                                "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
                            )}
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </>
                )}

                {/* Counter */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-mono">
                        {currentIndex + 1} / {media.length}
                    </span>
                </div>
            </div>

            {/* Thumbnail Strip */}
            {media.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {media.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden",
                                "border-2 transition-all",
                                currentIndex === index
                                    ? "border-primary scale-105"
                                    : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                            )}
                        >
                            {item.type === "image" ? (
                                <img
                                    src={item.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-4">
                {media.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            currentIndex === index
                                ? "bg-primary w-8"
                                : "bg-white/30 hover:bg-white/50"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
