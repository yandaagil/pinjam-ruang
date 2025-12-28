'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CapacityFormValues, capacitySchema } from '../validations/capacity.schema'
import { useCreateCapacity } from './useCapacityQuery'

export const useCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useCreateCapacity()

  const form = useForm<CapacityFormValues>({
    resolver: zodResolver(capacitySchema),
    defaultValues: {
      capacity: 1,
      description: ''
    }
  })

  const onSubmit: SubmitHandler<CapacityFormValues> = async (data) => {
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
