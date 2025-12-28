import { FormInputType } from '@/components/common/form-input'
import type { Path } from 'react-hook-form'

export function getFormInputList<T>(): FormInputType<T>[] {
  return [
    {
      name: 'facility' as Path<T>,
      label: 'Fasilitas',
      inputVariant: 'text',
      placeholder: 'Masukkan fasilitas ruang'
    },
    {
      name: 'description' as Path<T>,
      label: 'Deskripsi (opsional)',
      inputVariant: 'textarea',
      placeholder: 'Masukkan deskripsi',
      isRequired: false
    }
  ]
}
