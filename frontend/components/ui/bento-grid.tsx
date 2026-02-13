"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BentoGridProps {
    children: React.ReactNode
    className?: string
}

interface BentoCardProps {
    title?: string
    description?: string
    icon?: React.ReactNode
    graphic?: React.ReactNode
    className?: string
    children?: React.ReactNode
    span?: "1x1" | "2x1" | "1x2" | "2x2"
    href?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]",
            className
        )}>
            {children}
        </div>
    )
}

export function BentoCard({
    title,
    description,
    icon,
    graphic,
    className,
    children,
    span = "1x1",
    href
}: BentoCardProps) {
    const spanClasses = {
        "1x1": "col-span-1 row-span-1",
        "2x1": "col-span-1 md:col-span-2 row-span-1",
        "1x2": "col-span-1 row-span-2",
        "2x2": "col-span-1 md:col-span-2 row-span-2"
    }

    const content = (
        <>
            {graphic && (
                <div className="absolute inset-0 z-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100">
                    {graphic}
                </div>
            )}

            {icon && (
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity z-20">
                    {icon}
                </div>
            )}

            <div className="relative z-10 h-full flex flex-col">
                {title && (
                    <h3 className="text-xl md:text-2xl font-bold font-space-grotesk mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {description}
                    </p>
                )}
                {children && (
                    <div className="flex-1 mt-auto">
                        {children}
                    </div>
                )}
            </div>

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-0" />
        </>
    )

    const Wrapper = href ? motion.a : motion.div

    return (
        <Wrapper
            href={href}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotateZ: 0.5 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "group relative glass-card p-6 rounded-xl overflow-hidden cursor-pointer",
                "border border-white/5 hover:border-primary/30 transition-all duration-300",
                spanClasses[span],
                className
            )}
        >
            {content}
        </Wrapper>
    )
}
