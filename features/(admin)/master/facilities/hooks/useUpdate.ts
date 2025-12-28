'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Facility } from '@/types/database.type'
import { useUpdateFacility } from './useFacilityQuery'
import { FacilityFormValues, facilitySchema } from '../validations/facility.schema'

export const useUpdate = (data: Facility) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useUpdateFacility()

  const form = useForm<FacilityFormValues>({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      facility: data.facility,
      description: data.description
    }
  })

  const onSubmit: SubmitHandler<FacilityFormValues> = async (formData) => {
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
