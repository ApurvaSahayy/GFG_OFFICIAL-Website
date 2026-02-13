"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
// import { createClient } from "@/utils/supabase/client" // Uncomment when real Auth needed

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    // const supabase = createClient()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        // Simulate Login Delay
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Identity Verified", { description: "Access Granted." })
            router.push("/")
        }, 1500)
    }

    return (
        <div className="grid gap-6">
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label className="text-zinc-400 font-mono text-xs uppercase" htmlFor="email">
                            Campus Email
                        </Label>
                        <div className="relative group">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-focus-within:h-full transition-all duration-300" />
                            <Input
                                id="email"
                                placeholder="name@gfg.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="pl-6 bg-black/40 border-white/10 focus:border-primary/50 text-white placeholder:text-zinc-600 font-mono"
                            />
                            <Mail className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-zinc-400 font-mono text-xs uppercase" htmlFor="password">
                            Access Key
                        </Label>
                        <div className="relative group">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-focus-within:h-full transition-all duration-300" />
                            <Input
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                disabled={isLoading}
                                className="pl-6 bg-black/40 border-white/10 focus:border-primary/50 text-white placeholder:text-zinc-600 font-mono"
                            />
                            <Lock className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500" />
                        </div>
                    </div>
                    <Button disabled={isLoading} className="mt-4 bg-primary text-black hover:bg-primary/90 font-bold tracking-wide">
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                INITIATE_SESSION <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
