'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { Button } from "@/components/ui/button"
import {
  HeroSection,
  JourneySection,
  AILabSection,
  ProjectsSection,
  ConnectSection
} from "@/components/sections"

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <main className="min-h-screen">
      {/* Skip to Content Link - for screen readers and keyboard users */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-lightning-gradient text-lightning-black px-4 py-2 rounded font-semibold"
      >
        Skip to main content
      </a>

      {/* Navigation - Direct Implementation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav
          className="border-b border-lightning-gray"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo/Brand */}
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-lightning-gradient">
                Michael Jeff Achumbre
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <SmoothScrollLink href="#hero" className="text-sm text-white hover:text-lightning-yellow transition-colors duration-200" aria-label="Navigate to home section">
                  Home
                </SmoothScrollLink>
                <SmoothScrollLink href="#journey" className="text-sm text-white hover:text-lightning-yellow transition-colors duration-200" aria-label="Navigate to journey section">
                  Journey
                </SmoothScrollLink>
                <SmoothScrollLink href="#ai-lab" className="text-sm text-white hover:text-lightning-yellow transition-colors duration-200" aria-label="Navigate to AI lab section">
                  AI Lab
                </SmoothScrollLink>
                <SmoothScrollLink href="#projects" className="text-sm text-white hover:text-lightning-yellow transition-colors duration-200" aria-label="Navigate to case study section">
                  Case Study
                </SmoothScrollLink>
                <SmoothScrollLink href="#connect" className="text-sm text-white hover:text-lightning-yellow transition-colors duration-200" aria-label="Navigate to connect section">
                  Connect
                </SmoothScrollLink>
              </nav>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="md:hidden flex items-center justify-center p-2 text-white hover:bg-lightning-gray/20"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 6 : 0,
                    }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="block h-0.5 w-6 bg-current"
                  />
                  <motion.span
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.1 }}
                    className="block h-0.5 w-6 bg-current mt-1.5"
                  />
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -6 : 0,
                    }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="block h-0.5 w-6 bg-current mt-1.5"
                  />
                </div>
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.98)',
                backdropFilter: 'blur(12px)',
                top: '90px',
              }}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="h-full ml-auto w-full sm:w-80"
                style={{
                  backgroundColor: 'rgba(10, 10, 10, 0.98)',
                  backdropFilter: 'blur(20px)',
                  borderLeft: '3px solid rgba(255, 215, 0, 0.6)',
                  boxShadow: `
                    -8px 0 32px rgba(0, 0, 0, 0.6),
                    -4px 0 16px rgba(255, 215, 0, 0.1),
                    -2px 0 8px rgba(255, 215, 0, 0.05),
                    inset 3px 0 0 rgba(255, 215, 0, 0.1)
                  `,
                }}
              >
                <nav className="flex flex-col p-8 space-y-2">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <SmoothScrollLink
                      href="#hero"
                      onClick={closeMobileMenu}
                      className="block text-xl font-medium text-white hover:text-lightning-yellow transition-all duration-200 py-4 px-4 rounded-lg hover:bg-lightning-yellow/5 hover:shadow-lg hover:shadow-lightning-yellow/20 active:scale-95"
                      aria-label="Navigate to home section"
                      style={{
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Home
                    </SmoothScrollLink>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <SmoothScrollLink
                      href="#journey"
                      onClick={closeMobileMenu}
                      className="block text-xl font-medium text-white hover:text-lightning-yellow transition-all duration-200 py-4 px-4 rounded-lg hover:bg-lightning-yellow/5 hover:shadow-lg hover:shadow-lightning-yellow/20 active:scale-95"
                      aria-label="Navigate to journey section"
                      style={{
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Journey
                    </SmoothScrollLink>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <SmoothScrollLink
                      href="#ai-lab"
                      onClick={closeMobileMenu}
                      className="block text-xl font-medium text-white hover:text-lightning-yellow transition-all duration-200 py-4 px-4 rounded-lg hover:bg-lightning-yellow/5 hover:shadow-lg hover:shadow-lightning-yellow/20 active:scale-95"
                      aria-label="Navigate to AI lab section"
                      style={{
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      AI Lab
                    </SmoothScrollLink>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <SmoothScrollLink
                      href="#projects"
                      onClick={closeMobileMenu}
                      className="block text-xl font-medium text-white hover:text-lightning-yellow transition-all duration-200 py-4 px-4 rounded-lg hover:bg-lightning-yellow/5 hover:shadow-lg hover:shadow-lightning-yellow/20 active:scale-95"
                      aria-label="Navigate to case study section"
                      style={{
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Case Study
                    </SmoothScrollLink>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <SmoothScrollLink
                      href="#connect"
                      onClick={closeMobileMenu}
                      className="block text-xl font-medium text-white hover:text-lightning-yellow transition-all duration-200 py-4 px-4 rounded-lg hover:bg-lightning-yellow/5 hover:shadow-lg hover:shadow-lightning-yellow/20 active:scale-95"
                      aria-label="Navigate to connect section"
                      style={{
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Connect
                    </SmoothScrollLink>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    className="pt-8 mt-4"
                  >
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-lightning-yellow/30 to-transparent mb-6"></div>
                    <Button
                      asChild
                      className="w-full font-semibold text-lg py-4 rounded-xl hover:scale-105 transition-all duration-200 active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        color: '#000000',
                        boxShadow: '0 8px 24px rgba(255, 215, 0, 0.3), 0 4px 12px rgba(255, 165, 0, 0.2)',
                        minHeight: '52px',
                      }}
                    >
                      <SmoothScrollLink
                        href="#connect"
                        onClick={closeMobileMenu}
                        aria-label="Connect with me - navigate to connect section"
                        className="flex items-center justify-center gap-2"
                      >
                        ⚡ Let&apos;s Connect
                      </SmoothScrollLink>
                    </Button>
                  </motion.div>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content - Lightning Portfolio 2.0 */}
      <HeroSection />
      <JourneySection />
      <AILabSection />
      <ProjectsSection />
      <ConnectSection />
    </main>
  )
}