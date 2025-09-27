import { NextRequest, NextResponse } from 'next/server'
import { cleanupExpiredDocuments } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    // Verify this is an internal request (optional security check)
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CLEANUP_SECRET || 'dev-cleanup-secret'}`) {
      return NextResponse.json(
        { error: 'Unauthorized cleanup request' },
        { status: 401 }
      )
    }

    // Run cleanup
    const deletedCount = await cleanupExpiredDocuments()

    return NextResponse.json({
      success: true,
      deletedCount,
      timestamp: new Date().toISOString(),
      message: `Cleaned up ${deletedCount} expired documents`
    })
  } catch (error) {
    console.error('Cleanup API error:', error)
    return NextResponse.json(
      { error: 'Failed to run cleanup' },
      { status: 500 }
    )
  }
}

// Allow GET for manual testing in development
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'GET cleanup only available in development' },
      { status: 403 }
    )
  }

  try {
    const deletedCount = await cleanupExpiredDocuments()

    return NextResponse.json({
      success: true,
      deletedCount,
      timestamp: new Date().toISOString(),
      message: `Development cleanup: ${deletedCount} expired documents removed`
    })
  } catch (error) {
    console.error('Development cleanup error:', error)
    return NextResponse.json(
      { error: 'Failed to run development cleanup' },
      { status: 500 }
    )
  }
}