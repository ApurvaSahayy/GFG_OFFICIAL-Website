"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ImageWithLoader } from "./ImageWithLoader"
import { MediaSkeleton } from "./MediaSkeleton"
import type { MediaItem } from "@/data/timeline-content"

interface PhotoMasonryProps {
    media: MediaItem[]
    onMediaClick: (media: MediaItem, index: number) => void
    columns?: number
    loading?: boolean
}

export function PhotoMasonry({ media, onMediaClick, columns = 3, loading = false }: PhotoMasonryProps) {
    const [columnCount, setColumnCount] = useState(columns)
    const containerRef = useRef<HTMLDivElement>(null)

    // Responsive column calculation
    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth
            if (width < 640) setColumnCount(2)      // Mobile
            else if (width < 1024) setColumnCount(3) // Tablet
            else setColumnCount(columns)             // Desktop
        }

        updateColumns()
        window.addEventListener('resize', updateColumns)
        return () => window.removeEventListener('resize', updateColumns)
    }, [columns])

    // Split media into columns for masonry layout
    const distributeToColumns = () => {
        const cols: MediaItem[][] = Array.from({ length: columnCount }, () => [])
        media.forEach((item, index) => {
            cols[index % columnCount].push(item)
        })
        return cols
    }

    if (loading) {
        return <MediaSkeleton type="masonry" count={6} columns={columnCount} />
    }

    if (!media || media.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">No media available yet</p>
            </div>
        )
    }

    const columnData = distributeToColumns()

    return (
        <div
            ref={containerRef}
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
        >
            {columnData.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-4">
                    {column.map((item, itemIndex) => {
                        const actualIndex = columnIndex + (itemIndex * columnCount)
                        return (
                            <MasonryItem
                                key={actualIndex}
                                media={item}
                                index={actualIndex}
                                onClick={() => onMediaClick(item, actualIndex)}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

interface MasonryItemProps {
    media: MediaItem
    index: number
    onClick: () => void
}

function MasonryItem({ media, index, onClick }: MasonryItemProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const itemRef = useRef<HTMLButtonElement>(null)

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '50px' }
        )

        if (itemRef.current) {
            observer.observe(itemRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <motion.button
            ref={itemRef}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className={cn(
                "relative group cursor-pointer overflow-hidden rounded-xl",
                "bg-white/5 border border-white/10",
                "hover:border-primary/50 transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
        >
            {/* Image Container */}
            <div className="relative w-full">
                {isVisible && (
                    <ImageWithLoader
                        src={media.url}
                        alt={media.caption || "Gallery image"}
                        onLoad={() => setIsLoaded(true)}
                        className="w-full h-auto object-cover"
                    />
                )}

                {/* Overlay on hover */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    "flex flex-col justify-end p-4"
                )}>
                    {media.caption && (
                        <p className="text-white text-sm font-medium line-clamp-2">
                            {media.caption}
                        </p>
                    )}
                    {media.date && (
                        <p className="text-white/70 text-xs mt-1">
                            {media.date}
                        </p>
                    )}
                </div>

                {/* Video indicator */}
                {media.type === "video" && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                    </div>
                )}

                {/* Zoom indicator */}
                <div className={cn(
                    "absolute top-3 left-3 bg-primary/20 backdrop-blur-sm rounded-full p-2",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )}>
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                </div>
            </div>

            {/* Loading state */}
            {!isLoaded && isVisible && (
                <div className="absolute inset-0 bg-white/5 animate-pulse" />
            )}
        </motion.button>
    )
}
