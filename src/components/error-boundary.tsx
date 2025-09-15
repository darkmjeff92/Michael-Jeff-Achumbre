'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

interface DefaultErrorFallbackProps {
  error?: Error
  resetError: () => void
}

function DefaultErrorFallback({ error, resetError }: DefaultErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-lightning-black flex items-center justify-center p-4">
      <Card className="bg-lightning-dark border-lightning-gray max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-lightning-orange text-center">
            ⚠️ Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-center">
            We encountered an unexpected error. This has been logged for investigation.
          </p>
          {error && (
            <details className="text-sm text-gray-400">
              <summary className="cursor-pointer hover:text-lightning-yellow">
                Technical details (click to expand)
              </summary>
              <pre className="mt-2 p-2 bg-lightning-gray rounded text-xs overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={resetError}
              className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-lightning-gray text-lightning-white hover:bg-lightning-gray"
            >
              Reload Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { ErrorBoundary, type ErrorBoundaryProps }