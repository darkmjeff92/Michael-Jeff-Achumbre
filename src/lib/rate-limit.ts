import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export interface RateLimitResult {
  success: boolean
  questionsUsed: number
  questionsLimit: number
  uploadsUsed: number
  uploadsLimit: number
  weekStart: string
  canQuestion: boolean
  canUpload: boolean
  message?: string
}

export interface UsageTrackingParams {
  ipAddress: string
  actionType: 'question' | 'upload' | 'delete'
  documentId?: string
  responseTimeMs?: number
  userAgent?: string
  metadata?: Record<string, unknown>
}

// Get Korean timezone week start (Monday 00:00 KST)
function getKoreanWeekStart(): Date {
  const now = new Date()
  const kst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }))

  // Get Monday of current week in KST
  const dayOfWeek = kst.getDay()
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

  const monday = new Date(kst)
  monday.setDate(kst.getDate() + daysToMonday)
  monday.setHours(0, 0, 0, 0)

  return monday
}

// Extract IP address from various sources
export function getClientIP(request: Request): string {
  // Try various headers that might contain the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  // Fallback to a default for development
  return '127.0.0.1'
}

// Check rate limits for an IP address using database function
export async function checkRateLimit(ipAddress: string): Promise<RateLimitResult> {
  try {
    // Use the optimized PostgreSQL function
    const { data, error } = await supabase.rpc('check_rate_limit', {
      user_ip: ipAddress,
      action_type_param: 'question'
    })

    if (error) {
      console.error('Rate limit check error:', error)
      return {
        success: false,
        questionsUsed: 0,
        questionsLimit: 10,
        uploadsUsed: 0,
        uploadsLimit: 3,
        weekStart: getKoreanWeekStart().toISOString().split('T')[0],
        canQuestion: true,
        canUpload: true,
        message: 'Error checking rate limits, allowing request'
      }
    }

    const result = data || {}

    return {
      success: true,
      questionsUsed: result.questions_used || 0,
      questionsLimit: result.questions_limit || 10,
      uploadsUsed: result.uploads_used || 0,
      uploadsLimit: result.uploads_limit || 3,
      weekStart: result.week_start || getKoreanWeekStart().toISOString().split('T')[0],
      canQuestion: result.can_question ?? true,
      canUpload: result.can_upload ?? true,
      message: (result.can_question && result.can_upload) ? 'Within limits' : 'Rate limit exceeded'
    }
  } catch (error) {
    console.error('Rate limit check error:', error)
    return {
      success: false,
      questionsUsed: 0,
      questionsLimit: 10,
      uploadsUsed: 0,
      uploadsLimit: 3,
      weekStart: getKoreanWeekStart().toISOString().split('T')[0],
      canQuestion: true,
      canUpload: true,
      message: 'Error checking rate limits, allowing request'
    }
  }
}

// Track usage using database function
export async function trackUsage(params: UsageTrackingParams): Promise<boolean> {
  try {
    // Use the optimized PostgreSQL function
    const { data, error } = await supabase.rpc('track_usage', {
      user_ip: params.ipAddress,
      action_type_param: params.actionType,
      document_id_param: params.documentId || null,
      response_time_param: params.responseTimeMs || null,
      user_agent_param: params.userAgent || null,
      metadata_param: params.metadata || {}
    })

    if (error) {
      console.error('Usage tracking error:', error)
      return false
    }

    return data === true
  } catch (error) {
    console.error('Usage tracking error:', error)
    return false
  }
}

// Get analytics data for display
export async function getAnalyticsData() {
  try {
    const today = new Date().toISOString().split('T')[0]
    const weekStart = getKoreanWeekStart().toISOString().split('T')[0]

    // Get today's stats with optimized query
    const { data: todayStats, error: todayError } = await supabase
      .from('usage_analytics')
      .select('action_type, response_time_ms')
      .gte('timestamp', today + 'T00:00:00.000Z')
      .lt('timestamp', today + 'T23:59:59.999Z')

    if (todayError) {
      console.error('Today stats error:', todayError)
    }

    // Get this week's stats
    const { data: weekStats, error: weekError } = await supabase
      .from('usage_analytics')
      .select('action_type')
      .eq('week_start', weekStart)

    if (weekError) {
      console.error('Week stats error:', weekError)
    }

    // Get unique IPs for active users (last 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { data: activeUsers, error: activeError } = await supabase
      .from('usage_analytics')
      .select('ip_address')
      .gte('timestamp', oneHourAgo)

    if (activeError) {
      console.error('Active users error:', activeError)
    }

    const questionsToday = todayStats?.filter((s: { action_type: string }) => s.action_type === 'question').length || 0
    const uploadsToday = todayStats?.filter((s: { action_type: string }) => s.action_type === 'upload').length || 0

    const questionsThisWeek = weekStats?.filter((s: { action_type: string }) => s.action_type === 'question').length || 0
    const uploadsThisWeek = weekStats?.filter((s: { action_type: string }) => s.action_type === 'upload').length || 0

    // Calculate average response time
    const responseTimes = todayStats
      ?.filter((s: { action_type: string; response_time_ms?: number }) => s.action_type === 'question' && s.response_time_ms)
      .map((s: { response_time_ms: number }) => s.response_time_ms) || []

    const avgResponseTime = responseTimes.length > 0
      ? Math.round(responseTimes.reduce((a: number, b: number) => a + b, 0) / responseTimes.length / 1000 * 10) / 10
      : 1.8

    // Count unique active users
    const uniqueActiveUsers = new Set(activeUsers?.map((u: { ip_address: string }) => u.ip_address) || []).size

    return {
      questionsToday,
      uploadsToday,
      questionsThisWeek,
      uploadsThisWeek,
      avgResponseTime,
      activeUsers: Math.max(uniqueActiveUsers, 1) // At least 1 if someone is viewing
    }
  } catch (error) {
    console.error('Analytics data error:', error)
    return {
      questionsToday: 0,
      uploadsToday: 0,
      questionsThisWeek: 0,
      uploadsThisWeek: 0,
      avgResponseTime: 1.8,
      activeUsers: 1
    }
  }
}

// Clean up expired documents using database function
export async function cleanupExpiredDocuments(): Promise<number> {
  try {
    // First get expired documents for storage cleanup
    const { data: expiredDocs, error: fetchError } = await supabase
      .from('documents')
      .select('id, storage_path')
      .lt('expires_at', new Date().toISOString())

    if (fetchError) {
      console.error('Cleanup fetch error:', fetchError)
      return 0
    }

    // Delete files from storage before database cleanup
    if (expiredDocs && expiredDocs.length > 0) {
      for (const doc of expiredDocs) {
        if (doc.storage_path) {
          const { error: storageError } = await supabase.storage
            .from('documents')
            .remove([doc.storage_path])

          if (storageError) {
            console.error('Storage deletion error:', storageError)
          }
        }
      }
    }

    // Use the optimized PostgreSQL function for database cleanup
    const { data: deletedCount, error: cleanupError } = await supabase.rpc('cleanup_expired_documents')

    if (cleanupError) {
      console.error('Database cleanup error:', cleanupError)
      return 0
    }

    return deletedCount || 0
  } catch (error) {
    console.error('Cleanup error:', error)
    return 0
  }
}