'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomType } from '@/types/database.type'
import { RoomTypeFormValues, roomTypeSchema } from '../validations/room-type.schema'
import { useUpdateRoomType } from './useRoomTypeQuery'

export const useUpdate = (data: RoomType) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useUpdateRoomType()

  const form = useForm<RoomTypeFormValues>({
    resolver: zodResolver(roomTypeSchema),
    defaultValues: {
      name: data.name,
      description: data.description
    }
  })

  const onSubmit: SubmitHandler<RoomTypeFormValues> = async (formData) => {
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
