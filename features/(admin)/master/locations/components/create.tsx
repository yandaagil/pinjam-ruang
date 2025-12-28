'use client'

import FormInput from '@/components/common/form-input'
import Modal from '@/components/common/modal'
import { Button } from '@/components/ui/button'
import { useCreate } from '../hooks/useCreate'
import { Form } from '@/components/ui/form'
import { Plus } from 'lucide-react'
import { LoadingButton } from '@/components/common/loading-button'
import { getFormInputList } from '../constants/form-input-list'
import { LocationFormValues } from '../validations/location.schema'

const Create = () => {
  const { isModalOpen, setIsModalOpen, form, onSubmit, isLoading } = useCreate()
  const FormInputList = getFormInputList<LocationFormValues>()

  return (
    <Modal
      trigger={
        <Button size="sm">
          <Plus />
          Tambah Lokasi
        </Button>
      }
      title="Tambah Lokasi"
      dialogDescription="Tambah lokasi baru untuk ruang."
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {FormInputList.map(input => (
            <FormInput<LocationFormValues>
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
    </Modal>
  )
}

export default Create