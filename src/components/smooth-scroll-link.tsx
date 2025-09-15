'use client'

import { ReactNode } from 'react'

interface SmoothScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  'aria-label'?: string
}

export function SmoothScrollLink({
  href,
  children,
  className = "",
  onClick,
  'aria-label': ariaLabel
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Call the onClick handler if provided (for mobile menu closing)
    if (onClick) {
      onClick()
    }

    // Get the target element
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Calculate the offset for the fixed navbar
      const navbarHeight = 80 // Approximate navbar height
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

      // Check for user's motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      })
    }
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}