'use client'

import { useState } from 'react'
import { RoomType } from '@/types/database.type'
import { useDeleteRoomType } from './useRoomTypeQuery'

export const useDelete = (data: RoomType) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useDeleteRoomType()

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
