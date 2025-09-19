"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InteractiveCaseStudy } from "@/components/interactive-case-study"
import { SectionLoading } from "@/components/loading-spinner"
import {
  FadeIn,
  SlideIn,
  HoverScale,
  Floating,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  GradientShine
} from "@/components/animated-elements"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-8xl">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-impact text-lightning-gradient mb-4">
              Built with Lightning Speed
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Real projects that demonstrate AI-enhanced development capabilities and intensive attention to detail
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Project: gracekimkor.com */}
        <ScrollReveal>
          <div className="mb-16 lg:mb-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-lightning-yellow mb-8 text-center">
              Featured Project: My First Client Success
            </h3>

            <Suspense fallback={<SectionLoading />}>
              <InteractiveCaseStudy />
            </Suspense>
          </div>
        </ScrollReveal>

        {/* Upcoming Project */}
        <ScrollReveal>
          <div className="mb-12 lg:mb-16">
            <StaggerContainer staggerDelay={0.3}>
              <StaggerItem>
                <GradientShine>
                  <Card className="bg-lightning-gradient/10 border-lightning-yellow hover:border-lightning-orange transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <Floating intensity={6} duration={3}>
                          <div className="text-3xl sm:text-4xl">🚧</div>
                        </Floating>
                        <div>
                          <CardTitle className="text-lightning-orange text-xl sm:text-2xl">
                            Currently Building: E-Commerce Platform
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            Advanced platform showcasing full-stack + mobile capabilities
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lightning-yellow font-semibold mb-3">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-lightning-gray text-lightning-yellow">
                              Next.js 15
                            </Badge>
                            <Badge variant="secondary" className="bg-lightning-gray text-lightning-yellow">
                              React Native
                            </Badge>
                            <Badge variant="secondary" className="bg-lightning-gray text-lightning-yellow">
                              TypeScript
                            </Badge>
                            <Badge variant="secondary" className="bg-lightning-gray text-lightning-yellow">
                              AI SDK
                            </Badge>
                            <Badge variant="secondary" className="bg-lightning-gray text-lightning-yellow">
                              Stripe
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lightning-yellow font-semibold mb-3">Key Features</h4>
                          <ul className="text-gray-300 space-y-1 text-sm">
                            <li>• Cross-platform mobile app</li>
                            <li>• AI-powered product recommendations</li>
                            <li>• Automated customer service</li>
                            <li>• Advanced payment integration</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-lightning-gray pt-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <p className="text-lightning-yellow font-semibold">Expected Completion: October 2025</p>
                            <p className="text-gray-400 text-sm">
                              Full-stack capability across web and mobile with cutting-edge AI integration
                            </p>
                          </div>
                          <Badge className="bg-lightning-orange text-lightning-black">
                            In Development
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </GradientShine>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </ScrollReveal>

        {/* Skills Demonstration */}
        <ScrollReveal>
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-lightning-yellow mb-6">
              What These Projects Prove
            </h3>

            <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <StaggerItem>
                <HoverScale scale={1.05}>
                  <Card className="bg-lightning-gray/30 border-lightning-gray hover:border-lightning-yellow/50 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl mb-2">⚡</div>
                      <h4 className="text-lightning-yellow font-semibold mb-2">AI-Enhanced Speed</h4>
                      <p className="text-gray-400 text-sm">
                        Complex projects built in record time using AI development tools
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </StaggerItem>

              <StaggerItem>
                <HoverScale scale={1.05}>
                  <Card className="bg-lightning-gray/30 border-lightning-gray hover:border-lightning-yellow/50 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl mb-2">🎯</div>
                      <h4 className="text-lightning-yellow font-semibold mb-2">Real-World Solutions</h4>
                      <p className="text-gray-400 text-sm">
                        Projects that solve actual business problems, not just portfolio pieces
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </StaggerItem>

              <StaggerItem>
                <HoverScale scale={1.05}>
                  <Card className="bg-lightning-gray/30 border-lightning-gray hover:border-lightning-yellow/50 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl mb-2">🚀</div>
                      <h4 className="text-lightning-yellow font-semibold mb-2">Continuous Growth</h4>
                      <p className="text-gray-400 text-sm">
                        Each project pushes boundaries and explores new technologies
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </StaggerItem>
            </StaggerContainer>

            <FadeIn delay={0.8}>
              <p className="text-gray-400 italic max-w-2xl mx-auto">
                "Every evening during my dedicated development sessions, I choose focused coding over relaxation. That dedication, that intensive learning approach -
                it all translates into demonstrating capabilities through real projects that showcase what modern AI-enhanced development can achieve."
              </p>
            </FadeIn>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}