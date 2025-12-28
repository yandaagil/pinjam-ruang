import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Get session from request headers
 * Returns session or null if not authenticated
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return session
}

/**
 * Require authentication - returns user or throws error
 * Use this in API routes that require authentication
 */
export async function requireAuth() {
  const session = await getSession()

  if (!session || !session.user) {
    return {
      error: true,
      response: NextResponse.json(
        { error: 'Unauthorized', message: 'Anda harus login terlebih dahulu' },
        { status: 401 }
      )
    }
  }

  return {
    error: false,
    session,
    user: session.user
  }
}

/**
 * Require admin role - returns user or throws error
 * Use this in API routes that require admin access
 */
export async function requireAdmin() {
  const authResult = await requireAuth()

  if (authResult.error) {
    return authResult
  }

  const user = authResult.user
  if (!user || user.role !== 'admin') {
    return {
      error: true,
      response: NextResponse.json(
        { error: 'Forbidden', message: 'Anda tidak memiliki akses untuk melakukan operasi ini' },
        { status: 403 }
      )
    }
  }

  return {
    error: false,
    session: authResult.session,
    user: user
  }
}
