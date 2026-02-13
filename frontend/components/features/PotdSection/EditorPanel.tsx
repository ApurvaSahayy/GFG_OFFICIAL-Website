"use client"

import { Play, RotateCcw, Box, Settings } from "lucide-react"

export function EditorPanel() {
    return (
        <div className="h-full flex flex-col bg-card/30 backdrop-blur-sm">
            {/* Toolbar */}
            <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-black/20">
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-blue-400 flex items-center gap-2 cursor-pointer hover:bg-white/10">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Python
                    </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                    <button className="p-2 hover:bg-white/5 rounded transition-colors"><Settings className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-white/5 rounded transition-colors"><RotateCcw className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 relative font-mono text-sm">
                <div className="absolute inset-0 p-4 overflow-y-auto custom-scrollbar">
                    {/* Line Numbers + Code Simulation */}
                    <div className="flex gap-4">
                        <div className="flex flex-col text-right select-none text-muted-foreground/30">
                            {Array.from({ length: 15 }).map((_, i) => (
                                <span key={i} className="leading-6">{i + 1}</span>
                            ))}
                        </div>
                        <div className="flex-1 leading-6">
                            <p><span className="text-purple-400">class</span> <span className="text-yellow-300">Solution</span>:</p>
                            <p className="pl-4">
                                <span className="text-purple-400">def</span> <span className="text-blue-400">climbStairs</span>(self, n: <span className="text-green-400">int</span>) -&gt; <span className="text-green-400">int</span>:
                            </p>
                            <p className="pl-8 text-zinc-500"># Write your code here</p>
                            <p className="pl-8"><span className="text-purple-400">if</span> n &lt;= 2: <span className="text-purple-400">return</span> n</p>
                            <p className="pl-8">&nbsp;</p>
                            <p className="pl-8">prev1, prev2 = 1, 2</p>
                            <p className="pl-8"><span className="text-purple-400">for</span> _ <span className="text-purple-400">in</span> <span className="text-yellow-300">range</span>(3, n + 1):</p>
                            <p className="pl-12">current = prev1 + prev2</p>
                            <p className="pl-12">prev1 = prev2</p>
                            <p className="pl-12">prev2 = current</p>
                            <p className="pl-8">&nbsp;</p>
                            <p className="pl-8"><span className="text-purple-400">return</span> prev2</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Actions */}
            <div className="h-14 border-t border-white/5 flex items-center justify-between px-4 bg-black/20">
                <button className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-white transition-colors">
                    <Box className="w-4 h-4" /> Console
                </button>
                <div className="flex gap-3">
                    <button className="px-4 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all">
                        Run Code
                    </button>
                    <button className="px-4 py-1.5 rounded bg-primary text-black text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                        <Play className="w-3 h-3 fill-black" /> Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
