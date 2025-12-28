import * as z from 'zod'

export const roomTypeSchema = z.object({
  name: z.string().min(1, 'Nama tipe ruangan wajib diisi').max(100, 'Nama tipe ruangan maksimal 100 karakter'),
  description: z.string().max(255, 'Deskripsi maksimal 255 karakter').optional().nullable()
})

export type RoomTypeFormValues = z.infer<typeof roomTypeSchema>
