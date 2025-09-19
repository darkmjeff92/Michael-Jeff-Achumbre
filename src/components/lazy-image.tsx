'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { LoadingSpinner } from './loading-spinner'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  priority?: boolean
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder,
  priority = false
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const currentRef = imgRef.current
    if (!currentRef || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(currentRef)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setIsLoaded(true) // Still show the broken image state
  }

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-lightning-gray flex items-center justify-center"
          style={{
            backgroundImage: placeholder ? `url(${placeholder})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {!placeholder && (
            <LoadingSpinner size="sm" />
          )}
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${
            error ? 'filter grayscale' : ''
          }`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            priority={priority}
            sizes={width && height ? `${width}px` : '(max-width: 768px) 100vw, 50vw'}
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Error state */}
      {error && isLoaded && (
        <div className="absolute inset-0 bg-lightning-gray/50 flex items-center justify-center">
          <span className="text-xs text-gray-400">Failed to load image</span>
        </div>
      )}
    </div>
  )
}