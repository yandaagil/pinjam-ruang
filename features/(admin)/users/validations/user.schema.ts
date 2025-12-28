import * as z from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.email('Email tidak valid').max(255, 'Email maksimal 255 karakter'),
  emailVerified: z.boolean().default(false),
  image: z.string().optional().nullable(),
  role: z.enum(['admin', 'user']).default('user'),
  isActive: z.boolean().default(true)
})

export type UserFormValues = z.infer<typeof userSchema>

// Schema untuk update user profile (user action)
export const updateUserProfileSchema = userSchema.pick({
  name: true,
  image: true
})

export type UpdateUserProfileFormValues = z.infer<typeof updateUserProfileSchema>

// Schema untuk update user role/status (admin action)
export const updateUserRoleSchema = userSchema.pick({
  role: true,
  isActive: true
})

export type UpdateUserRoleFormValues = z.infer<typeof updateUserRoleSchema>
