import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIP, getAnalyticsData } from '@/lib/rate-limit'

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIP(req)

    // Get rate limit status for this IP
    const rateLimitResult = await checkRateLimit(ip)

    // Get platform analytics
    const analyticsData = await getAnalyticsData()

    return NextResponse.json({
      rateLimit: rateLimitResult,
      analytics: analyticsData,
      ip: ip // For debugging, remove in production
    })
  } catch (error) {
    console.error('Rate limit API error:', error)
    return NextResponse.json(
      { error: 'Failed to check rate limits' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action } = await req.json()

    if (!action || !['question', 'upload'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action type' },
        { status: 400 }
      )
    }

    const ip = getClientIP(req)
    const rateLimitResult = await checkRateLimit(ip)

    // Check if action is allowed
    const canProceed = action === 'question' ? rateLimitResult.canQuestion : rateLimitResult.canUpload

    if (!canProceed) {
      const limitType = action === 'question' ? 'questions' : 'uploads'
      const used = action === 'question' ? rateLimitResult.questionsUsed : rateLimitResult.uploadsUsed
      const limit = action === 'question' ? rateLimitResult.questionsLimit : rateLimitResult.uploadsLimit

      return NextResponse.json(
        {
          allowed: false,
          error: `Rate limit exceeded: ${used}/${limit} ${limitType} used this week`,
          rateLimit: rateLimitResult
        },
        { status: 429 }
      )
    }

    return NextResponse.json({
      allowed: true,
      rateLimit: rateLimitResult
    })
  } catch (error) {
    console.error('Rate limit check error:', error)
    return NextResponse.json(
      { error: 'Failed to check rate limits' },
      { status: 500 }
    )
  }
}