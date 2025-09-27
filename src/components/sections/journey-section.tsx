"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileImage } from "@/components/profile-image"
import {
  InViewFadeIn,
  InViewSlideIn,
  InViewStaggerContainer,
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
              From Discovery to Implementation
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              My authentic journey from diverse experience to focused development capabilities
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {/* Profile Image */}
          <InViewSlideIn direction="left" delay={0.2}>
            <div className="lg:col-span-1 flex justify-center items-start lg:pt-12">
              <ProfileImage />
            </div>
          </InViewSlideIn>

          {/* Journey Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <InViewStaggerContainer staggerDelay={0.3}>
              <StaggerItem>
                <InViewFadeIn delay={0.4}>
                  <Card className="bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">The Foundation</CardTitle>
                      <CardDescription>Building problem-solving discipline through diverse experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        Eight years in customer service and various roles taught me something crucial: every challenge
                        comes down to understanding people and solving real problems. This foundation shaped my analytical
                        approach to development and user-focused problem-solving.
                      </p>
                    </CardContent>
                  </Card>
                </InViewFadeIn>
              </StaggerItem>

              <StaggerItem>
                <InViewFadeIn delay={0.6}>
                  <Card className="bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">Creative & Strategic Development</CardTitle>
                      <CardDescription>Building design thinking and client communication skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        Working with Adobe Creative Suite taught me design thinking and visual storytelling.
                        Client-facing roles refined my ability to translate complex requirements into actionable solutions.
                        These skills became the foundation for user-focused development.
                      </p>
                    </CardContent>
                  </Card>
                </InViewFadeIn>
              </StaggerItem>

              <StaggerItem>
                <InViewFadeIn delay={0.8}>
                  <Card className="bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">The Discovery (June 2025)</CardTitle>
                      <CardDescription>&ldquo;This is it!&rdquo; moment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        While exploring digital opportunities, I identified the strategic potential of modern development paradigms
                        and AI-enhanced workflows through comprehensive online resources. This recognition led to intensive focus on
                        mastering cutting-edge development approaches. Every available hour became dedicated to building production-ready capabilities through hands-on implementation.
                      </p>
                    </CardContent>
                  </Card>
                </InViewFadeIn>
              </StaggerItem>

              <StaggerItem>
                <InViewFadeIn delay={1.0}>
                  <Card className="bg-lightning-gray/50 border-lightning-gray hover:border-lightning-yellow/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">The Present</CardTitle>
                      <CardDescription>Transitioning to full-time development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        Currently delivering development solutions while working overseas, with proven client success through
                        gracekimkor.com. Every coding session leverages strategic AI-enhanced development tools and modern
                        platforms as intelligent collaborators that amplify productivity and code quality.
                      </p>
                    </CardContent>
                  </Card>
                </InViewFadeIn>
              </StaggerItem>

              <StaggerItem>
                <InViewFadeIn delay={1.2}>
                  <Card className="bg-lightning-gradient/10 border-lightning-yellow hover:border-lightning-yellow transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lightning-yellow text-xl sm:text-2xl">The Goal</CardTitle>
                      <CardDescription>Transition to full-time development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        My first client project, gracekimkor.com, proved what&apos;s possible with focused development sessions
                        and strategic AI leverage. This successful delivery demonstrated the effectiveness of modern
                        development approaches. The goal is clear: transition to full-time software development through
                        proven capabilities and expanding project portfolio.
                      </p>
                    </CardContent>
                  </Card>
                </InViewFadeIn>
              </StaggerItem>
            </InViewStaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}