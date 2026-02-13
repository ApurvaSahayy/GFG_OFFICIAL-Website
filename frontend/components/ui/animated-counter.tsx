"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
    end: number
    duration?: number
    suffix?: string
    className?: string
}

export function AnimatedCounter({
    end,
    duration = 2000,
    suffix = "",
    className = ""
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (!isInView || hasAnimated.current) return

        hasAnimated.current = true
        const startTime = Date.now()
        const endTime = startTime + duration

        const updateCount = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)

            // Easing function (easeOutExpo)
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

            setCount(Math.floor(eased * end))

            if (now < endTime) {
                requestAnimationFrame(updateCount)
            } else {
                setCount(end)
            }
        }

        requestAnimationFrame(updateCount)
    }, [isInView, end, duration])

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M"
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K"
        }
        return num.toString()
    }

    return (
        <span ref={ref} className={className}>
            {formatNumber(count)}{suffix}
        </span>
    )
}
