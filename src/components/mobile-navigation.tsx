'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { useFocusTrap } from "@/hooks/use-focus-trap"

interface MobileNavigationProps {
  className?: string
}

const navigationItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#case-study', label: 'Case Study' },
  { href: '#contact', label: 'Contact' },
]

export function MobileNavigation({ className = "" }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const focusTrapRef = useFocusTrap(isOpen)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleItemClick = () => {
    setIsOpen(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          setIsOpen(false)
          break
        case 'Tab':
          // Allow tab navigation within the menu
          // The focus management will be handled by the browser
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className={`md:hidden ${className}`}>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 text-lightning-white hover:bg-lightning-gray"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 6 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="block h-0.5 w-6 bg-current origin-center transition-all duration-300"
          />
          <motion.span
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-current mt-1.5 origin-center transition-all duration-300"
          />
          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -6 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="block h-0.5 w-6 bg-current mt-1.5 origin-center transition-all duration-300"
          />
        </div>
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-lightning-black/95 backdrop-blur-sm"
            style={{ top: 'var(--navbar-height, 80px)' }} // Account for navbar height
          >
            <motion.div
              ref={focusTrapRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="h-full bg-lightning-dark border-l border-lightning-gray ml-auto fold:w-full xs:w-80 w-96"
            >
              <nav className="flex flex-col fold:p-4 xs:p-6 p-8 fold:space-y-6 xs:space-y-7 space-y-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1 + 0.1,
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    <SmoothScrollLink
                      href={item.href}
                      onClick={handleItemClick}
                      className="block fold:text-lg xs:text-xl text-xl font-medium text-lightning-white hover:text-lightning-yellow transition-colors duration-200 fold:py-3 xs:py-3 py-2"
                      aria-label={`Navigate to ${item.label} section`}
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
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="pt-8 border-t border-lightning-gray"
                >
                  <Button
                    asChild
                    className="w-full bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
                  >
                    <SmoothScrollLink
                      href="#contact"
                      onClick={handleItemClick}
                      aria-label="Start your project - navigate to contact section"
                    >
                      Start Your Project
                    </SmoothScrollLink>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}