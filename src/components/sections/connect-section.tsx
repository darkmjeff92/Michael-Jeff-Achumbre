"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ScrollReveal,
  GradientShine,
  HoverScale
} from "@/components/animated-elements"
import { ContactIcons } from "@/components/contact-icons"
import { FooterLogo } from "@/components/logo"

export function ConnectSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simple form submission (can be enhanced later)
    console.log("Form submitted:", formData)

    // Reset form
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
      alert("Message sent! I'll get back to you soon.")
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="connect" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-8xl">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-impact text-lightning-gradient mb-4">
              Get in Touch
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Let&apos;s discuss AI development, technical approaches, or potential collaborations.
              Drop me a message and I&apos;ll get back to you soon.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <GradientShine>
              <Card className="bg-lightning-gradient/10 border-lightning-yellow">
                <CardHeader>
                  <CardTitle className="text-lightning-yellow text-xl sm:text-2xl text-center">
                    📧 Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-lightning-yellow">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-lightning-gray border-lightning-gray focus:border-lightning-yellow text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-lightning-yellow">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-lightning-gray border-lightning-gray focus:border-lightning-yellow text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-lightning-yellow">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell me about your project, technical questions, or collaboration ideas..."
                        className="bg-lightning-gray border-lightning-gray focus:border-lightning-yellow text-white"
                      />
                    </div>

                    <HoverScale scale={1.02}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90 disabled:opacity-50"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </HoverScale>
                  </form>

                  <div className="mt-8 pt-6 border-t border-lightning-gray">
                    <ContactIcons
                      email="michaeljeffachumbre@gmail.com"
                      linkedin="trixtazzz"
                      github="https://github.com/darkmjeff92"
                      className="mb-4"
                    />
                    <div className="flex justify-center mb-3">
                      <FooterLogo className="opacity-60 hover:opacity-80 transition-opacity duration-200" />
                    </div>
                    <p className="text-gray-400 text-xs text-center">
                      Built with AI-enhanced development
                    </p>
                  </div>
                </CardContent>
              </Card>
            </GradientShine>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}