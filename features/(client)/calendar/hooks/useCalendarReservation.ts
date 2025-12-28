import { useQuery } from '@tanstack/react-query'
import calendarReservationServices from '../services/calendar-reservation.service'

// Query Keys
export const calendarReservationKeys = {
  all: ['calendar-reservation'] as const,
  lists: () => [...calendarReservationKeys.all, 'list'] as const,
  list: () => [...calendarReservationKeys.lists()] as const,
  details: () => [...calendarReservationKeys.all, 'detail'] as const,
  detail: (id: string) => [...calendarReservationKeys.details(), id] as const
}

// Query Hook - Get All Capacities
export function useCalendarReservation() {
  return useQuery({
    queryKey: calendarReservationKeys.lists(),
    queryFn: async () => await calendarReservationServices.getAllReservations(),
    select: (data) => data.data as any[]
  })
}

// Query Hook - Get Capacity by ID
// export function useCapacity(id: string) {
//   return useQuery({
//     queryKey: calendarReservationKeys.detail(id),
//     queryFn: async () => await calendarReservationServices.getReservationById(id),
//     enabled: !!id
//   })
// }
