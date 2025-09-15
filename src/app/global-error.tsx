'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-lightning-black text-lightning-white flex items-center justify-center p-4">
          <Card className="bg-lightning-dark border-lightning-gray max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-lightning-orange text-center">
                ⚠️ Application Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-center">
                Something went wrong with the application. This issue has been logged.
              </p>
              {error.digest && (
                <div className="text-sm text-gray-400 text-center">
                  Error ID: <code className="bg-lightning-gray px-1 rounded">{error.digest}</code>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={reset}
                  className="bg-lightning-gradient text-lightning-black font-semibold hover:opacity-90"
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="border-lightning-gray text-lightning-white hover:bg-lightning-gray"
                >
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}