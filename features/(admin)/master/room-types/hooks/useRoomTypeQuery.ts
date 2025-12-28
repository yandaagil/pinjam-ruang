import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { RoomTypeFormValues } from '../validations/room-type.schema'
import { toast } from 'sonner'
import roomTypeServices from '../services/room-type.service'
import { RoomType } from '@/types/database.type'
import type { Response } from '@/types/response.type'

// Query Keys
export const roomTypeKeys = {
  all: ['roomTypes'] as const,
  lists: () => [...roomTypeKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...roomTypeKeys.lists(), { page, pageSize }] as const,
  details: () => [...roomTypeKeys.all, 'detail'] as const,
  detail: (id: string) => [...roomTypeKeys.details(), id] as const
}

// Query Hook - Get All Room Types
export function useRoomTypes(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: roomTypeKeys.list(page, pageSize),
    queryFn: async () => await roomTypeServices.getAllRoomTypes(page, pageSize),
    select: (data) => data.data as Response<RoomType[]>
  })
}

// Query Hook - Get Room Type by ID
export function useRoomType(id: string) {
  return useQuery({
    queryKey: roomTypeKeys.detail(id),
    queryFn: async () => await roomTypeServices.getRoomType(id),
    enabled: !!id
  })
}

// Mutation Hook - Create Room Type
export function useCreateRoomType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomTypeFormValues) => {
      return await roomTypeServices.createRoomType(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomTypeKeys.lists() })
      toast.success('Tipe ruangan berhasil ditambahkan!')
    },
    onError: (error) => {
      console.error('Error creating room type:', error)
      toast.error('Gagal menambahkan tipe ruangan!')
    }
  })
}

// Mutation Hook - Update Room Type
export function useUpdateRoomType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<RoomTypeFormValues> }) => {
      return await roomTypeServices.updateRoomType(id, data)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: roomTypeKeys.lists() })
      queryClient.invalidateQueries({ queryKey: roomTypeKeys.detail(variables.id) })
      toast.success('Tipe ruangan berhasil diperbarui!')
    },
    onError: (error) => {
      console.error('Error updating room type:', error)
      toast.error('Gagal memperbarui tipe ruangan!')
    }
  })
}

// Mutation Hook - Delete Room Type
export function useDeleteRoomType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      return await roomTypeServices.deleteRoomType(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomTypeKeys.lists() })
      toast.success('Tipe ruangan berhasil dihapus!')
    },
    onError: (error) => {
      console.error('Error deleting room type:', error)
      toast.error('Gagal menghapus tipe ruangan!')
    }
  })
}
