'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AIWorkflowStep {
  title: string
  description: string
  tool: string
  icon: string
  code?: string
  result: string
}

const aiWorkflowSteps: AIWorkflowStep[] = [
  {
    title: "AI-Assisted Planning",
    description: "Used Claude Code CLI to analyze requirements and suggest optimal architecture",
    tool: "Claude Code CLI",
    icon: "🤖",
    code: "// AI suggestion for component structure\nconst ServiceMatcher = ({ userVisa, services }) => {\n  return services.filter(s => s.visaTypes.includes(userVisa))\n}",
    result: "Optimal component architecture in minutes, not hours"
  },
  {
    title: "Intelligent Code Completion",
    description: "Cursor IDE provided context-aware completions for complex TypeScript interfaces",
    tool: "Cursor IDE",
    icon: "⚡",
    code: "interface FinancialService {\n  // AI completed full interface\n  id: string\n  name: string\n  visaTypes: VisaType[]\n  requirements: Requirement[]\n}",
    result: "70% faster TypeScript development with zero syntax errors"
  },
  {
    title: "Design Problem Solving",
    description: "AI helped solve the testimonial gallery challenge - how to make raw screenshots look professional",
    tool: "AI Design Assistant",
    icon: "🎨",
    code: "// AI-suggested solution for testimonial styling\n.testimonial-frame {\n  border: 2px solid #gold;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(0,0,0,0.3);\n}",
    result: "Elegant solution that maintains authenticity while looking professional"
  },
  {
    title: "Real-time Debugging",
    description: "AI tools identified and fixed complex state management issues during evening development",
    tool: "AI Debugging",
    icon: "🐛",
    code: "// AI identified the issue\nuseEffect(() => {\n  // Missing dependency array was causing infinite re-renders\n  fetchServices()\n}, [userVisa]) // AI suggested this fix",
    result: "Instant problem identification and resolution"
  }
]

export function AIWorkflowDemo() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [showCode, setShowCode] = useState(false)

  return (
    <Card className="bg-lightning-dark border-lightning-yellow/30">
      <CardHeader>
        <CardTitle className="text-lightning-yellow flex items-center gap-2">
          <span>🔧</span> AI Development Workflow
        </CardTitle>
        <p className="text-gray-400 text-sm">
          See how AI tools accelerated this project&apos;s development
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Step Navigation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {aiWorkflowSteps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={activeStep === index ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveStep(index)}
                className={`w-full text-xs h-auto py-2 px-2 ${
                  activeStep === index
                    ? 'bg-lightning-gradient text-lightning-black'
                    : 'border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow'
                }`}
              >
                <div className="text-center">
                  <div className="text-base mb-1">{step.icon}</div>
                  <div className="text-xs font-medium leading-tight">
                    {step.title.split(' ')[0]}
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Active Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{aiWorkflowSteps[activeStep].icon}</div>
              <div>
                <h3 className="font-semibold text-lightning-yellow">
                  {aiWorkflowSteps[activeStep].title}
                </h3>
                <Badge variant="outline" className="text-xs border-lightning-orange/30 text-lightning-orange">
                  {aiWorkflowSteps[activeStep].tool}
                </Badge>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              {aiWorkflowSteps[activeStep].description}
            </p>

            {/* Code Example Toggle */}
            {aiWorkflowSteps[activeStep].code && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCode(!showCode)}
                  className="text-lightning-yellow hover:text-lightning-orange"
                >
                  <span className="mr-2">👁️</span>
                  {showCode ? 'Hide Code Example' : 'Show Code Example'}
                </Button>

                <AnimatePresence>
                  {showCode && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-3"
                    >
                      <div className="bg-lightning-gray/50 rounded-lg p-3 border border-lightning-gray">
                        <pre className="text-xs text-gray-300 overflow-x-auto">
                          <code>{aiWorkflowSteps[activeStep].code}</code>
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Result */}
            <div className="bg-lightning-gradient/10 rounded-lg p-3 border border-lightning-yellow/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lightning-yellow font-semibold text-sm">Result:</span>
              </div>
              <p className="text-gray-300 text-sm">
                {aiWorkflowSteps[activeStep].result}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive CTA */}
        <div className="pt-4 border-t border-lightning-gray/30">
          <p className="text-xs text-gray-500 mb-3">
            Experience this AI-enhanced development approach in action
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow text-xs"
            >
              <span className="mr-1">🚀</span>
              Try AI Tools
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-lightning-gray hover:border-lightning-yellow hover:text-lightning-yellow text-xs"
            >
              <span className="mr-1">📋</span>
              See Full Process
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}