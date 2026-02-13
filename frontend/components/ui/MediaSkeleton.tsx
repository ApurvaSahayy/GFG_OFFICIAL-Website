"use client"

import { cn } from "@/lib/utils"

interface MediaSkeletonProps {
    type: "masonry" | "carousel" | "grid"
    count?: number
    columns?: number
}

export function MediaSkeleton({ type, count = 6, columns = 3 }: MediaSkeletonProps) {
    if (type === "masonry") {
        return <MasonrySkeleton count={count} columns={columns} />
    }

    if (type === "carousel") {
        return <CarouselSkeleton count={count} />
    }

    return <GridSkeleton count={count} />
}

function MasonrySkeleton({ count, columns }: { count: number; columns: number }) {
    const items = Array.from({ length: count })
    const columnData = Array.from({ length: columns }, () => [] as number[])

    items.forEach((_, index) => {
        columnData[index % columns].push(index)
    })

    return (
        <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
            {columnData.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-4">
                    {column.map((itemIndex) => (
                        <SkeletonCard
                            key={itemIndex}
                            className="aspect-[4/5]"
                            delay={itemIndex * 0.1}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

function CarouselSkeleton({ count }: { count: number }) {
    return (
        <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard
                    key={index}
                    className="min-w-[300px] aspect-video"
                    delay={index * 0.1}
                />
            ))}
        </div>
    )
}

function GridSkeleton({ count }: { count: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard
                    key={index}
                    className="aspect-video"
                    delay={index * 0.1}
                />
            ))}
        </div>
    )
}

function SkeletonCard({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-xl bg-white/5 border border-white/10",
                className
            )}
            style={{ animationDelay: `${delay}s` }}
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Content placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/5" />
            </div>
        </div>
    )
}
