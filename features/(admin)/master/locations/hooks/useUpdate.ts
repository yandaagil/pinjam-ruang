'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomLocation } from '@/types/database.type'
import { useUpdateLocation } from './useLocationQuery'
import { LocationFormValues, locationSchema } from '../validations/location.schema'

export const useUpdate = (data: RoomLocation) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useUpdateLocation()

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location: data.location,
      building: data.building,
      floor: data.floor,
      description: data.description
    }
  })

  const onSubmit: SubmitHandler<LocationFormValues> = async (formData) => {
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
