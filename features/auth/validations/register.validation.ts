import * as z from 'zod'

export const registerSchema = z
  .object({
    fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
    email: z.email({
      pattern: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
      error: 'Email tidak valid'
    }),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string().min(8, 'Konfirmasi password minimal 8 karakter')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak sama dengan konfirmasi password',
    path: ['confirmPassword']
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
