export interface ProjectData {
  id: string
  title: string
  description: string
  challenge: string
  solution: string
  results: string[]
  techStack: TechStackItem[]
  liveUrl: string
  timeline: string
  category: string
  featured: boolean
  images: ProjectImage[]
  metrics: ProjectMetric[]
}

export interface TechStackItem {
  name: string
  description: string
  icon: string
  category: 'frontend' | 'backend' | 'database' | 'deployment' | 'ai' | 'styling'
}

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface ProjectMetric {
  label: string
  value: string
  description: string
  icon: string
}

// gracekimkor.com project data
export const gracekimkorProject: ProjectData = {
  id: 'gracekimkor',
  title: 'gracekimkor.com',
  description: 'Professional financial services platform for licensed Samsung consultant in South Korea',
  challenge: 'Grace Kim needed more than a simple website. As a licensed Samsung financial consultant, she needed an interactive platform that could showcase multiple financial products, guide different visa types to appropriate services, and build trust in a regulated industry.',
  solution: 'Built a sophisticated Next.js platform with dynamic service matching, visa-type filtering, and professional testimonial showcase. Developed during focused evening coding sessions to deliver enterprise-quality results.',
  results: [
    'Professional credibility boost - clients more confident in services',
    'Better client feedback and business validation',
    'Interactive platform positions above competitors',
    'Fast loading, mobile-optimized, accessible to all users',
    'Proved solo evening developer can deliver enterprise-quality work'
  ],
  techStack: [
    {
      name: 'Next.js 15',
      description: 'Latest React framework with App Router for optimal performance and SEO',
      icon: '⚛️',
      category: 'frontend'
    },
    {
      name: 'TypeScript',
      description: 'Type-safe development for reliability and maintainability',
      icon: '📘',
      category: 'frontend'
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid, responsive design',
      icon: '🎨',
      category: 'styling'
    },
    {
      name: 'Shadcn UI',
      description: 'High-quality, accessible component library',
      icon: '🧩',
      category: 'frontend'
    },
    {
      name: 'Radix UI',
      description: 'Unstyled, accessible components for complex interactions',
      icon: '⚡',
      category: 'frontend'
    },
    {
      name: 'Vercel',
      description: 'Edge deployment for lightning-fast global performance',
      icon: '🚀',
      category: 'deployment'
    }
  ],
  liveUrl: 'https://gracekimkor.com',
  timeline: '7 days (5 days planning, 2 days building)',
  category: 'web-application',
  featured: true,
  images: [
    {
      src: '/projects/gracekimkor-hero.png',
      alt: 'Grace Kim Korea - Homepage Hero Section',
      caption: 'Clean, professional homepage highlighting financial expertise'
    },
    {
      src: '/projects/gracekimkor-services.png',
      alt: 'Grace Kim Korea - Services Section',
      caption: 'Interactive service matching based on visa type'
    },
    {
      src: '/projects/gracekimkor-testimonials.png',
      alt: 'Grace Kim Korea - Testimonials Gallery',
      caption: 'Professional testimonial showcase solving raw screenshot challenge'
    }
  ],
  metrics: [
    {
      label: 'Development Time',
      value: '2 days',
      description: 'Built during evening sessions after factory work',
      icon: '⏱️'
    },
    {
      label: 'Performance Score',
      value: '98/100',
      description: 'Google PageSpeed Insights score',
      icon: '🚀'
    },
    {
      label: 'Mobile Optimized',
      value: '100%',
      description: 'Perfect mobile experience across all devices',
      icon: '📱'
    },
    {
      label: 'Client Satisfaction',
      value: '5/5',
      description: 'Grace reports increased client confidence',
      icon: '⭐'
    }
  ]
}

export const allProjects: ProjectData[] = [
  gracekimkorProject
  // Future projects will be added here
]