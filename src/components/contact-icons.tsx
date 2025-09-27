'use client'

import Image from 'next/image'
import { HoverScale } from "@/components/animated-elements"

interface ContactIconsProps {
  email: string
  linkedin?: string
  github?: string
  discord?: string
  upwork?: string
  facebook?: string
  instagram?: string
  className?: string
}

export function ContactIcons({
  email,
  linkedin = "#",
  github = "#",
  discord = "#",
  upwork = "#",
  facebook = "#",
  instagram = "#",
  className = ""
}: ContactIconsProps) {
  const socialLinks = [
    { href: `https://linkedin.com/in/${linkedin}`, src: "/logos/linkedin-logo.png", alt: "LinkedIn" },
    { href: github, src: "/logos/github-logo.png", alt: "GitHub" },
    { href: discord, src: "/logos/discord-logo.png", alt: "Discord" },
    { href: upwork, src: "/logos/upwork-logo.png", alt: "Upwork" },
    { href: facebook, src: "/logos/facebook-logo.png", alt: "Facebook" },
    { href: instagram, src: "/logos/instagram-logo.png", alt: "Instagram" }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Contact - Gmail */}
      <div className="flex justify-center">
        <HoverScale scale={1.05}>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 px-6 py-3 rounded-lg bg-lightning-gray/30 border border-lightning-gray hover:border-lightning-yellow/50 transition-colors group"
          >
            <Image
              src="/logos/gmail-logo.png"
              alt="Gmail"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-lightning-yellow group-hover:text-white transition-colors font-medium">
              {email}
            </span>
          </a>
        </HoverScale>
      </div>

      {/* Social & Professional Links */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4 sm:gap-6">
          {socialLinks.map((social, index) => (
            <HoverScale key={index} scale={1.1}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-lightning-gray/30 border border-lightning-gray hover:border-lightning-yellow/50 transition-colors group"
              >
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={28}
                  height={28}
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </a>
            </HoverScale>
          ))}
        </div>
      </div>
    </div>
  )
}