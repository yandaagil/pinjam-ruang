'use client'

import { useState } from 'react'
import { useDeleteLocation } from './useLocationQuery'
import { RoomLocation } from '@/types/database.type'

export const useDelete = (data: RoomLocation) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useDeleteLocation()

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
