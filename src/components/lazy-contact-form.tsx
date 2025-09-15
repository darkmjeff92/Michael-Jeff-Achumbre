'use client'

import dynamic from 'next/dynamic'
import { SectionLoading } from './loading-spinner'

const ContactForm = dynamic(() => import('./contact-form').then(mod => ({ default: mod.ContactForm })), {
  loading: () => <SectionLoading message="Loading contact form..." />,
  ssr: false // Contact form doesn't need SSR for better performance
})

export { ContactForm }