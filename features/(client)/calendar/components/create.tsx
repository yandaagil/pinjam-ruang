'use client'

import FormInput from '@/components/common/form-input'
import { getFormInputList } from '../constants/form-input-list'
import { ReservationFormValues } from '../validations/reservation.schema'
import { Form } from '@/components/ui/form'
import { LoadingButton } from '@/components/common/loading-button'
import { useCreate } from '../hooks/useCreate'

const Create = () => {
  const { form, onSubmit, isLoading } = useCreate()
  const FormInputList = getFormInputList<ReservationFormValues>()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4">
        {FormInputList.map(input => (
          <FormInput<ReservationFormValues>
            key={input.name}
            form={form}
            inputList={input}
          />
        ))}
        <LoadingButton
          isLoading={isLoading}
          loadingText="Menambah..."
          text="Tambah"
          className="w-full"
          type="submit"
          disabled={!form.formState.isValid || isLoading}
        />
      </form>
    </Form>
  )
}

export default Create