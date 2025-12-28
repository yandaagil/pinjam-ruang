'use client'

import FormInput from '@/components/common/form-input'
import Modal from '@/components/common/modal'
import { Button } from '@/components/ui/button'
import { getFormInputList } from '../constants/form-input-list'
import { Form } from '@/components/ui/form'
import { Pencil } from 'lucide-react'
import { useUpdate } from '../hooks/useUpdate'
import { RoomWithDetails } from '@/types/database.type'
import { LoadingButton } from '@/components/common/loading-button'
import { RoomFormValues } from '../validations/room.schema'
import { useRoomTypeOptions, useRoomCapacityOptions, useRoomLocationOptions, useFacilitiesOptions } from '../hooks/useRoomOptions'

const Update = ({ data }: { data: RoomWithDetails }) => {
  const { isModalOpen, setIsModalOpen, form, onSubmit, isLoading } = useUpdate(data)

  const { data: roomTypes = [] } = useRoomTypeOptions()
  const { data: capacities = [] } = useRoomCapacityOptions()
  const { data: locations = [] } = useRoomLocationOptions()
  const { data: facilities = [] } = useFacilitiesOptions()

  const FormInputList = getFormInputList<RoomFormValues>(roomTypes, capacities, locations, facilities)

  return (
    <Modal
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
      title="Ubah Ruangan"
      dialogDescription="Ubah data ruangan."
      triggerTooltip="Ubah"
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
