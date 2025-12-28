'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateLocation } from './useLocationQuery'
import { LocationFormValues, locationSchema } from '../validations/location.schema'

export const useCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useCreateLocation()

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location: '',
      building: '',
      floor: 1,
      description: ''
    }
  })

  const onSubmit: SubmitHandler<LocationFormValues> = async (data) => {
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
