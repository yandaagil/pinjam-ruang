'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CapacityFormValues, capacitySchema } from '../validations/capacity.schema'
import { useUpdateCapacity } from './useCapacityQuery'
import { RoomCapacity } from '@/types/database.type'

export const useUpdate = (data: RoomCapacity) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useUpdateCapacity()

  const form = useForm<CapacityFormValues>({
    resolver: zodResolver(capacitySchema),
    defaultValues: {
      capacity: data.capacity,
      description: data.description
    }
  })

  const onSubmit: SubmitHandler<CapacityFormValues> = async (formData) => {
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
