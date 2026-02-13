"use client"

import Link from "next/link"
import { BrandSection } from "@/components/features/LoginPage/BrandSection"
import { LoginForm } from "@/components/features/LoginPage/LoginForm"
import { SocialLogin } from "@/components/features/LoginPage/SocialLogin"
import { ChevronLeft } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-background font-sans selection:bg-primary/30 selection:text-primary">
            {/* Left: Brand Section */}
            <BrandSection />

            {/* Right: Login Form */}
            <div className="flex items-center justify-center p-8 bg-background relative">
                {/* Back Button */}
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-mono">
                    <ChevronLeft className="w-4 h-4" />
                    RETURN_HOME
                </Link>

                <div className="mx-auto w-full max-w-[350px] space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-white font-space-grotesk">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to access the secure network.
                        </p>
                    </div>

                    <LoginForm />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-zinc-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <SocialLogin />

                    <p className="px-8 text-center text-xs text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}
