'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomWithDetails } from '@/types/database.type'
import { useUpdateRoom } from './useRoomQuery'
import { RoomFormValues, roomSchema } from '../validations/room.schema'

export const useUpdate = (data: RoomWithDetails) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useUpdateRoom()

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: data.name,
      code: data.code || '',
      description: data.description || '',
      roomTypeId: data.roomType.id,
      roomCapacityId: data.roomCapacity.id,
      roomLocationId: data.roomLocation.id,
      facilities: data.roomFacilities.map((facility) => facility.id) || [],
      status: data.status
    }
  })

  const onSubmit: SubmitHandler<RoomFormValues> = async (formData) => {
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
