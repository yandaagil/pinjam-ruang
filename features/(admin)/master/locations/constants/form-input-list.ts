import { FormInputType } from '@/components/common/form-input'
import type { Path } from 'react-hook-form'

export function getFormInputList<T>(): FormInputType<T>[] {
  return [
    {
      name: 'location' as Path<T>,
      label: 'Lokasi',
      inputVariant: 'text',
      placeholder: 'Masukkan lokasi'
    },
    {
      name: 'building' as Path<T>,
      label: 'Gedung',
      inputVariant: 'text',
      placeholder: 'Masukkan gedung'
    },
    {
      name: 'floor' as Path<T>,
      label: 'Lantai',
      inputVariant: 'number',
      placeholder: 'Masukkan nomor lantai (harus berupa angka)'
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
