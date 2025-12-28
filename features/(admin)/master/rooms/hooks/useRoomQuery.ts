import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { RoomFormValues } from '../validations/room.schema'
import { toast } from 'sonner'
import { RoomWithDetails } from '@/types/database.type'
import roomService from '../services/room.service'
import type { Response } from '@/types/response.type'

// Query Keys
export const roomKeys = {
  all: ['rooms'] as const,
  lists: () => [...roomKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...roomKeys.lists(), { page, pageSize }] as const,
  details: () => [...roomKeys.all, 'detail'] as const,
  detail: (id: string) => [...roomKeys.details(), id] as const
}

// Query Hook - Get All Rooms
export function useRooms(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: roomKeys.list(page, pageSize),
    queryFn: async () => await roomService.getAllRooms(page, pageSize),
    select: (data) => data.data as Response<RoomWithDetails[]>
  })
}

// Query Hook - Get Room by ID
export function useRoom(id: string) {
  return useQuery({
    queryKey: roomKeys.detail(id),
    queryFn: async () => await roomService.getRoom(id),
    enabled: !!id
  })
}

// Mutation Hook - Create Room
export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomFormValues) => {
      return await roomService.createRoom(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() })
      toast.success('Ruangan berhasil ditambahkan!')
    },
    onError: (error) => {
      console.error('Error creating room:', error)
      toast.error('Gagal menambahkan ruangan!')
    }
  })
}

// Mutation Hook - Update Room
export function useUpdateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<RoomFormValues> }) => {
      return await roomService.updateRoom(id, data)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() })
      queryClient.invalidateQueries({ queryKey: roomKeys.detail(variables.id) })
      toast.success('Ruangan berhasil diperbarui!')
    },
    onError: (error) => {
      console.error('Error updating room:', error)
      toast.error('Gagal memperbarui ruangan!')
    }
  })
}

// Mutation Hook - Delete Room
export function useDeleteRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      return await roomService.deleteRoom(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() })
      toast.success('Ruangan berhasil dihapus!')
    },
    onError: (error) => {
      console.error('Error deleting room:', error)
      toast.error('Gagal menghapus ruangan!')
    }
  })
}
