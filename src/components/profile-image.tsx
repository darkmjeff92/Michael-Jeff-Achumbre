'use client'

import Image from 'next/image'

interface ProfileImageProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ProfileImage({ className = "", size = 'lg' }: ProfileImageProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Premium container with lightning theme */}
      <div
        className="mx-auto relative group cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.01]"
        style={{
          width: 'clamp(144px, 20vw, 192px)',
          height: 'clamp(192px, 26.67vw, 256px)',
        }}
      >
        {/* Lightning energy border frame */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(10, 10, 20, 1) 100%)',
            borderRadius: '16px',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.3),
              0 4px 16px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(255, 215, 0, 0.1),
              inset 0 1px 0 rgba(255, 215, 0, 0.1)
            `
          }}
        />

        {/* Enhanced hover state */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            borderRadius: '16px',
            border: '2px solid rgba(255, 215, 0, 0.5)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.4),
              0 4px 16px rgba(255, 215, 0, 0.1),
              0 0 0 1px rgba(255, 215, 0, 0.2),
              inset 0 1px 0 rgba(255, 215, 0, 0.15)
            `
          }}
        />

        {/* Image container with perfect background */}
        <div
          className="absolute inset-2 overflow-hidden"
          style={{
            backgroundColor: '#0a0a14',
            borderRadius: '12px'
          }}
        >
          {/* Solid background layer */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: '#0a0a14',
              zIndex: 1
            }}
          />

          {/* Subtle inner glow */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(255, 215, 0, 0.03) 100%)',
              zIndex: 2
            }}
          />

          {/* Profile image */}
          <Image
            src="/profile-picture.png"
            alt="Michael Jeff Achumbre, AI-Powered Developer"
            fill
            className="relative z-10 transition-transform duration-300 group-hover:scale-[1.005]"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            sizes="(max-width: 640px) 144px, (max-width: 1024px) 160px, 192px"
            priority
          />
        </div>
      </div>
    </div>
  )
}