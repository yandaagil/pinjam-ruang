import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { push, refresh } = useRouter()

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const result = await authClient.signOut()

      if (result.error) {
        toast.error(result.error.message || 'Logout gagal')
        return
      }

      toast.success('Logout berhasil!')
      push('/login')
      refresh()
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Terjadi kesalahan saat login')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    onSubmit
  }
}
