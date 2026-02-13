import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/ui/page-transition";
import { CommandPalette } from "@/components/ui/command-palette";
import { MouseFollower } from "@/components/ui/mouse-follower";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

// Quantum-Digital Typography
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GFG Student Chapter | ITER",
    template: "%s | GFG SC ITER"
  },
  description: "The official GeeksforGeeks Student Chapter at ITER. Join a community of developers, master DSA, and build the future.",
  keywords: ["GFG", "ITER", "Student Chapter", "Coding", "DSA", "Web Development", "Community"],
  openGraph: {
    title: "GFG Student Chapter | ITER",
    description: "Join the premier student developer community at ITER. Master DSA, crack interviews, and ship open-source projects.",
    url: "https://gfg-iter.vercel.app",
    siteName: "GFG Student Chapter ITER",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GFG Student Chapter ITER"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/gfg-official-logo.png",
    shortcut: "/gfg-official-logo.png",
    apple: "/gfg-official-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans selection:bg-green-500/30 selection:text-green-200`}
      >
        <SmoothScroll />
        <MouseFollower />
        <ScrollProgress />
        <NoiseOverlay />
        <CommandPalette />
        <PageTransition>{children}</PageTransition>
        <Toaster />
      </body>
    </html>
  );
}
