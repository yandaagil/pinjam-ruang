import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import {
//   getAllReservations,
//   getReservationsByUserId,
//   getReservationById,
//   getPendingReservations,
//   getReservationsByDateRange,
//   checkRoomAvailability
// } from '@/db/queries/reservations/reservation'
// import type { CreateReservationFormValues, UpdateReservationStatusFormValues } from '../validations/reservation.schema'
// import { toast } from 'sonner'
// import { db } from '@/db'
// import { reservations } from '@/db/schema'
// import { eq } from 'drizzle-orm'
import reservationServices from '../services/reservation.service'
import { ReservationWithDetails } from '@/types/database.type'
import { CreateReservationFormValues } from '../../../(client)/calendar/validations/reservation.schema'
import { toast } from 'sonner'
import { Response } from '@/types/response.type'

// Query Keys
export const reservationKeys = {
  all: ['reservations'] as const,
  lists: () => [...reservationKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...reservationKeys.lists(), { page, pageSize }] as const,
  details: () => [...reservationKeys.all, 'detail'] as const,
  detail: (id: string) => [...reservationKeys.details(), id] as const,
  availability: (roomid: string, startTime: Date, endTime: Date) =>
    [...reservationKeys.all, 'availability', roomId, startTime.toISOString(), endTime.toISOString()] as const
}

// Query Hook - Get All Reservations
export function useReservations(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: reservationKeys.list(page, pageSize),
    queryFn: async () => await reservationServices.getAllReservations(page, pageSize),
    select: (data) => data.data as Response<ReservationWithDetails[]>
  })
}

// // Query Hook - Get User Reservations
// export function useUserReservations(userId?: string) {
//   return useQuery({
//     queryKey: reservationKeys.list({ userId }),
//     queryFn: async () => await getReservationsByUserId(userId!),
//     enabled: !!userId
//   })
// }

// // Query Hook - Get Pending Reservations
// export function usePendingReservations() {
//   return useQuery({
//     queryKey: reservationKeys.list({ status: 'pending' }),
//     queryFn: async () => await getPendingReservations()
//   })
// }

// // Query Hook - Get Reservations by Date Range
// export function useReservationsByDateRange(startDate?: Date, endDate?: Date) {
//   return useQuery({
//     queryKey: reservationKeys.list({
//       dateRange: startDate && endDate ? { start: startDate, end: endDate } : undefined
//     }),
//     queryFn: async () => await getReservationsByDateRange(startDate!, endDate!),
//     enabled: !!startDate && !!endDate
//   })
// }

// // Query Hook - Get Reservation by ID
// export function useReservation(id: string) {
//   return useQuery({
//     queryKey: reservationKeys.detail(id),
//     queryFn: async () => await getReservationById(id),
//     enabled: !!id
//   })
// }

// // Query Hook - Check Room Availability
// export function useRoomAvailability(roomId?: number, startTime?: Date, endTime?: Date) {
//   return useQuery({
//     queryKey: reservationKeys.availability(roomId!, startTime!, endTime!),
//     queryFn: async () => await checkRoomAvailability(roomId!, startTime!, endTime!),
//     enabled: !!roomId && !!startTime && !!endTime
//   })
// }

// // Mutation Hook - Create Reservation
export function useCreateReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateReservationFormValues & { userId: string }) => {
      // Check availability first
      // const isAvailable = await checkRoomAvailability(data.roomId, data.startTime, data.endTime)
      // if (!isAvailable) {
      //   throw new Error('Ruangan tidak tersedia pada waktu yang dipilih')
      // }
      return await reservationServices.createReservation(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() })
      toast.success('Reservasi berhasil dibuat!')
    },
    onError: (error) => {
      console.error('Error creating reservation:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal membuat reservasi!')
    }
  })
}

// // Mutation Hook - Update Reservation Status (Admin)
// export function useUpdateReservationStatus() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async ({
//       id,
//       data,
//       reviewerId
//     }: {
//       id: string
//       data: UpdateReservationStatusFormValues
//       reviewerId: string
//     }) => {
//       return await db
//         .update(reservations)
//         .set({
//           status: data.status,
//           rejectionReason: data.rejectionReason,
//           reviewedBy: reviewerId,
//           reviewedAt: new Date(),
//           updatedAt: new Date()
//         })
//         .where(eq(reservations.id, id))
//     },
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({ queryKey: reservationKeys.lists() })
//       queryClient.invalidateQueries({ queryKey: reservationKeys.detail(variables.id) })
//       toast.success(
//         variables.data.status === 'accepted' ? 'Reservasi berhasil disetujui!' : 'Reservasi berhasil ditolak!'
//       )
//     },
//     onError: (error) => {
//       console.error('Error updating reservation status:', error)
//       toast.error('Gagal memperbarui status reservasi!')
//     }
//   })
// }

// // Mutation Hook - Cancel Reservation (User)
// export function useCancelReservation() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (id: string) => {
//       return await db
//         .update(reservations)
//         .set({
//           status: 'cancelled',
//           updatedAt: new Date()
//         })
//         .where(eq(reservations.id, id))
//     },
//     onSuccess: (_, id) => {
//       queryClient.invalidateQueries({ queryKey: reservationKeys.lists() })
//       queryClient.invalidateQueries({ queryKey: reservationKeys.detail(id) })
//       toast.success('Reservasi berhasil dibatalkan!')
//     },
//     onError: (error) => {
//       console.error('Error cancelling reservation:', error)
//       toast.error('Gagal membatalkan reservasi!')
//     }
//   })
// }

// // Mutation Hook - Delete Reservation
// export function useDeleteReservation() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (id: string) => {
//       return await db.delete(reservations).where(eq(reservations.id, id))
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: reservationKeys.lists() })
//       toast.success('Reservasi berhasil dihapus!')
//     },
//     onError: (error) => {
//       console.error('Error deleting reservation:', error)
//       toast.error('Gagal menghapus reservasi!')
//     }
//   })
// }
