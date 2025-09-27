'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { SmoothScrollLink } from '@/components/smooth-scroll-link'
import { NavigationLogo } from '@/components/logo'
import type { UnifiedNavigationProps, NavigationItem } from './navigation-types'

const navigationItems: NavigationItem[] = [
  { href: '#hero', label: 'Home', ariaLabel: 'Navigate to home section' },
  { href: '#journey', label: 'Journey', ariaLabel: 'Navigate to journey section' },
  { href: '#ai-lab', label: 'AI Lab', ariaLabel: 'Navigate to AI lab section' },
  { href: '#projects', label: 'Case Study', ariaLabel: 'Navigate to case study section' },
  { href: '#connect', label: 'Connect', ariaLabel: 'Navigate to connect section' },
]

export function UnifiedNavigation({ className = "" }: UnifiedNavigationProps) {
  console.log('🔍 UnifiedNavigation component is loading!')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <nav
        className="border-b border-lightning-gray"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <SmoothScrollLink
              href="#hero"
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
              aria-label="Navigate to home section"
            >
              <NavigationLogo />
            </SmoothScrollLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navigationItems.map((item) => (
                <SmoothScrollLink
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white hover:text-lightning-yellow transition-colors duration-200"
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </SmoothScrollLink>
              ))}
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
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                top: '80px',
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
                  backgroundColor: '#0a0a0a',
                  borderLeft: '2px solid rgba(255, 215, 0, 0.5)',
                  boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.5), -2px 0 8px rgba(255, 215, 0, 0.1)',
                }}
              >
                <nav className="flex flex-col p-6 space-y-6">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1 + 0.1,
                        duration: 0.3,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                    >
                      <SmoothScrollLink
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block text-xl font-medium text-white hover:text-lightning-yellow transition-colors duration-200 py-3"
                        aria-label={item.ariaLabel}
                      >
                        {item.label}
                      </SmoothScrollLink>
                    </motion.div>
                  ))}

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6,
                      duration: 0.3,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                    className="pt-8 border-t border-lightning-gray"
                  >
                    <Button
                      asChild
                      className="w-full font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        color: '#000000',
                      }}
                    >
                      <SmoothScrollLink
                        href="#connect"
                        onClick={closeMobileMenu}
                        aria-label="Connect with me - navigate to connect section"
                      >
                        Let&apos;s Connect
                      </SmoothScrollLink>
                    </Button>
                  </motion.div>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}