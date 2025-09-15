import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { portfolioContent } from "@/lib/portfolio-content"
import { MobileNavigation } from "@/components/mobile-navigation"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { AIEnhancedContactForm } from "@/components/ai-enhanced-contact-form"
import { InteractiveCaseStudy } from "@/components/interactive-case-study"
import { SmartServiceRecommendations } from "@/components/smart-service-recommendations"
import { ProjectComplexityAnalyzer } from "@/components/project-complexity-analyzer"
import { SimpleAIChat } from "@/components/simple-ai-chat"
import { AIShowcaseSection } from "@/components/ai-showcase-section"
import { SectionLoading } from "@/components/loading-spinner"
import { ProfileImage } from "@/components/profile-image"
import {
  FadeIn,
  SlideIn,
  LightningPulse,
  HoverScale,
  Floating,
  StaggerContainer,
  StaggerItem,
  GradientShine,
  Typewriter,
  ScrollReveal
} from "@/components/animated-elements"

export default function Home() {
  const { hero, about, services, caseStudy, contact } = portfolioContent

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
        <div className="container mx-auto fold:px-3 xs:px-4 px-6 tablet:px-8 tablet-lg:px-12 ultra:px-16 fold:py-2 xs:py-3 py-4">
          <div className="flex items-center justify-between">
            <div className="fold:text-base xs:text-lg text-xl tablet:text-2xl font-bold text-lightning-gradient">
              Michael Jeff Achumbre
            </div>
            <div className="hidden tablet:flex items-center tablet:space-x-6 lg:space-x-8">
              <SmoothScrollLink href="#hero" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to home section">
                Home
              </SmoothScrollLink>
              <SmoothScrollLink href="#about" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to about section">
                About
              </SmoothScrollLink>
              <SmoothScrollLink href="#services" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to services section">
                Services
              </SmoothScrollLink>
              <SmoothScrollLink href="#case-study" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to case study section">
                Case Study
              </SmoothScrollLink>
              <SmoothScrollLink href="#ai-showcase" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to AI showcase section">
                AI Showcase
              </SmoothScrollLink>
              <SmoothScrollLink href="#contact" className="text-sm hover:text-lightning-yellow transition-colors" aria-label="Navigate to contact section">
                Contact
              </SmoothScrollLink>
            </div>
            <MobileNavigation />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="fold:pt-16 xs:pt-18 pt-20 fold:pb-8 xs:pb-10 pb-12 fold:px-3 xs:px-4 px-6 tablet:px-8 tablet-lg:px-12 ultra:px-16">
        <div className="container mx-auto max-w-6xl tablet-lg:max-w-7xl ultra:max-w-8xl">
          <div className="text-center fold:space-y-4 xs:space-y-6 space-y-8 tablet:space-y-10 ultra:space-y-12">
            <SlideIn direction="up" delay={0.2} duration={1.2}>
              <h1 className="fold:text-lg fold:leading-tight xs:text-xl xs:leading-snug sm:text-2xl text-4xl md:text-5xl tablet:text-6xl lg:text-7xl tablet-lg:text-8xl ultra:text-9xl font-black text-impact text-lightning-gradient">
                <Typewriter text={hero.mainHeadline} speed={30} />
              </h1>
            </SlideIn>

            <FadeIn delay={0.6} duration={0.8}>
              <p className="fold:text-sm xs:text-base text-lg md:text-xl tablet:text-xl tablet-lg:text-2xl ultra:text-3xl max-w-4xl tablet-lg:max-w-5xl ultra:max-w-6xl mx-auto text-gray-300 leading-relaxed">
                {hero.subheadline}
              </p>
            </FadeIn>

            {/* Supporting Points */}
            <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 tablet:grid-cols-3 tablet-lg:grid-cols-4 fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8 fold:mt-6 xs:mt-8 mt-12 tablet:mt-16 ultra:mt-20">
              {hero.supportingPoints.map((point, index) => (
                <StaggerItem key={index}>
                  <HoverScale scale={1.05} className="text-center fold:space-y-1 xs:space-y-2 space-y-2 tablet:space-y-3 ultra:space-y-4 fold:p-2 xs:p-3 p-4 tablet:p-6 ultra:p-8 rounded-lg">
                    <Floating intensity={8} duration={3 + index * 0.5}>
                      <div className="fold:text-xl xs:text-2xl text-3xl tablet:text-4xl ultra:text-5xl">{point.icon}</div>
                    </Floating>
                    <h3 className="fold:text-sm xs:text-base font-semibold text-lightning-yellow tablet:text-lg ultra:text-xl">{point.title}</h3>
                    <p className="fold:text-xs xs:text-sm text-sm tablet:text-base ultra:text-lg text-gray-400">{point.description}</p>
                  </HoverScale>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* CTA Buttons */}
            <FadeIn delay={1.2} duration={0.6}>
              <div className="flex flex-col sm:flex-row tablet:flex-row fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8 justify-center fold:mt-6 xs:mt-8 mt-12 tablet:mt-16 ultra:mt-20">
                <LightningPulse>
                  <HoverScale scale={1.05}>
                    <GradientShine>
                      <Button
                        size="lg"
                        className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90 transition-opacity"
                      >
                        {hero.primaryCTA}
                      </Button>
                    </GradientShine>
                  </HoverScale>
                </LightningPulse>
                <HoverScale scale={1.03}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-lightning-gray text-lightning-white hover:bg-lightning-gray transition-all duration-300"
                  >
                    {hero.secondaryCTA}
                  </Button>
                </HoverScale>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Separator className="bg-lightning-gray" />

      {/* About Section */}
      <section id="about" className="fold:py-12 xs:py-16 py-20 tablet:py-24 ultra:py-32 fold:px-2 xs:px-3 px-4 tablet:px-6 tablet-lg:px-8 ultra:px-16">
        <div className="container mx-auto max-w-4xl tablet-lg:max-w-5xl ultra:max-w-6xl">
          <ScrollReveal>
            <div className="text-center fold:mb-6 xs:mb-8 mb-12 tablet:mb-16 ultra:mb-20">
              <h2 className="fold:text-xl xs:text-2xl text-3xl md:text-4xl tablet:text-5xl tablet-lg:text-6xl ultra:text-7xl font-bold text-lightning-gradient fold:mb-2 xs:mb-3 mb-4 tablet:mb-6 ultra:mb-8">
                About Me
              </h2>
              <p className="fold:text-xs xs:text-sm text-base tablet:text-lg ultra:text-xl text-gray-400">Professional AI Developer & Automation Builder</p>
            </div>
          </ScrollReveal>

          {/* Profile Image */}
          <ScrollReveal threshold={0.3}>
            <div className="fold:mb-6 xs:mb-8 mb-12 tablet:mb-16 ultra:mb-20">
              <ProfileImage />
            </div>
          </ScrollReveal>

          <ScrollReveal threshold={0.2}>
            <div className="fold:space-y-4 xs:space-y-6 space-y-8 tablet:space-y-10 ultra:space-y-12 fold:text-sm xs:text-base text-lg tablet:text-xl ultra:text-2xl text-gray-300 leading-relaxed">
              <FadeIn delay={0.2}>
                <p>{about.story}</p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p>{about.mission}</p>
              </FadeIn>
            </div>
          </ScrollReveal>

          {/* Current Availability */}
          <ScrollReveal threshold={0.3}>
            <HoverScale scale={1.01}>
              <Card className="mt-12 bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow">Current Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Weekdays:</strong> {about.currentAvailability.weekdays}</div>
                  <div><strong>Weekends:</strong> {about.currentAvailability.weekends}</div>
                  <div><strong>Communication:</strong> {about.currentAvailability.communication}</div>
                </CardContent>
              </Card>
            </HoverScale>
          </ScrollReveal>

          {/* Key Points Timeline */}
          <ScrollReveal threshold={0.2}>
            <div className="mt-12 space-y-6">
              <StaggerContainer staggerDelay={0.2}>
                {about.keyPoints.map((point, index) => (
                  <StaggerItem key={index}>
                    <HoverScale scale={1.02} className="flex gap-6 p-4 rounded-lg hover:bg-lightning-dark/50 transition-colors duration-300">
                      <div className="flex-shrink-0 w-2 h-2 bg-lightning-yellow rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-semibold text-lightning-yellow">{point.period}</h3>
                        <p className="text-gray-300 mb-2">{point.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {point.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="bg-lightning-gray text-lightning-white hover:bg-lightning-yellow hover:text-lightning-black transition-colors duration-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </HoverScale>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Separator className="bg-lightning-gray" />

      {/* Services Section */}
      <Suspense fallback={<SectionLoading message="Loading services..." />}>
        <section id="services" className="fold:py-12 xs:py-16 py-20 tablet:py-24 ultra:py-32 fold:px-2 xs:px-3 px-4 tablet:px-6 tablet-lg:px-8 ultra:px-16">
        <div className="container mx-auto max-w-6xl tablet-lg:max-w-7xl ultra:max-w-8xl">
          <ScrollReveal>
            <div className="text-center fold:mb-6 xs:mb-8 mb-12 tablet:mb-16 ultra:mb-20">
              <h2 className="fold:text-xl xs:text-2xl text-3xl md:text-4xl tablet:text-5xl tablet-lg:text-6xl ultra:text-7xl font-bold text-lightning-gradient fold:mb-2 xs:mb-3 mb-4 tablet:mb-6 ultra:mb-8">
                What I Build for Growing Businesses
              </h2>
              <p className="fold:text-xs xs:text-sm text-base tablet:text-lg ultra:text-xl text-gray-400 max-w-3xl tablet-lg:max-w-4xl ultra:max-w-5xl mx-auto italic">
                {services.introduction}
              </p>
            </div>
          </ScrollReveal>

          {/* Service Offerings */}
          <ScrollReveal threshold={0.2}>
            <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 tablet:grid-cols-2 fold:gap-4 xs:gap-6 gap-8 tablet:gap-10 ultra:gap-12 fold:mb-6 xs:mb-8 mb-12 tablet:mb-16 ultra:mb-20">
              {services.offerings.map((service, index) => (
                <StaggerItem key={service.id}>
                  <HoverScale scale={1.03}>
                    <GradientShine>
                      <Card className="bg-lightning-dark border-lightning-gray h-full hover:border-lightning-yellow/50 transition-all duration-300 hover:shadow-lg hover:shadow-lightning-yellow/10">
                        <CardHeader>
                          <Floating intensity={6} duration={4 + index * 0.5}>
                            <div className="text-4xl mb-2">{service.icon}</div>
                          </Floating>
                          <CardTitle className="text-lightning-yellow">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <strong className="text-lightning-orange">What I do:</strong>
                            <p className="text-gray-300">{service.whatIDo}</p>
                          </div>
                          <div>
                            <strong className="text-lightning-orange">Your edge:</strong>
                            <p className="text-gray-300">{service.yourEdge}</p>
                          </div>
                          <div>
                            <strong className="text-lightning-orange">Perfect for:</strong>
                            <p className="text-gray-300">{service.perfectFor}</p>
                          </div>
                          <div>
                            <strong className="text-lightning-orange">Timeline:</strong>
                            <p className="text-gray-300">{service.timeline}</p>
                          </div>
                          <div className="pt-4 border-t border-lightning-gray">
                            <p className="text-sm text-gray-400 italic">{service.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </GradientShine>
                  </HoverScale>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollReveal>

          {/* Availability Info */}
          <ScrollReveal threshold={0.3}>
            <HoverScale scale={1.01}>
              <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow">My Availability</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 tablet:grid-cols-2 fold:gap-3 xs:gap-4 gap-6 tablet:gap-8 ultra:gap-10">
                  <div>
                    <strong>Weekdays:</strong>
                    <p className="text-gray-300">{services.availability.weekdays}</p>
                  </div>
                  <div>
                    <strong>Weekends:</strong>
                    <p className="text-gray-300">{services.availability.weekends}</p>
                  </div>
                  <div>
                    <strong>Communication:</strong>
                    <p className="text-gray-300">{services.availability.communication}</p>
                  </div>
                  <div>
                    <strong>Project Work:</strong>
                    <p className="text-gray-300">{services.availability.projectWork}</p>
                  </div>
                </CardContent>
                <CardContent>
                  <p className="text-sm text-gray-400 italic border-t border-lightning-gray pt-4">
                    {services.workingPhilosophy}
                  </p>
                </CardContent>
              </Card>
            </HoverScale>
          </ScrollReveal>

          {/* Smart Service Recommendations */}
          <ScrollReveal threshold={0.2}>
            <div className="mt-16">
              <SmartServiceRecommendations
                context="services"
                title="Which Services Are Right for Your Business?"
                subtitle="Get AI-powered recommendations tailored to your specific needs and goals"
              />
            </div>
          </ScrollReveal>

          {/* Project Complexity Analyzer */}
          <ScrollReveal threshold={0.2}>
            <div className="mt-16">
              <ProjectComplexityAnalyzer
                title="Analyze Your Project's Complexity"
                subtitle="Get detailed insights into development time, costs, risks, and timeline with AI-powered analysis"
              />
            </div>
          </ScrollReveal>
        </div>
        </section>
      </Suspense>

      <Separator className="bg-lightning-gray" />

      {/* Case Study Section */}
      <Suspense fallback={<SectionLoading message="Loading case study..." />}>
        <section id="case-study" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-lightning-gradient mb-4">
                Featured Project
              </h2>
              <p className="text-gray-400">Real results from real client work</p>
            </div>
          </ScrollReveal>

          <ScrollReveal threshold={0.2}>
            <HoverScale scale={1.01}>
              <Card className="bg-lightning-dark border-lightning-gray mb-8 hover:border-lightning-yellow/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-lightning-yellow">{caseStudy.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    <strong>Client:</strong> {caseStudy.client}<br/>
                    <strong>Challenge:</strong> {caseStudy.challenge}<br/>
                    <strong>Timeline:</strong> {caseStudy.timeline}<br/>
                    <strong>Reality:</strong> {caseStudy.reality}
                  </CardDescription>
                </CardHeader>
              </Card>
            </HoverScale>
          </ScrollReveal>

          {/* Problem */}
          <ScrollReveal threshold={0.2}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-lightning-orange mb-4">The Challenge</h3>
              <p className="text-gray-300 mb-4">{caseStudy.problem.description}</p>
              <StaggerContainer staggerDelay={0.1}>
                <ul className="space-y-2 text-gray-300">
                  {caseStudy.problem.requirements.map((req, index) => (
                    <StaggerItem key={index}>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-lightning-yellow rounded-full mt-2 flex-shrink-0"></div>
                        {req}
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Solution */}
          <ScrollReveal threshold={0.2}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-lightning-orange mb-4">The AI-Powered Solution</h3>
              <p className="text-gray-300 mb-6">{caseStudy.solution.description}</p>

              <div className="grid grid-cols-1 tablet:grid-cols-2 fold:gap-4 xs:gap-5 gap-6 tablet:gap-8 ultra:gap-10">
                <div>
                  <h4 className="font-semibold text-lightning-yellow mb-3">Technology Stack:</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {caseStudy.solution.technologyStack.map((tech, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-lightning-yellow rounded-full"></div>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lightning-yellow mb-3">AI Development Approach:</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {caseStudy.solution.aiApproach.map((approach, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-lightning-orange rounded-full"></div>
                        {approach}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Features */}
          <ScrollReveal threshold={0.2}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-lightning-orange mb-4">Interactive Features Built</h3>
              <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 tablet:grid-cols-2 fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8">
                {caseStudy.solution.features.map((feature, index) => (
                  <StaggerItem key={index}>
                    <HoverScale scale={1.03}>
                      <div className="p-4 bg-lightning-gray rounded-lg hover:bg-lightning-dark transition-colors duration-300">
                        <h4 className="font-semibold text-lightning-yellow mb-2">{feature.title}</h4>
                        <p className="text-sm text-gray-300">{feature.description}</p>
                      </div>
                    </HoverScale>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Design Challenge */}
          <ScrollReveal threshold={0.2}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-lightning-orange mb-4">
                Design Challenge: Making &ldquo;Ugly&rdquo; Screenshots Look Professional
              </h3>
              <p className="text-gray-300 mb-4">{caseStudy.designChallenge.problem}</p>
              <HoverScale scale={1.01}>
                <div className="bg-lightning-gray p-6 rounded-lg mb-4 hover:bg-lightning-dark transition-colors duration-300">
                  <h4 className="font-semibold text-lightning-yellow mb-3">My solution:</h4>
                  <StaggerContainer staggerDelay={0.1}>
                    <ul className="space-y-2 text-gray-300">
                      {caseStudy.designChallenge.solution.map((solution, index) => (
                        <StaggerItem key={index}>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-lightning-yellow rounded-full mt-2 flex-shrink-0"></div>
                            {solution}
                          </li>
                        </StaggerItem>
                      ))}
                    </ul>
                  </StaggerContainer>
                </div>
              </HoverScale>
              <p className="text-gray-300 font-semibold">{caseStudy.designChallenge.result}</p>
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal threshold={0.2}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-lightning-orange mb-4">The Results</h3>
              <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 tablet:grid-cols-2 fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8">
                {caseStudy.results.map((result, index) => (
                  <StaggerItem key={index}>
                    <HoverScale scale={1.02}>
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-lightning-dark/50 transition-colors duration-300">
                        <div className="text-green-400 text-xl">✅</div>
                        <div>
                          <h4 className="font-semibold text-lightning-yellow">{result.title}</h4>
                          <p className="text-sm text-gray-300">{result.description}</p>
                        </div>
                      </div>
                    </HoverScale>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Proof */}
          <ScrollReveal threshold={0.3}>
            <HoverScale scale={1.01}>
              <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow">What This Proves</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{caseStudy.proof.description}</p>
                  <LightningPulse>
                    <HoverScale scale={1.05}>
                      <GradientShine>
                        <Button
                          asChild
                          className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
                        >
                          <a href={caseStudy.proof.liveUrl} target="_blank" rel="noopener noreferrer">
                            Visit Live Site: gracekimkor.com
                          </a>
                        </Button>
                      </GradientShine>
                    </HoverScale>
                  </LightningPulse>
                </CardContent>
              </Card>
            </HoverScale>
          </ScrollReveal>

          {/* Interactive AI Case Study Exploration */}
          <ScrollReveal threshold={0.2}>
            <div className="mt-12">
              <InteractiveCaseStudy />
            </div>
          </ScrollReveal>
        </div>
        </section>
      </Suspense>

      <Separator className="bg-lightning-gray" />

      {/* AI Showcase Section */}
      <Suspense fallback={<SectionLoading message="Loading AI showcase..." />}>
        <AIShowcaseSection />
      </Suspense>

      <Separator className="bg-lightning-gray" />

      {/* Contact Section */}
      <Suspense fallback={<SectionLoading message="Loading contact form..." />}>
        <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-lightning-gradient mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-gray-400 italic max-w-2xl mx-auto">
                {contact.introduction}
              </p>
            </div>
          </ScrollReveal>

          {/* Contact Information */}
          <ScrollReveal threshold={0.2}>
            <div className="text-center mb-12">
              <h3 className="text-xl font-semibold text-lightning-yellow mb-4">Let&rsquo;s Start the Conversation</h3>
              <div className="space-y-2 text-lg">
                <div>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${contact.contactInfo.email}`}
                    className="text-lightning-orange hover:text-lightning-yellow transition-colors"
                  >
                    {contact.contactInfo.email}
                  </a>
                </div>
                <div className="text-gray-400">
                  <strong>Subject Line:</strong> {contact.contactInfo.subjectLine}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-gray-300 mb-3">Please include:</p>
                <StaggerContainer staggerDelay={0.1}>
                  <ul className="text-sm text-gray-400 space-y-1 max-w-md mx-auto">
                    {contact.contactInfo.includeInfo.map((info, index) => (
                      <StaggerItem key={index}>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-lightning-yellow rounded-full mt-2 flex-shrink-0"></div>
                          {info}
                        </li>
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
              </div>
            </div>
          </ScrollReveal>

          {/* Project Phases */}
          <ScrollReveal threshold={0.2}>
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-lightning-orange mb-6 text-center">
                What to Expect When Working With Me
              </h3>
              <StaggerContainer staggerDelay={0.2} className="space-y-6">
                {contact.projectPhases.map((phase, index) => (
                  <StaggerItem key={index}>
                    <HoverScale scale={1.01}>
                      <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
                        <CardHeader>
                          <CardTitle className="text-lightning-yellow">{phase.title}</CardTitle>
                          <CardDescription className="text-gray-300">{phase.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1 text-sm text-gray-400">
                            {phase.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-lightning-yellow rounded-full mt-2 flex-shrink-0"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </HoverScale>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Social Links */}
          <ScrollReveal threshold={0.2}>
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-lightning-orange mb-6 text-center">
                Connect With Me
              </h3>
              <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 fold:gap-2 xs:gap-3 gap-4 tablet:gap-6 ultra:gap-8">
                {contact.socialLinks.map((link, index) => (
                  <StaggerItem key={index}>
                    <HoverScale scale={1.03}>
                      <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
                        <CardContent className="p-4 text-center">
                          <h4 className="font-semibold text-lightning-yellow mb-1">{link.platform}</h4>
                          <p className="text-xs text-gray-400 mb-3">{link.label}</p>
                          {link.url !== "#" ? (
                            <HoverScale scale={1.05}>
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="border-lightning-gray text-lightning-white hover:bg-lightning-gray transition-colors duration-200"
                              >
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                  Visit Profile
                                </a>
                              </Button>
                            </HoverScale>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="border-lightning-gray text-gray-500"
                            >
                              Coming Soon
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </HoverScale>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* AI-Enhanced Contact Form */}
          <ScrollReveal threshold={0.2}>
            <div className="mb-12">
              <AIEnhancedContactForm />
            </div>
          </ScrollReveal>

          {/* Why Choose Me */}
          <ScrollReveal threshold={0.2}>
            <div>
              <h3 className="text-xl font-semibold text-lightning-orange mb-6 text-center">
                Why Small Businesses Choose Me
              </h3>
              <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 fold:gap-3 xs:gap-4 gap-6 tablet:gap-8 ultra:gap-10">
                {contact.whyChooseMe.map((reason, index) => (
                  <StaggerItem key={index}>
                    <HoverScale scale={1.05} className="text-center p-4 rounded-lg hover:bg-lightning-dark/50 transition-colors duration-300">
                      <div className="text-green-400 text-2xl mb-2">✅</div>
                      <h4 className="font-semibold text-lightning-yellow mb-2">{reason.title}</h4>
                      <p className="text-sm text-gray-400">{reason.description}</p>
                    </HoverScale>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Final CTA */}
          <ScrollReveal threshold={0.3}>
            <HoverScale scale={1.01}>
              <div className="text-center mt-12 p-8 bg-lightning-dark rounded-lg border border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
                <p className="text-lg text-lightning-gradient font-semibold mb-6">
                  Ready to build something amazing together?
                </p>
                <p className="text-gray-400 italic mb-6">
                  &ldquo;Every evening after factory work, I choose to code instead of watch TV. That choice, that dedication, that drive - it all goes into your project. Let&rsquo;s build something that moves your business forward.&rdquo;
                </p>
                <LightningPulse>
                  <HoverScale scale={1.05}>
                    <GradientShine>
                      <Button
                        size="lg"
                        asChild
                        className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
                      >
                        <a href={`mailto:${contact.contactInfo.email}?subject=Project Inquiry`}>
                          Start Your Project Today
                        </a>
                      </Button>
                    </GradientShine>
                  </HoverScale>
                </LightningPulse>
              </div>
            </HoverScale>
          </ScrollReveal>
        </div>
        </section>
      </Suspense>

      {/* Footer */}
      <footer className="bg-lightning-dark border-t border-lightning-gray py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-400 mb-2">
            © 2025 Michael Jeff Achumbre. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Building intelligent solutions for growing businesses, one project at a time.
          </p>
        </div>
      </footer>

      {/* AI Chat Interface */}
      <SimpleAIChat context="portfolio" />
    </main>
  )
}