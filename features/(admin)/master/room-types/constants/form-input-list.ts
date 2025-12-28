import { FormInputType } from '@/components/common/form-input'
import type { Path } from 'react-hook-form'

export function getFormInputList<T>(): FormInputType<T>[] {
  return [
    {
      name: 'name' as Path<T>,
      label: 'Tipe Ruangan',
      inputVariant: 'text',
      placeholder: 'Tipe Ruangan'
    },
    {
      name: 'description' as Path<T>,
      label: 'Deskripsi',
      inputVariant: 'textarea',
      placeholder: 'Deskripsi (opsional)',
      isRequired: false
    }
  ]
}
