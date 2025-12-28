'use client'

import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logout berhasil')
            router.push('/login')
            router.refresh()
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || 'Gagal logout')
          }
        }
      })
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Terjadi kesalahan saat logout')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline"
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  )
}
