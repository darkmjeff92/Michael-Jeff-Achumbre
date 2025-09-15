'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FadeIn, SlideIn, LightningPulse, GradientShine, ScrollReveal } from "@/components/animated-elements"

// Mock data for demonstration purposes
const mockAnalytics = {
  totalVisitors: 2847,
  activeVisitors: 12,
  topPages: [
    { page: 'Services', views: 892, percentage: 31 },
    { page: 'Case Study', views: 654, percentage: 23 },
    { page: 'About', views: 521, percentage: 18 },
    { page: 'Contact', views: 401, percentage: 14 },
    { page: 'AI Showcase', views: 379, percentage: 13 }
  ],
  visitorInsights: [
    { type: 'Small Business', count: 1247, percentage: 44 },
    { type: 'Tech Startup', count: 854, percentage: 30 },
    { type: 'Consulting Firm', count: 512, percentage: 18 },
    { type: 'Other', count: 234, percentage: 8 }
  ],
  commonQuestions: [
    'How does AI-powered development work?',
    'What are your evening hours availability?',
    'Can you show examples of automation projects?',
    'How do you handle Korean timezone coordination?'
  ]
}

// const timezoneData = {
//   korean: { time: '2:30 PM', date: 'Sep 15, 2025', available: true },
//   eastern: { time: '1:30 AM', date: 'Sep 15, 2025', available: false },
//   pacific: { time: '10:30 PM', date: 'Sep 14, 2025', available: false },
//   gmt: { time: '5:30 AM', date: 'Sep 15, 2025', available: false }
// }

const workflowSteps = [
  {
    step: 1,
    title: 'AI Project Analysis',
    description: 'Automated requirement analysis and complexity assessment',
    duration: '5 minutes',
    automated: true
  },
  {
    step: 2,
    title: 'Smart Proposal Generation',
    description: 'AI-generated personalized project proposal with timeline',
    duration: '10 minutes',
    automated: true
  },
  {
    step: 3,
    title: 'Contract & Planning',
    description: 'Automated contract generation and project planning setup',
    duration: '30 minutes',
    automated: true
  },
  {
    step: 4,
    title: 'Development Kickoff',
    description: 'AI-assisted project setup and initial development environment',
    duration: '2 hours',
    automated: false
  }
]

export function AIShowcaseSection() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeDemo, setActiveDemo] = useState<'analytics' | 'scheduling' | 'workflow'>('analytics')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatKoreanTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Seoul',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date)
  }

  const isWorkingHours = () => {
    const koreanHour = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Seoul',
      hour: 'numeric',
      hour12: false
    })
    const hour = parseInt(koreanHour)
    return hour >= 21 || hour <= 1 // 9 PM to 1 AM Korean time
  }

  return (
    <section id="ai-showcase" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-lightning-gradient mb-4">
              AI Technology Showcase
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Experience the AI-powered systems that make development more efficient and business more intelligent
            </p>
          </div>
        </ScrollReveal>

        {/* Demo Navigation */}
        <ScrollReveal threshold={0.2}>
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 p-2 bg-lightning-dark rounded-lg border border-lightning-gray">
              {[
                { id: 'analytics', label: '📊 Live Analytics', desc: 'Real-time insights' },
                { id: 'scheduling', label: '🌏 Smart Scheduling', desc: 'Timezone coordination' },
                { id: 'workflow', label: '⚙️ Automation', desc: 'Client onboarding' }
              ].map((demo) => (
                <Button
                  key={demo.id}
                  variant={activeDemo === demo.id ? 'default' : 'ghost'}
                  onClick={() => setActiveDemo(demo.id as 'analytics' | 'scheduling' | 'workflow')}
                  className={`flex flex-col items-center p-4 h-auto ${
                    activeDemo === demo.id
                      ? 'bg-lightning-gradient text-lightning-black'
                      : 'hover:bg-lightning-gray'
                  }`}
                >
                  <span className="font-medium text-sm">{demo.label}</span>
                  <span className="text-xs opacity-80">{demo.desc}</span>
                </Button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Analytics Demo */}
        {activeDemo === 'analytics' && (
          <SlideIn direction="up" delay={0.1}>
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-lightning-dark via-lightning-gray to-lightning-dark border-lightning-yellow/50">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow flex items-center gap-2">
                    <span>📊</span> Live Portfolio Analytics
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      Live Data
                    </Badge>
                    <Badge className="bg-lightning-yellow/20 text-lightning-yellow border-lightning-yellow/30">
                      Updated: {formatKoreanTime(currentTime)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Visitor Stats */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lightning-orange">Visitor Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Total Visitors</span>
                          <span className="text-lightning-yellow font-semibold">{mockAnalytics.totalVisitors.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Active Now</span>
                          <span className="text-green-400 font-semibold">{mockAnalytics.activeVisitors}</span>
                        </div>
                      </div>
                    </div>

                    {/* Popular Pages */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lightning-orange">Popular Sections</h4>
                      <div className="space-y-2">
                        {mockAnalytics.topPages.map((page, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{page.page}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-lightning-gray rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-lightning-yellow rounded-full transition-all duration-1000"
                                  style={{ width: `${page.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-400">{page.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Visitor Types */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lightning-orange">Visitor Types</h4>
                      <div className="space-y-2">
                        {mockAnalytics.visitorInsights.map((insight, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm">{insight.type}</span>
                            <Badge variant="outline" className="text-xs border-lightning-gray">
                              {insight.percentage}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-lightning-gray">
                    <h4 className="font-semibold text-lightning-orange mb-3">AI Insights from Visitor Data</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-sm text-gray-300">
                          <strong className="text-blue-400">Trend:</strong> 44% of visitors are from small businesses,
                          indicating strong SMB market alignment.
                        </p>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <p className="text-sm text-gray-300">
                          <strong className="text-green-400">Opportunity:</strong> Services section has highest engagement,
                          suggesting visitors are actively evaluating offerings.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SlideIn>
        )}

        {/* Scheduling Demo */}
        {activeDemo === 'scheduling' && (
          <SlideIn direction="up" delay={0.1}>
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-lightning-dark via-lightning-gray to-lightning-dark border-lightning-orange/50">
                <CardHeader>
                  <CardTitle className="text-lightning-orange flex items-center gap-2">
                    <span>🌏</span> Smart Timezone Coordination
                  </CardTitle>
                  <p className="text-gray-300 text-sm">
                    AI-powered scheduling system that coordinates Korean factory work schedule with global clients
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Times */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lightning-yellow">Current Times</h4>
                      <div className="space-y-3">
                        {[
                          { zone: 'Korea (Seoul)', time: formatKoreanTime(currentTime), available: isWorkingHours() },
                          { zone: 'US Eastern', time: currentTime.toLocaleString('en-US', { timeZone: 'America/New_York', timeStyle: 'short' }), available: false },
                          { zone: 'US Pacific', time: currentTime.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', timeStyle: 'short' }), available: false },
                          { zone: 'GMT', time: currentTime.toLocaleString('en-US', { timeZone: 'GMT', timeStyle: 'short' }), available: false }
                        ].map((zone, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-lightning-gray/30 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-200">{zone.zone}</p>
                              <p className="text-sm text-gray-400">{zone.time}</p>
                            </div>
                            <Badge className={zone.available ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}>
                              {zone.available ? 'Available' : 'Sleeping/Working'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lightning-yellow">Optimal Meeting Times</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                          <h5 className="font-medium text-green-400 mb-2">Best for US Clients</h5>
                          <p className="text-sm text-gray-300">
                            Korean evenings (9 PM - 1 AM) = US mornings (8 AM - 12 PM EST)
                          </p>
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <h5 className="font-medium text-blue-400 mb-2">Weekend Availability</h5>
                          <p className="text-sm text-gray-300">
                            Sundays: Full day available<br/>
                            Saturdays: Usually available (factory schedule permitting)
                          </p>
                        </div>
                        <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                          <h5 className="font-medium text-orange-400 mb-2">Quick Responses</h5>
                          <p className="text-sm text-gray-300">
                            Work break responses: 12 PM - 1 PM Korean Time
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-lightning-gray text-center">
                    <p className="text-gray-400 text-sm mb-4">
                      AI automatically suggests optimal meeting times based on timezone analysis and work schedule
                    </p>
                    <LightningPulse>
                      <Button className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90">
                        Schedule a Call
                      </Button>
                    </LightningPulse>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SlideIn>
        )}

        {/* Workflow Demo */}
        {activeDemo === 'workflow' && (
          <SlideIn direction="up" delay={0.1}>
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-lightning-dark via-lightning-gray to-lightning-dark border-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <span>⚙️</span> Automated Client Onboarding
                  </CardTitle>
                  <p className="text-gray-300 text-sm">
                    AI-powered workflow that handles initial project setup while maintaining personal touch
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflowSteps.map((step, index) => (
                      <FadeIn key={index} delay={index * 0.1}>
                        <div className="flex items-center gap-4 p-4 bg-lightning-gray/30 rounded-lg">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                            step.automated
                              ? 'bg-lightning-gradient text-lightning-black'
                              : 'bg-gray-600 text-gray-200'
                          }`}>
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-medium text-gray-200">{step.title}</h4>
                              <Badge className={step.automated
                                ? 'bg-lightning-yellow/20 text-lightning-yellow border-lightning-yellow/30'
                                : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                              }>
                                {step.automated ? '🤖 Automated' : '👨‍💻 Manual'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400">{step.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-lightning-yellow">{step.duration}</p>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-lightning-gray">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">75%</p>
                        <p className="text-sm text-gray-400">Time Savings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-lightning-yellow">45min</p>
                        <p className="text-sm text-gray-400">Setup Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400">24/7</p>
                        <p className="text-sm text-gray-400">Availability</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <h5 className="font-medium text-purple-400 mb-2">How This Benefits You:</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Instant project analysis and proposal generation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Automated contract creation with your requirements
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Project kickoff happens faster, even during my factory hours
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Higher quality initial setup with AI assistance
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SlideIn>
        )}

        {/* Call to Action */}
        <ScrollReveal threshold={0.3}>
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-lightning-dark to-lightning-gray border-lightning-yellow/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-lightning-gradient mb-4">
                  Experience AI-Powered Development
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  These AI systems aren&apos;t just for show - they&apos;re the same tools and processes I use to deliver
                  faster, more efficient development for every client project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <LightningPulse>
                    <GradientShine>
                      <Button
                        asChild
                        size="lg"
                        className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
                      >
                        <a href="#contact">Start Your AI-Powered Project</a>
                      </Button>
                    </GradientShine>
                  </LightningPulse>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      // Cycle through demos
                      const demos = ['analytics', 'scheduling', 'workflow'] as const
                      const currentIndex = demos.indexOf(activeDemo)
                      const nextIndex = (currentIndex + 1) % demos.length
                      setActiveDemo(demos[nextIndex])
                    }}
                    className="border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow"
                  >
                    Explore More Demos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}