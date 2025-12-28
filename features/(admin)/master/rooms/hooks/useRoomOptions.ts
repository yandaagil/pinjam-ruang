'use client'

import { useQuery } from '@tanstack/react-query'
import instance from '@/lib/axios'
import { Options } from '@/components/ui/combobox'

// Get all room types for options
export function useRoomTypeOptions() {
  return useQuery({
    queryKey: ['room-type-options'],
    queryFn: async () => {
      const response = await instance.get('/master/room-types', {
        params: { page: 1, pageSize: 100 }
      })
      const data = response.data.data
      return data.map((type: { id: string; name: string }) => ({
        value: type.id,
        label: type.name
      })) as Options[]
    }
  })
}

// Get all room capacities for options
export function useRoomCapacityOptions() {
  return useQuery({
    queryKey: ['room-capacity-options'],
    queryFn: async () => {
      const response = await instance.get('/master/capacities', {
        params: { page: 1, pageSize: 100 }
      })
      const data = response.data.data
      return data.map((capacity: { id: string; capacity: number }) => ({
        value: capacity.id,
        label: `${capacity.capacity} orang`
      })) as Options[]
    }
  })
}

// Get all room locations for options
export function useRoomLocationOptions() {
  return useQuery({
    queryKey: ['room-location-options'],
    queryFn: async () => {
      const response = await instance.get('/master/locations', {
        params: { page: 1, pageSize: 100 }
      })
      const data = response.data.data
      return data.map((location: { id: string; location: string }) => ({
        value: location.id,
        label: location.location
      })) as Options[]
    }
  })
}

// Get all facilities for options
export function useFacilitiesOptions() {
  return useQuery({
    queryKey: ['facilities-options'],
    queryFn: async () => {
      const response = await instance.get('/master/facilities', {
        params: { page: 1, pageSize: 100 }
      })
      const data = response.data.data
      return data.map((facility: { id: string; facility: string }) => ({
        value: facility.id,
        label: facility.facility
      })) as Options[]
    }
  })
}
