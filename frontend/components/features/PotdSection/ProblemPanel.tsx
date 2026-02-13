"use client"

import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Star, Share2 } from "lucide-react"

export function ProblemPanel() {
    return (
        <div className="h-full flex flex-col bg-card/30 backdrop-blur-sm border-r border-white/5 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/5">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold font-space-grotesk text-white">
                        1. Climbing Stairs
                    </h2>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/10">Easy</Badge>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <ThumbsUp className="w-4 h-4" /> 12.5K
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <ThumbsDown className="w-4 h-4" /> 234
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <Star className="w-4 h-4" /> Add to List
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors ml-auto">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                </div>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                <div className="prose prose-invert max-w-none">
                    <p>
                        You are climbing a staircase. It takes <code>n</code> steps to reach the top.
                    </p>
                    <p>
                        Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">Example 1</h3>
                        <div className="font-mono text-sm space-y-2">
                            <div><span className="text-blue-400">Input:</span> n = 2</div>
                            <div><span className="text-blue-400">Output:</span> 2</div>
                            <div><span className="text-blue-400">Explanation:</span> There are two ways to climb to the top.<br />1. 1 step + 1 step<br />2. 2 steps</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">Example 2</h3>
                        <div className="font-mono text-sm space-y-2">
                            <div><span className="text-blue-400">Input:</span> n = 3</div>
                            <div><span className="text-blue-400">Output:</span> 3</div>
                            <div><span className="text-blue-400">Explanation:</span> There are three ways to climb to the top.<br />1. 1 step + 1 step + 1 step<br />2. 1 step + 2 steps<br />3. 2 steps + 1 step</div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-xs text-muted-foreground">
                    <p>Constraints:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 font-mono">
                        <li>1 &lt;= n &lt;= 45</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
