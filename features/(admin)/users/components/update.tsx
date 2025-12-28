'use client'

import FormInput from '@/components/common/form-input'
import Modal from '@/components/common/modal'
import { Button } from '@/components/ui/button'
import { getFormInputList } from '../constants/form-input-list'
import { Form } from '@/components/ui/form'
import { Pencil } from 'lucide-react'
import { useUpdate } from '../hooks/useUpdate'
import { User } from '@/types/database.type'
import { LoadingButton } from '@/components/common/loading-button'
import { UserFormValues } from '../validations/user.schema'

const Update = ({ data }: { data: User }) => {
  const { isModalOpen, setIsModalOpen, form, onSubmit, isLoading } = useUpdate(data)
  const FormInputList = getFormInputList<UserFormValues>()

  return (
    <Modal
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
      title="Ubah User"
      dialogDescription="Ubah data user."
      triggerTooltip="Ubah"
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
            loadingText="Mengubah..."
            text="Ubah"
            className="w-full"
            type="submit"
            disabled={!form.formState.isValid || isLoading}
          />
        </form>
      </Form>
    </Modal>
  )
}

export default Update
