'use client'

import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { HoverScale, FadeIn } from "@/components/animated-elements"

interface FormData {
  name: string
  email: string
  business: string
  project: string
  timeline: string
  budget: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  business: '',
  project: '',
  timeline: '',
  budget: '',
  message: ''
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.business.trim()) {
      newErrors.business = 'Business description is required'
    }

    if (!formData.project.trim()) {
      newErrors.project = 'Project description is required'
    } else if (formData.project.trim().length < 20) {
      newErrors.project = 'Please provide more details about your project (at least 20 characters)'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details in your message (at least 10 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    startTransition(async () => {
      try {
        // Create mailto URL with form data
        const subject = encodeURIComponent(`Project Inquiry - ${formData.business}`)
        const body = encodeURIComponent(`
Hi Michael,

I'm interested in working with you on a project. Here are the details:

Name: ${formData.name}
Email: ${formData.email}
Business: ${formData.business}

Project Description:
${formData.project}

Timeline: ${formData.timeline || 'Not specified'}
Budget Range: ${formData.budget || 'Not specified'}

Additional Message:
${formData.message}

Looking forward to hearing from you!

Best regards,
${formData.name}
        `)

        // Open email client
        window.location.href = `mailto:michaeljeffachumbre@gmail.com?subject=${subject}&body=${body}`

        // Show success message
        setIsSubmitted(true)

        // Reset form after a delay
        setTimeout(() => {
          setFormData(initialFormData)
          setIsSubmitted(false)
        }, 3000)

      } catch (error) {
        console.error('Error submitting form:', error)
        setErrors({ submit: 'Failed to send message. Please try again or contact directly via email.' })
      }
    })
  }

  if (isSubmitted) {
    return (
      <FadeIn>
        <Card className="bg-lightning-dark border-lightning-gray">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-lightning-yellow mb-4">
              Message Sent!
            </h3>
            <p className="text-gray-300 mb-4">
              Your email client should have opened with a pre-filled message.
              If not, please contact me directly at michaeljeffachumbre@gmail.com
            </p>
            <p className="text-sm text-gray-400">
              I&apos;ll respond within 24 hours (usually much faster).
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    )
  }

  return (
    <HoverScale scale={1.01}>
      <Card className="bg-lightning-dark border-lightning-gray hover:border-lightning-yellow/50 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-lightning-yellow text-center">
            Start Your Project
          </CardTitle>
          <p className="text-gray-400 text-center text-sm">
            Fill out the form below and I&apos;ll get back to you within 24 hours
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-lightning-orange">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="Your full name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-400 text-sm" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-lightning-orange">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="your@email.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-400 text-sm" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Business Description */}
            <div className="space-y-2">
              <Label htmlFor="business">
                Business Description <span className="text-lightning-orange">*</span>
              </Label>
              <Input
                id="business"
                type="text"
                value={formData.business}
                onChange={handleInputChange('business')}
                placeholder="Brief description of your business"
                aria-describedby={errors.business ? "business-error" : undefined}
                className={errors.business ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.business && (
                <p id="business-error" className="text-red-400 text-sm" role="alert">
                  {errors.business}
                </p>
              )}
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label htmlFor="project">
                Project Description <span className="text-lightning-orange">*</span>
              </Label>
              <Textarea
                id="project"
                value={formData.project}
                onChange={handleInputChange('project')}
                placeholder="What would you like me to build or improve? Be as detailed as possible..."
                rows={4}
                aria-describedby={errors.project ? "project-error" : undefined}
                className={errors.project ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.project && (
                <p id="project-error" className="text-red-400 text-sm" role="alert">
                  {errors.project}
                </p>
              )}
            </div>

            {/* Timeline and Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline (Optional)</Label>
                <Input
                  id="timeline"
                  type="text"
                  value={formData.timeline}
                  onChange={handleInputChange('timeline')}
                  placeholder="When do you need this completed?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range (Optional)</Label>
                <Input
                  id="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleInputChange('budget')}
                  placeholder="Your budget range (USD)"
                />
              </div>
            </div>

            {/* Additional Message */}
            <div className="space-y-2">
              <Label htmlFor="message">
                Additional Message <span className="text-lightning-orange">*</span>
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange('message')}
                placeholder="Anything else you'd like me to know? Best times to contact you, specific requirements, etc."
                rows={3}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={errors.message ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.message && (
                <p id="message-error" className="text-red-400 text-sm" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-red-400 text-sm text-center p-3 bg-red-500/10 border border-red-500/20 rounded">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" />
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to be contacted via email about your project inquiry.
            </p>
          </form>
        </CardContent>
      </Card>
    </HoverScale>
  )
}