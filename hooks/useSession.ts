import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Server-side session check
 * Redirects to '/' if user role is user, to '/dashboard' if user role is admin
 */
export async function checkAuthSession() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    if (session.user.role === 'admin') {
      redirect('/dashboard')
    } else {
      redirect('/')
    }
  }

  return session
}

/**
 * Server-side session check for admin-only routes
 * Redirects to login if user is not logged in
 * Redirects to '/' if user is not admin
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  if (session.user.role !== 'admin') {
    redirect('/')
  }

  return session
}

/**
 * Server-side session check for user-only routes
 * Redirects to login if user is not logged in
 * Redirects to '/dashboard' if user is admin
 */
export async function requireUser() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  if (session.user.role === 'admin') {
    redirect('/dashboard')
  }

  return session
}
