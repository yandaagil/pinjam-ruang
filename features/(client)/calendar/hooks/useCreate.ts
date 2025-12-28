'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateReservationFormValues, createReservationSchema } from '../validations/reservation.schema'
import { useCreateReservation } from '../../../(admin)/reservations/hooks/useReservationQuery'

export const useCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useCreateReservation()

  const form = useForm<CreateReservationFormValues>({
    resolver: zodResolver(createReservationSchema),
    defaultValues: {
      eventName: '',
      description: '',
      roomId: 0,
      startTime: new Date(),
      endTime: new Date()
    }
  })

  const onSubmit: SubmitHandler<CreateReservationFormValues> = async (data) => {
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
