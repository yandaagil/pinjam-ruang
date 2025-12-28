import * as z from 'zod'

export const capacitySchema = z.object({
  capacity: z
    .number()
    .min(1, { message: 'Kapasitas minimal adalah 1' })
    .max(20000, { message: 'Kapasitas maksimal adalah 20000' }),
  description: z.string().max(255, 'Deskripsi maksimal 255 karakter').optional().nullable()
})

export type CapacityFormValues = z.infer<typeof capacitySchema>
