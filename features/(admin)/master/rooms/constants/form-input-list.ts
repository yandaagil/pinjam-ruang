import { FormInputType } from '@/components/common/form-input'
import type { Path } from 'react-hook-form'
import { Options } from '@/components/ui/combobox'

export function getFormInputList<T>(
  roomTypes: Options[] = [],
  capacities: Options[] = [],
  locations: Options[] = [],
  facilities: Options[] = []
): FormInputType<T>[] {
  return [
    {
      name: 'name' as Path<T>,
      label: 'Nama Ruangan',
      inputVariant: 'text',
      placeholder: 'Masukkan nama ruangan'
    },
    {
      name: 'code' as Path<T>,
      label: 'Kode Ruangan (opsional)',
      inputVariant: 'text',
      placeholder: 'Masukkan kode ruangan',
      isRequired: false
    },
    {
      name: 'description' as Path<T>,
      label: 'Deskripsi (opsional)',
      inputVariant: 'textarea',
      placeholder: 'Masukkan deskripsi',
      isRequired: false
    },
    {
      name: 'roomTypeId' as Path<T>,
      label: 'Tipe Ruangan',
      inputVariant: 'select',
      inputOptions: roomTypes,
      placeholder: 'Pilih tipe ruangan'
    },
    {
      name: 'roomCapacityId' as Path<T>,
      label: 'Kapasitas',
      inputVariant: 'select',
      inputOptions: capacities,
      placeholder: 'Pilih kapasitas'
    },
    {
      name: 'roomLocationId' as Path<T>,
      label: 'Lokasi',
      inputVariant: 'select',
      inputOptions: locations,
      placeholder: 'Pilih lokasi'
    },
    {
      name: 'facilities' as Path<T>,
      label: 'Fasilitas',
      inputVariant: 'multi-select',
      inputOptions: facilities,
      placeholder: 'Pilih fasilitas'
    },
    {
      name: 'status' as Path<T>,
      label: 'Status',
      inputVariant: 'select',
      inputOptions: [
        { value: 'active', label: 'Aktif' },
        { value: 'maintenance', label: 'Maintenance' },
        { value: 'renovation', label: 'Renovasi' },
        { value: 'inactive', label: 'Tidak Aktif' }
      ],
      placeholder: 'Pilih status'
    }
  ]
}
