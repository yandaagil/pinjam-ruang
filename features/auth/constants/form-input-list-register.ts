import { FormInputType } from '@/components/common/form-input'
import type { Path } from 'react-hook-form'

export function getFormInputList<T>(): FormInputType<T>[] {
  return [
    {
      name: 'fullName' as Path<T>,
      label: 'Nama Lengkap',
      inputVariant: 'text',
      placeholder: 'Masukkan nama lengkap'
    },
    {
      name: 'email' as Path<T>,
      label: 'Email',
      inputVariant: 'text',
      placeholder: 'nama@email.com'
    },
    {
      name: 'password' as Path<T>,
      label: 'Password',
      inputVariant: 'password',
      placeholder: '••••••••'
    },
    {
      name: 'confirmPassword' as Path<T>,
      label: 'Konfirmasi Password',
      inputVariant: 'password',
      placeholder: '••••••••'
    }
  ]
}
