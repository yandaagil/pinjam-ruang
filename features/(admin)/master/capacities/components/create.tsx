'use client'

import FormInput from '@/components/common/form-input'
import Modal from '@/components/common/modal'
import { Button } from '@/components/ui/button'
import { getFormInputList } from '../constants/form-input-list'
import { useCreate } from '../hooks/useCreate'
import { CapacityFormValues } from '../validations/capacity.schema'
import { Form } from '@/components/ui/form'
import { Plus } from 'lucide-react'
import { LoadingButton } from '@/components/common/loading-button'

const Create = () => {
  const { isModalOpen, setIsModalOpen, form, onSubmit, isLoading } = useCreate()
  const FormInputList = getFormInputList<CapacityFormValues>()

  return (
    <Modal
      trigger={
        <Button size="sm">
          <Plus />
          Tambah Kapasitas
        </Button>
      }
      title="Tambah Kapasitas"
      dialogDescription="Tambah kapasitas baru untuk ruang."
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {FormInputList.map(input => (
            <FormInput<CapacityFormValues>
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