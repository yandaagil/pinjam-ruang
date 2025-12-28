import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { LocationFormValues } from '../validations/location.schema'
import { toast } from 'sonner'
import locationServices from '../services/location.service'
import { RoomLocation } from '@/types/database.type'
import type { Response } from '@/types/response.type'

// Query Keys
export const locationKeys = {
  all: ['locations'] as const,
  lists: () => [...locationKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...locationKeys.lists(), { page, pageSize }] as const,
  details: () => [...locationKeys.all, 'detail'] as const,
  detail: (id: string) => [...locationKeys.details(), id] as const
}

// Query Hook - Get All Locations
export function useLocations(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: locationKeys.list(page, pageSize),
    queryFn: async () => await locationServices.getAllLocations(page, pageSize),
    select: (data) => data.data as Response<RoomLocation[]>
  })
}

// Query Hook - Get Location by ID
export function useLocation(id: string) {
  return useQuery({
    queryKey: locationKeys.detail(id),
    queryFn: async () => await locationServices.getLocation(id),
    enabled: !!id
  })
}

// Mutation Hook - Create Location
export function useCreateLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: LocationFormValues) => {
      return await locationServices.createLocation(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.lists() })
      toast.success('Lokasi berhasil ditambahkan!')
    },
    onError: (error) => {
      console.error('Error creating location:', error)
      toast.error('Gagal menambahkan lokasi!')
    }
  })
}

// Mutation Hook - Update Location
export function useUpdateLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<LocationFormValues> }) => {
      return await locationServices.updateLocation(id, data)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: locationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: locationKeys.detail(variables.id) })
      toast.success('Lokasi berhasil diperbarui!')
    },
    onError: (error) => {
      console.error('Error updating location:', error)
      toast.error('Gagal memperbarui lokasi!')
    }
  })
}

// Mutation Hook - Delete Location
export function useDeleteLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      return await locationServices.deleteLocation(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.lists() })
      toast.success('Lokasi berhasil dihapus!')
    },
    onError: (error) => {
      console.error('Error deleting location:', error)
      toast.error('Gagal menghapus lokasi!')
    }
  })
}
