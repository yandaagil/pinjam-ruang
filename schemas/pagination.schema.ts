import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.preprocess((a) => parseInt(z.string().parse(a) || '1', 10), z.number().int().min(1).default(1)),
  pageSize: z.preprocess((a) => parseInt(z.string().parse(a) || '10', 10), z.number().int().min(1).max(100).default(10))
})
