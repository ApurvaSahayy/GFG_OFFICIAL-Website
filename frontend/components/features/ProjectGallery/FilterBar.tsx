"use client"

import { cn } from "@/lib/utils"

interface FilterBarProps {
    categories: string[]
    activeCategory: string
    onSelect: (category: string) => void
}

export function FilterBar({ categories, activeCategory, onSelect }: FilterBarProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button
                onClick={() => onSelect("All")}
                className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    activeCategory === "All"
                        ? "bg-primary text-black border-primary font-bold shadow-lg shadow-primary/25"
                        : "bg-transparent text-muted-foreground border-transparent hover:border-white/10 hover:bg-white/5"
                )}
            >
                All Projects
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                        activeCategory === cat
                            ? "bg-white/10 text-white border-white/20 shadow-inner"
                            : "bg-transparent text-muted-foreground border-transparent hover:border-white/10 hover:bg-white/5"
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}
