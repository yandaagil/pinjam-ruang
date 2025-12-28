import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { FacilityFormValues } from '../validations/facility.schema'
import { toast } from 'sonner'
import { Facility } from '@/types/database.type'
import facilityService from '../services/facility.service'
import type { Response } from '@/types/response.type'

// Query Keys
export const facilityKeys = {
  all: ['facilities'] as const,
  lists: () => [...facilityKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...facilityKeys.lists(), { page, pageSize }] as const,
  details: () => [...facilityKeys.all, 'detail'] as const,
  detail: (id: string) => [...facilityKeys.details(), id] as const
}

// Query Hook - Get All Facilities
export function useFacilities(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: facilityKeys.list(page, pageSize),
    queryFn: async () => await facilityService.getAllFacilities(page, pageSize),
    select: (data) => data.data as Response<Facility[]>
  })
}

// Query Hook - Get Facility by ID
export function useFacility(id: string) {
  return useQuery({
    queryKey: facilityKeys.detail(id),
    queryFn: async () => await facilityService.getFacility(id),
    enabled: !!id
  })
}

// Mutation Hook - Create Facility
export function useCreateFacility() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: FacilityFormValues) => {
      return await facilityService.createFacility(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: facilityKeys.lists() })
      toast.success('Fasilitas berhasil ditambahkan!')
    },
    onError: (error) => {
      console.error('Error creating facility:', error)
      toast.error('Gagal menambahkan fasilitas!')
    }
  })
}

// Mutation Hook - Update Facility
export function useUpdateFacility() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<FacilityFormValues> }) => {
      return await facilityService.updateFacility(id, data)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: facilityKeys.lists() })
      queryClient.invalidateQueries({ queryKey: facilityKeys.detail(variables.id) })
      toast.success('Fasilitas berhasil diperbarui!')
    },
    onError: (error) => {
      console.error('Error updating facility:', error)
      toast.error('Gagal memperbarui fasilitas!')
    }
  })
}

// Mutation Hook - Delete Facility
export function useDeleteFacility() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      return await facilityService.deleteFacility(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: facilityKeys.lists() })
      toast.success('Fasilitas berhasil dihapus!')
    },
    onError: (error) => {
      console.error('Error deleting facility:', error)
      toast.error('Gagal menghapus fasilitas!')
    }
  })
}
