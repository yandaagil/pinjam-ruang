import { FormInputType } from '@/components/common/form-input'
import type { Path } from 'react-hook-form'

export function getFormInputList<T>(): FormInputType<T>[] {
  return [
    {
      name: 'event_name' as Path<T>,
      label: 'Nama Acara',
      inputVariant: 'text',
      placeholder: 'Masukkan nama acara'
    },
    {
      name: 'description' as Path<T>,
      label: 'Deskripsi (opsional)',
      inputVariant: 'textarea',
      placeholder: 'Masukkan deskripsi',
      isRequired: false
    },
    {
      name: 'room_id' as Path<T>,
      label: 'Ruangan',
      inputVariant: 'select',
      placeholder: 'Pilih ruangan',
      inputOptions: [
        { value: 'room_1', label: 'Ruang 1' },
        { value: 'room_2', label: 'Ruang 2' },
        { value: 'room_3', label: 'Ruang 3' }
      ]
    },
    {
      name: 'start_time' as Path<T>,
      label: 'Tanggal & Waktu Mulai',
      inputVariant: 'date-time',
      placeholder: 'Pilih tanggal dan waktu mulai'
    },
    {
      name: 'end_time' as Path<T>,
      label: 'Tanggal & Waktu Selesai',
      inputVariant: 'date-time',
      placeholder: 'Pilih tanggal dan waktu selesai'
    },
    {
      name: 'participants' as Path<T>,
      label: 'Jumlah Peserta',
      inputVariant: 'number',
      placeholder: 'Masukkan jumlah peserta'
    },
    {
      name: 'notes' as Path<T>,
      label: 'Catatan (opsional)',
      inputVariant: 'textarea',
      placeholder: 'Masukkan catatan',
      isRequired: false
    }
  ]
}
