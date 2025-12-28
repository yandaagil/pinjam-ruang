'use client'

import { useState } from 'react'
import { RoomCapacity } from '@/types/database.type'
import { useDeleteCapacity } from './useCapacityQuery'

export const useDelete = (data: RoomCapacity) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useDeleteCapacity()

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
