'use client'

import FormInput from '@/components/common/form-input'
import Modal from '@/components/common/modal'
import { Button } from '@/components/ui/button'
import { useCreate } from '../hooks/useCreate'
import { Form } from '@/components/ui/form'
import { Plus } from 'lucide-react'
import { LoadingButton } from '@/components/common/loading-button'
import { RoomFormValues } from '../validations/room.schema'
import { getFormInputList } from '../constants/form-input-list'
import { useRoomTypeOptions, useRoomCapacityOptions, useRoomLocationOptions, useFacilitiesOptions } from '../hooks/useRoomOptions'

const Create = () => {
  const { isModalOpen, setIsModalOpen, form, onSubmit, isLoading } = useCreate()

  const { data: roomTypes = [] } = useRoomTypeOptions()
  const { data: capacities = [] } = useRoomCapacityOptions()
  const { data: locations = [] } = useRoomLocationOptions()
  const { data: facilities = [] } = useFacilitiesOptions()

  const FormInputList = getFormInputList<RoomFormValues>(roomTypes, capacities, locations, facilities)

  return (
    <Modal
      trigger={
        <Button size="sm">
          <Plus />
          Tambah Ruangan
        </Button>
      }
      title="Tambah Ruangan"
      dialogDescription="Tambah ruangan baru untuk sistem."
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {FormInputList.map(input => (
            <FormInput
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
