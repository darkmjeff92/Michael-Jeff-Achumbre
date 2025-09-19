"use client"

import { Suspense, lazy } from "react"
import { Button } from "@/components/ui/button"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import {
  FadeIn,
  SlideIn,
  LightningPulse,
  HoverScale,
  Floating,
  StaggerContainer,
  StaggerItem,
  GradientShine,
  Typewriter
} from "@/components/animated-elements"

// Dynamic import for background animation
const LightningGrid = lazy(() => import("@/components/backgrounds/lightning-grid").then(module => ({ default: module.LightningGrid })))

export function HeroSection() {
  return (
    <section id="hero" className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-hidden">
      {/* Background Animation */}
      <Suspense fallback={<div className="absolute inset-0 bg-lightning-black/50" />}>
        <LightningGrid intensity="medium" />
      </Suspense>

      <div className="relative z-10 container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-8xl">
        <div className="text-center space-y-6 sm:space-y-8 lg:space-y-10 2xl:space-y-12">
          <SlideIn direction="up" delay={0.2} duration={1.2}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-impact text-lightning-gradient leading-tight">
              <Typewriter text="AI-Powered Developer" speed={30} />
            </h1>
          </SlideIn>

          <FadeIn delay={0.6} duration={0.8}>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto text-gray-300 leading-relaxed">
              Building modern web applications, mobile solutions, and AI automations using cutting-edge development tools and intelligent workflows.
              Turning complex problems into elegant digital solutions.
            </p>
          </FadeIn>

          <FadeIn delay={0.8} duration={0.8}>
            <p className="text-sm sm:text-base md:text-lg text-lightning-yellow font-medium max-w-3xl mx-auto">
              Leveraging AI as a strategic advantage to accelerate development and deliver high-quality solutions efficiently.
            </p>
          </FadeIn>

          {/* Supporting Points */}
          <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 lg:mt-16 2xl:mt-20">
            <StaggerItem>
              <HoverScale scale={1.05} className="text-center space-y-2 sm:space-y-3 p-4 sm:p-6 lg:p-8 rounded-lg">
                <Floating intensity={8} duration={3}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">⚡</div>
                </Floating>
                <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-lightning-yellow">Modern Stack</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-400 leading-tight">Next.js 15, React 19, TypeScript, AI SDK</p>
              </HoverScale>
            </StaggerItem>

            <StaggerItem>
              <HoverScale scale={1.05} className="text-center space-y-2 sm:space-y-3 p-4 sm:p-6 lg:p-8 rounded-lg">
                <Floating intensity={8} duration={3.5}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">🤖</div>
                </Floating>
                <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-lightning-yellow">AI-Powered</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-400 leading-tight">AI-enhanced workflows with modern development platforms</p>
              </HoverScale>
            </StaggerItem>

            <StaggerItem>
              <HoverScale scale={1.05} className="text-center space-y-2 sm:space-y-3 p-4 sm:p-6 lg:p-8 rounded-lg">
                <Floating intensity={8} duration={4}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">🎯</div>
                </Floating>
                <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-lightning-yellow">Problem Solver</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-400 leading-tight">Transferring problem-solving skills to development</p>
              </HoverScale>
            </StaggerItem>

            <StaggerItem>
              <HoverScale scale={1.05} className="text-center space-y-2 sm:space-y-3 p-4 sm:p-6 lg:p-8 rounded-lg">
                <Floating intensity={8} duration={4.5}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">🚀</div>
                </Floating>
                <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-lightning-yellow">Continuous Growth</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-400 leading-tight">Intensive focus on mastering cutting-edge technologies</p>
              </HoverScale>
            </StaggerItem>
          </StaggerContainer>

          {/* CTA Buttons */}
          <FadeIn delay={1.2} duration={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-12 lg:mt-16 2xl:mt-20">
              <LightningPulse>
                <HoverScale scale={1.05}>
                  <GradientShine>
                    <SmoothScrollLink href="#projects">
                      <Button
                        size="lg"
                        className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90 transition-opacity"
                      >
                        Explore My Projects
                      </Button>
                    </SmoothScrollLink>
                  </GradientShine>
                </HoverScale>
              </LightningPulse>
              <HoverScale scale={1.03}>
                <SmoothScrollLink href="#ai-lab">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-lightning-gray text-lightning-white hover:bg-lightning-gray transition-all duration-300"
                  >
                    Try My AI Lab
                  </Button>
                </SmoothScrollLink>
              </HoverScale>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}