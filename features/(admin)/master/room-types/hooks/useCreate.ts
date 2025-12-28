'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomTypeFormValues, roomTypeSchema } from '../validations/room-type.schema'
import { useCreateRoomType } from './useRoomTypeQuery'

export const useCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useCreateRoomType()

  const form = useForm<RoomTypeFormValues>({
    resolver: zodResolver(roomTypeSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const onSubmit: SubmitHandler<RoomTypeFormValues> = async (data) => {
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
