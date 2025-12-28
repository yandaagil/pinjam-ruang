'use client'

import { useState } from 'react'
import { RoomWithDetails } from '@/types/database.type'
import { useDeleteRoom } from './useRoomQuery'

export const useDelete = (data: RoomWithDetails) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useDeleteRoom()

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
