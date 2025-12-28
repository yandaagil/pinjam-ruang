import * as z from 'zod'

export const facilitySchema = z.object({
  facility: z.string().min(1, 'Nama fasilitas wajib diisi').max(100, 'Nama fasilitas maksimal 100 karakter'),
  description: z.string().max(255, 'Deskripsi maksimal 255 karakter').optional().nullable()
})

export type FacilityFormValues = z.infer<typeof facilitySchema>
