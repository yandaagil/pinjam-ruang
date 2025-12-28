import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from '@/lib/auth-client'
import { LoginFormValues, loginSchema } from '../validations/login.validation'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { push, refresh } = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (values: LoginFormValues) => {
    setIsLoading(true)
    try {
      const result = await signIn.email({
        email: values.email,
        password: values.password
      })

      if (result.error) {
        toast.error(result.error.message || 'Login gagal')
        return
      }

      toast.success('Login berhasil!')
      push('/dashboard')
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
    form,
    onSubmit
  }
}
