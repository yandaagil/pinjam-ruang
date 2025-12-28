import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegisterFormValues, registerSchema } from '../validations/register.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from '@/lib/auth-client'
import { toast } from 'sonner'

export const useRegister = () => {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values: RegisterFormValues) => {
    setIsLoading(true)
    try {
      const result = await signUp.email({
        email: values.email,
        password: values.password,
        name: values.fullName
      })

      if (result.error) {
        toast.error(result.error.message || 'Registrasi gagal')
        return
      }

      toast.success('Registrasi berhasil!')
      push('/login')
    } catch (error) {
      console.error('Registrasi error:', error)
      toast.error('Terjadi kesalahan saat registrasi')
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
