'use client'

import { ReactNode, memo } from 'react'
import { useInView } from '@/hooks/use-in-view'

interface PerformanceSectionProps {
  children: ReactNode
  className?: string
  threshold?: number
  id?: string
}

function PerformanceSectionComponent({
  children,
  className = "",
  threshold = 0.1,
  id
}: PerformanceSectionProps) {
  const [ref, inView] = useInView(threshold)

  return (
    <section
      id={id}
      ref={ref}
      className={className}
      data-in-view={inView}
    >
      {inView ? children : (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading section...</div>
        </div>
      )}
    </section>
  )
}

export const PerformanceSection = memo(PerformanceSectionComponent)