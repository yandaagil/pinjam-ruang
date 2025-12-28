'use client'

import FormInput from '@/components/common/form-input'
import Modal from '@/components/common/modal'
import { Button } from '@/components/ui/button'
import { useCreate } from '../hooks/useCreate'
import { Form } from '@/components/ui/form'
import { Plus } from 'lucide-react'
import { LoadingButton } from '@/components/common/loading-button'
import { UserFormValues } from '../validations/user.schema'
import { getFormInputList } from '../constants/form-input-list'

const Create = () => {
  const { isModalOpen, setIsModalOpen, form, onSubmit, isLoading } = useCreate()
  const FormInputList = getFormInputList<UserFormValues>()

  return (
    <Modal
      trigger={
        <Button size="sm">
          <Plus />
          Tambah User
        </Button>
      }
      title="Tambah User"
      dialogDescription="Tambah user baru ke sistem."
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {FormInputList.map(input => (
            <FormInput<UserFormValues>
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
