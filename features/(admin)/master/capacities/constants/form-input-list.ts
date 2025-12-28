import { FormInputType } from '@/components/common/form-input'
import type { Path } from 'react-hook-form'

export function getFormInputList<T>(): FormInputType<T>[] {
  return [
    {
      name: 'capacity' as Path<T>,
      label: 'Kapasitas',
      inputVariant: 'number',
      placeholder: 'Masukkan kapasitas ruang (harus berupa angka)'
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
