"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileImage } from "@/components/profile-image"
import {
  FadeIn,
  SlideIn,
  HoverScale,
  Floating,
  StaggerContainer,
  StaggerItem,
  ScrollReveal
} from "@/components/animated-elements"

export function JourneySection() {
  return (
    <section id="journey" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-8xl">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-impact text-lightning-gradient mb-4">
              From Discovery to Obsession
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              My authentic journey from diverse experience to focused development expertise
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {/* Profile Image */}
          <SlideIn direction="left" delay={0.2}>
            <div className="lg:col-span-1 flex justify-center items-start lg:pt-12">
              <ProfileImage />
            </div>
          </SlideIn>

          {/* Journey Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <StaggerContainer staggerDelay={0.3}>
              <StaggerItem>
                <FadeIn delay={0.4}>
                  <Card className="bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">The Foundation</CardTitle>
                      <CardDescription>Building problem-solving discipline through diverse experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        Eight years in customer service and various roles taught me something crucial: every challenge
                        comes down to understanding people and solving real problems. This foundation, combined with early
                        tech studies, shaped my analytical approach to development.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              </StaggerItem>

              <StaggerItem>
                <FadeIn delay={0.6}>
                  <Card className="bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">Creative & Strategic Development</CardTitle>
                      <CardDescription>Mastering design thinking and client communication</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        Developing expertise in Adobe Creative Suite taught me design thinking and visual storytelling.
                        Client-facing roles refined my ability to translate complex requirements into actionable solutions.
                        These skills became the foundation for user-focused development.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              </StaggerItem>

              <StaggerItem>
                <FadeIn delay={0.8}>
                  <Card className="bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">The Discovery (June 2025)</CardTitle>
                      <CardDescription>"This is it!" moment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        While exploring digital opportunities, I discovered modern development paradigms through comprehensive
                        online learning resources. That moment of realization sparked an intensive focus on mastering AI-enhanced
                        development workflows. Every available hour became dedicated to strategic skill advancement.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              </StaggerItem>

              <StaggerItem>
                <FadeIn delay={1.0}>
                  <Card className="bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">The Present</CardTitle>
                      <CardDescription>Transitioning to full-time development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        Currently advancing development capabilities while working overseas. Every coding session is optimized
                        through strategic use of AI-enhanced development tools and modern platforms, treating them as
                        intelligent collaborators that amplify productivity and code quality.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              </StaggerItem>

              <StaggerItem>
                <FadeIn delay={1.2}>
                  <Card className="bg-lightning-gradient/10 border-lightning-yellow hover:border-lightning-yellow transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">The Goal</CardTitle>
                      <CardDescription>Transition to full-time development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        My first client project, gracekimkor.com, proved what's possible with focused development sessions
                        and strategic AI leverage. This successful delivery demonstrated the effectiveness of modern
                        development approaches. The goal is clear: transition to full-time software development through
                        proven capabilities and expanding project portfolio.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}