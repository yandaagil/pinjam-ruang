import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { UserFormValues } from '../validations/user.schema'
import { toast } from 'sonner'
import { User } from '@/types/database.type'
import userServices from '../services/user.service'
import type { Response } from '@/types/response.type'

// Query Keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...userKeys.lists(), { page, pageSize }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const
}

// Query Hook - Get All Users
export function useUsers(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: userKeys.list(page, pageSize),
    queryFn: async () => await userServices.getAllUsers(page, pageSize),
    select: (data) => data.data as Response<User[]>
  })
}

// Mutation Hook - Create User
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UserFormValues) => {
      return await userServices.createUser(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      toast.success('User berhasil ditambahkan!')
    },
    onError: (error) => {
      console.error('Error creating user:', error)
      toast.error('Gagal menambahkan user!')
    }
  })
}

// Mutation Hook - Update User
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UserFormValues> }) => {
      return await userServices.updateUser(id, data)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) })
      toast.success('User berhasil diperbarui!')
    },
    onError: (error) => {
      console.error('Error updating user:', error)
      toast.error('Gagal memperbarui user!')
    }
  })
}

// Mutation Hook - Delete User
export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      return await userServices.deleteUser(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      toast.success('User berhasil dihapus!')
    },
    onError: (error) => {
      console.error('Error deleting user:', error)
      toast.error('Gagal menghapus user!')
    }
  })
}

// // Query Hook - Get Active Users
// export function useActiveUsers() {
//   return useQuery({
//     queryKey: userKeys.list({ isActive: true }),
//     queryFn: async () => await getActiveUsers()
//   })
// }

// // Query Hook - Get Admin Users
// export function useAdminUsers() {
//   return useQuery({
//     queryKey: userKeys.list({ role: 'admin' }),
//     queryFn: async () => await getAdminUsers()
//   })
// }

// // Query Hook - Get User by ID
// export function useUser(id?: string) {
//   return useQuery({
//     queryKey: userKeys.detail(id!),
//     queryFn: async () => await getUserById(id!),
//     enabled: !!id
//   })
// }

// // Query Hook - Get User by Email
// export function useUserByEmail(email?: string) {
//   return useQuery({
//     queryKey: userKeys.byEmail(email!),
//     queryFn: async () => await getUserByEmail(email!),
//     enabled: !!email
//   })
// }

// // Query Hook - Get User with Reservations
// export function useUserWithReservations(id?: string) {
//   return useQuery({
//     queryKey: userKeys.withReservations(id!),
//     queryFn: async () => await getUserWithReservations(id!),
//     enabled: !!id
//   })
// }

// // Mutation Hook - Update User Profile (User)
// export function useUpdateUserProfile() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async ({ id, data }: { id: string; data: UpdateUserProfileFormValues }) => {
//       return await db
//         .update(users)
//         .set({
//           ...data,
//           updatedAt: new Date()
//         })
//         .where(eq(users.id, id))
//     },
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) })
//       toast.success('Profil berhasil diperbarui!')
//     },
//     onError: (error) => {
//       console.error('Error updating user profile:', error)
//       toast.error('Gagal memperbarui profil!')
//     }
//   })
// }

// // Mutation Hook - Update User Role (Admin)
// export function useUpdateUserRole() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async ({ id, data }: { id: string; data: UpdateUserRoleFormValues }) => {
//       return await db
//         .update(users)
//         .set({
//           ...data,
//           updatedAt: new Date()
//         })
//         .where(eq(users.id, id))
//     },
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({ queryKey: userKeys.lists() })
//       queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) })
//       toast.success('Role user berhasil diperbarui!')
//     },
//     onError: (error) => {
//       console.error('Error updating user role:', error)
//       toast.error('Gagal memperbarui role user!')
//     }
//   })
// }

// // Mutation Hook - Toggle User Active Status
// export function useToggleUserStatus() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
//       return await db
//         .update(users)
//         .set({
//           isActive,
//           updatedAt: new Date()
//         })
//         .where(eq(users.id, id))
//     },
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({ queryKey: userKeys.lists() })
//       queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) })
//       toast.success(variables.isActive ? 'User berhasil diaktifkan!' : 'User berhasil dinonaktifkan!')
//     },
//     onError: (error) => {
//       console.error('Error toggling user status:', error)
//       toast.error('Gagal mengubah status user!')
//     }
//   })
// }
