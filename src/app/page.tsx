import { MobileNavigation } from "@/components/mobile-navigation"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import {
  HeroSection,
  JourneySection,
  SkillsSection,
  ProjectsSection,
  AILabSection,
  ConnectSection
} from "@/components/sections"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Skip to Content Link - for screen readers and keyboard users */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-lightning-gradient text-lightning-black px-4 py-2 rounded font-semibold"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-lightning-black/90 backdrop-blur-sm border-b border-lightning-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-lightning-gradient">
              Michael Jeff Achumbre
            </div>
            <div className="hidden md:flex items-center md:space-x-6 lg:space-x-8">
              <SmoothScrollLink href="#hero" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to home section">
                Home
              </SmoothScrollLink>
              <SmoothScrollLink href="#journey" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to journey section">
                Journey
              </SmoothScrollLink>
              <SmoothScrollLink href="#skills" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to skills section">
                Skills
              </SmoothScrollLink>
              <SmoothScrollLink href="#projects" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to projects section">
                Projects
              </SmoothScrollLink>
              <SmoothScrollLink href="#ai-lab" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to AI lab section">
                AI Lab
              </SmoothScrollLink>
              <SmoothScrollLink href="#connect" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to connect section">
                Connect
              </SmoothScrollLink>
            </div>
            <MobileNavigation />
          </div>
        </div>
      </nav>

      {/* Main Content - Lightning Portfolio 2.0 */}
      <HeroSection />
      <JourneySection />
      <SkillsSection />
      <ProjectsSection />
      <AILabSection />
      <ConnectSection />
    </main>
  )
}