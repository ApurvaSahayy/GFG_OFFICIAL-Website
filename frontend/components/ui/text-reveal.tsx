"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
    staggerDelay?: number
    variant?: "fade" | "blur" | "slide"
}

export function TextReveal({
    text,
    className,
    delay = 0,
    staggerDelay = 0.03,
    variant = "blur"
}: TextRevealProps) {
    const words = text.split(" ")

    const variants = {
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        blur: {
            hidden: { opacity: 0, filter: "blur(10px)" },
            visible: { opacity: 1, filter: "blur(0px)" }
        },
        slide: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }
    }

    return (
        <span className={cn("inline-block", className)}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * staggerDelay,
                        ease: "easeOut"
                    }}
                    variants={variants[variant]}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    )
}
