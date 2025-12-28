'use client'

import { useState } from 'react'
import { User } from '@/types/database.type'
import { useDeleteUser } from './useUserQuery'

export const useDelete = (data: User) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useDeleteUser()

  const handleDelete = async () => {
    await mutateAsync(data.id, {
      onSuccess: () => {
        setIsModalOpen(false)
      }
    })
  }

  return {
    isModalOpen,
    setIsModalOpen,
    isLoading: isPending,
    handleDelete
  }
}
