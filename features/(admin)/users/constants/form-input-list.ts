import { FormInputType } from '@/components/common/form-input'
import type { Path } from 'react-hook-form'

export function getFormInputList<T>(): FormInputType<T>[] {
  return [
    {
      name: 'name' as Path<T>,
      label: 'Nama',
      inputVariant: 'text',
      placeholder: 'Masukkan nama user'
    },
    {
      name: 'email' as Path<T>,
      label: 'Email',
      inputVariant: 'text',
      placeholder: 'Masukkan email user'
    },
    {
      name: 'role' as Path<T>,
      label: 'Role',
      inputVariant: 'select',
      placeholder: 'Pilih role user',
      inputOptions: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
      ]
    },
    {
      name: 'emailVerified' as Path<T>,
      label: 'Status Verifikasi Email',
      inputVariant: 'select',
      placeholder: 'Pilih status verifikasi',
      inputOptions: [
        { label: 'Terverifikasi', value: 'true' },
        { label: 'Belum Verifikasi', value: 'false' }
      ]
    },
    {
      name: 'isActive' as Path<T>,
      label: 'Status Aktif',
      inputVariant: 'select',
      placeholder: 'Pilih status aktif',
      inputOptions: [
        { label: 'Aktif', value: 'true' },
        { label: 'Tidak Aktif', value: 'false' }
      ]
    }
  ]
}
