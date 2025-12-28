import * as z from 'zod'

export const roomSchema = z.object({
  name: z.string().min(1, 'Nama ruangan wajib diisi').max(100, 'Nama ruangan maksimal 100 karakter'),
  code: z.string().max(20, 'Kode ruangan maksimal 20 karakter').optional().nullable(),
  description: z.string().max(255, 'Deskripsi maksimal 255 karakter').optional().nullable(),
  image: z.string().optional().nullable(),
  roomTypeId: z.string().min(1, 'Tipe ruangan wajib dipilih'),
  roomCapacityId: z.string().min(1, 'Kapasitas ruangan wajib dipilih'),
  roomLocationId: z.string().min(1, 'Lokasi ruangan wajib dipilih'),
  facilities: z.array(z.string()).min(1, 'Pilih minimal 1 fasilitas'),
  status: z.enum(['active', 'maintenance', 'renovation', 'inactive'])
})

export type RoomFormValues = z.infer<typeof roomSchema>
