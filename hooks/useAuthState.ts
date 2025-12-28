'use client'

import { useSession } from '@/lib/auth-client'

export const useAuthState = () => {
  const { data: session, isPending } = useSession()

  const user = session?.user
  const role = (user as { role?: string })?.role || 'user'

  const isAuthenticated = !!session
  const isAdmin = isAuthenticated && role === 'admin'
  const isUser = isAuthenticated && role === 'user'

  return {
    session,
    user,
    role,
    isAuthenticated,
    isAdmin,
    isUser,
    isPending
  }
}
