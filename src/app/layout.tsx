import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ErrorBoundary } from '@/components/error-boundary'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Michael Jeff Achumbre - AI-First Developer & Automation Builder',
  description: 'AI-First Developer & Automation Builder helping small to medium businesses leverage AI to work smarter with modern websites, mobile apps, smart automation, and AI integration. Based in Korea, serving global clients.',
  keywords: [
    'AI Developer',
    'AI Automation',
    'Small Business Solutions',
    'Next.js Developer',
    'Mobile App Development',
    'Process Automation',
    'Korean Developer',
    'Freelance Developer',
    'AI Integration',
    'Business Automation'
  ],
  authors: [{ name: 'Michael Jeff Achumbre' }],
  creator: 'Michael Jeff Achumbre',
  publisher: 'Michael Jeff Achumbre',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://michaeljeffachumbre.com',
    siteName: 'Michael Jeff Achumbre - AI-First Developer',
    title: 'Michael Jeff Achumbre - AI-First Developer & Automation Builder',
    description: 'AI-First Developer building intelligent solutions for growing businesses.',
    images: [
      {
        url: '/profile-picture.png',
        width: 1200,
        height: 630,
        alt: 'Michael Jeff Achumbre - AI-First Developer & Automation Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Jeff Achumbre - AI-First Developer & Automation Builder',
    description: 'AI-First Developer building intelligent solutions for growing businesses.',
    images: ['/profile-picture.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-token-here',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <div className="relative min-h-screen bg-lightning-black text-lightning-white">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}