import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CapacityFormValues } from '../validations/capacity.schema'
import { toast } from 'sonner'
import capacityService from '../services/capacity.service'
import { RoomCapacity } from '@/types/database.type'
import type { Response } from '@/types/response.type'

// Query Keys
export const capacityKeys = {
  all: ['capacities'] as const,
  lists: () => [...capacityKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...capacityKeys.lists(), { page, pageSize }] as const,
  details: () => [...capacityKeys.all, 'detail'] as const,
  detail: (id: string) => [...capacityKeys.details(), id] as const
}

// Query Hook - Get All Capacities
export function useCapacities(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: capacityKeys.list(page, pageSize),
    queryFn: async () => await capacityService.getAllCapacities(page, pageSize),
    select: (data) => data.data as Response<RoomCapacity[]>
  })
}

// Query Hook - Get Capacity by ID
export function useCapacity(id: string) {
  return useQuery({
    queryKey: capacityKeys.detail(id),
    queryFn: async () => await capacityService.getCapacity(id),
    enabled: !!id
  })
}

// Mutation Hook - Create Capacity
export function useCreateCapacity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CapacityFormValues) => {
      return await capacityService.createCapacity(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: capacityKeys.lists() })
      toast.success('Kapasitas berhasil ditambahkan!')
    },
    onError: (error) => {
      console.error('Error creating capacity:', error)
      toast.error('Gagal menambahkan kapasitas!')
    }
  })
}

// Mutation Hook - Update Capacity
export function useUpdateCapacity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CapacityFormValues> }) => {
      return await capacityService.updateCapacity(id, data)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: capacityKeys.lists() })
      queryClient.invalidateQueries({ queryKey: capacityKeys.detail(variables.id) })
      toast.success('Kapasitas berhasil diperbarui!')
    },
    onError: (error) => {
      console.error('Error updating capacity:', error)
      toast.error('Gagal memperbarui kapasitas!')
    }
  })
}

// Mutation Hook - Delete Capacity
export function useDeleteCapacity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      return await capacityService.deleteCapacity(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: capacityKeys.lists() })
      toast.success('Kapasitas berhasil dihapus!')
    },
    onError: (error) => {
      console.error('Error deleting capacity:', error)
      toast.error('Gagal menghapus kapasitas!')
    }
  })
}
