'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateUser } from './useUserQuery'
import { UserFormValues, userSchema } from '../validations/user.schema'

export const useCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useCreateUser()

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      emailVerified: false,
      image: null,
      role: 'user',
      isActive: true
    }
  })

  const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        form.reset()
        setIsModalOpen(false)
      }
    })
  }

  return {
    isModalOpen,
    setIsModalOpen,
    form,
    onSubmit,
    isLoading: isPending
  }
}
