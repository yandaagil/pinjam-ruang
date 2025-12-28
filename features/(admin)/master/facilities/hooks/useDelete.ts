'use client'

import { useState } from 'react'
import { Facility } from '@/types/database.type'
import { useDeleteFacility } from './useFacilityQuery'

export const useDelete = (data: Facility) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useDeleteFacility()

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
