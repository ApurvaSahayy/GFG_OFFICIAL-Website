"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
    label: string
    onClick?: () => void
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav className={cn("flex items-center gap-2 text-sm", className)} aria-label="Breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1

                return (
                    <div key={index} className="flex items-center gap-2">
                        {item.onClick ? (
                            <button
                                onClick={item.onClick}
                                className={cn(
                                    "font-mono transition-colors",
                                    isLast
                                        ? "text-primary font-bold"
                                        : "text-muted-foreground hover:text-white"
                                )}
                            >
                                {item.label}
                            </button>
                        ) : (
                            <span
                                className={cn(
                                    "font-mono",
                                    isLast
                                        ? "text-primary font-bold"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </span>
                        )}

                        {!isLast && (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                    </div>
                )
            })}
        </nav>
    )
}
