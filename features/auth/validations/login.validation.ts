import * as z from 'zod'

export const loginSchema = z.object({
  email: z.email({
    pattern: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
    error: 'Email tidak valid'
  }),
  password: z.string().min(8, 'Password minimal 8 karakter')
})

export type LoginFormValues = z.infer<typeof loginSchema>
