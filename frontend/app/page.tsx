import { NavbarV2 } from "@/components/layout/NavbarV2"
import { Footer } from "@/components/layout/Footer"

import { HeroSectionV2 } from "@/components/features/HeroSectionV2"
import { AboutSection } from "@/components/features/AboutSection"
import { TracksSection } from "@/components/features/TracksSection"
import { ProjectGallery } from "@/components/features/ProjectGallery"
import { EventsSection } from "@/components/features/EventsSection"
import { PastEventsSection } from "@/components/features/PastEventsSection"
import { TeamSection } from "@/components/features/TeamSection"
import { WelcomeSplash } from "@/components/features/WelcomeSplash"
import { InstallCTA } from "@/components/features/InstallCTA"
import { NetworkBackground } from "@/components/ui/network-background"
import { StatsSection } from "@/components/features/StatsSection"
import { MarqueeSection } from "@/components/features/MarqueeSection"
import { FAQSection } from "@/components/features/FAQSection"
import { EvolutionTimeline } from "@/components/features/EvolutionTimeline"
import { BentoSection } from "@/components/features/BentoSection"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Global Background Systems */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NetworkBackground />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,black)] opacity-80" />
      </div>

      <div className="relative z-10 flex flex-col">
        <WelcomeSplash />
        <NavbarV2 />

        <HeroSectionV2 />

        <MarqueeSection />

        <AboutSection />

        <StatsSection />

        <BentoSection />

        <TracksSection />

        <EvolutionTimeline />

        <ProjectGallery />

        <EventsSection />

        <TeamSection />

        <InstallCTA />

        <FAQSection />

        <Footer />
      </div>
    </div>
  )
}

