import * as z from 'zod'

export const locationSchema = z.object({
  location: z.string().min(1, 'Lokasi wajib diisi').max(100, 'Lokasi maksimal 100 karakter'),
  building: z.string().max(100, 'Gedung maksimal 100 karakter').optional().nullable(),
  floor: z.number().int('Lantai harus berupa angka bulat').optional().nullable(),
  description: z.string().max(255, 'Deskripsi maksimal 255 karakter').optional().nullable()
})

export type LocationFormValues = z.infer<typeof locationSchema>
