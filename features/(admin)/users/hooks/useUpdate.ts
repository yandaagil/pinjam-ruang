'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@/types/database.type'
import { useUpdateUser } from './useUserQuery'
import { UserFormValues, userSchema } from '../validations/user.schema'

export const useUpdate = (data: User) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useUpdateUser()

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      emailVerified: data.emailVerified,
      image: data.image,
      role: data.role,
      isActive: data.isActive
    }
  })

  const onSubmit: SubmitHandler<UserFormValues> = async (formData) => {
    await mutateAsync(
      { id: data.id, data: formData },
      {
        onSuccess: () => {
          form.reset()
          setIsModalOpen(false)
        }
      }
    )
  }

  return {
    isModalOpen,
    setIsModalOpen,
    form,
    onSubmit,
    isLoading: isPending
  }
}
