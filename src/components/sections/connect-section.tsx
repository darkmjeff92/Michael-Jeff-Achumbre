"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FadeIn,
  HoverScale,
  ScrollReveal,
  GradientShine,
  StaggerContainer,
  StaggerItem
} from "@/components/animated-elements"

export function ConnectSection() {
  const techStack = [
    { name: "Next.js 15", category: "Frontend" },
    { name: "React 19", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "AI SDK v5", category: "AI" },
    { name: "Claude Code", category: "AI Tools" },
    { name: "Cursor IDE", category: "AI Tools" },
    { name: "Vercel", category: "Deployment" }
  ]

  return (
    <section id="connect" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-8xl">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-impact text-lightning-gradient mb-4">
              Get in Touch
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Interested in the technical details? Want to discuss AI development?
              Feel free to reach out - I'd love to share insights about my journey and the tech behind this portfolio.
            </p>
          </div>
        </ScrollReveal>

        {/* Tech Stack Showcase */}
        <ScrollReveal>
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-lightning-yellow mb-8 text-center">
              🛠️ Built With AI-Enhanced Development
            </h3>

            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {techStack.map((tech, index) => (
                <StaggerItem key={index}>
                  <HoverScale scale={1.05}>
                    <Card className="bg-lightning-gray/30 border-lightning-gray hover:border-lightning-yellow/50 transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <div className="text-sm font-semibold text-lightning-yellow mb-1">
                          {tech.name}
                        </div>
                        <Badge variant="outline" className="text-xs border-lightning-gray text-gray-400">
                          {tech.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  </HoverScale>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ScrollReveal>

        {/* Contact Information */}
        <ScrollReveal>
          <div className="mb-12">
            <GradientShine>
              <Card className="bg-lightning-gradient/10 border-lightning-yellow">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow text-xl sm:text-2xl text-center">
                    📧 Connect With Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        <strong>Email:</strong> <span className="text-lightning-yellow">michaeljeffachumbre@gmail.com</span>
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <Badge variant="outline" className="border-lightning-yellow text-lightning-yellow">
                          LinkedIn: /in/trixtazzz
                        </Badge>
                        <Badge variant="outline" className="border-lightning-yellow text-lightning-yellow">
                          GitHub: Coming Soon
                        </Badge>
                        <Badge variant="outline" className="border-lightning-yellow text-lightning-yellow">
                          Portfolio: Built with ❤️ and AI
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-lightning-gray">
                      <p className="text-gray-400 text-sm">
                        This portfolio showcases AI-enhanced development workflows and modern web technologies.
                        Every component demonstrates practical AI integration in real-world development.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GradientShine>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}