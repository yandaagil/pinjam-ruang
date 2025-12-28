import * as z from 'zod'

export const reservationSchema = z
  .object({
    eventName: z.string().min(1, 'Nama event wajib diisi').max(255, 'Nama event maksimal 255 karakter'),
    description: z.string().max(255, 'Deskripsi maksimal 255 karakter').optional().nullable(),
    roomId: z.number().int('ID ruangan harus berupa angka bulat').min(1, 'Ruangan wajib dipilih'),
    userId: z.string().min(1, 'User ID wajib diisi'),
    startTime: z.date({ message: 'Waktu mulai wajib diisi' }),
    endTime: z.date({ message: 'Waktu selesai wajib diisi' }),
    participants: z.number().int('Jumlah peserta harus berupa angka bulat').min(1, 'Jumlah peserta minimal 1'),
    notes: z.string().max(255, 'Deskripsi maksimal 255 karakter').optional().nullable(),
    status: z.enum(['pending', 'accepted', 'declined', 'cancelled']).default('pending'),
    reviewedBy: z.string().optional().nullable(),
    reviewedAt: z.date().optional().nullable(),
    rejectionReason: z.string().max(255, 'Deskripsi maksimal 255 karakter').optional().nullable()
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'Waktu selesai harus lebih besar dari waktu mulai',
    path: ['endTime']
  })

export type ReservationFormValues = z.infer<typeof reservationSchema>

// Schema untuk create reservation (user input)
export const createReservationSchema = reservationSchema.pick({
  eventName: true,
  description: true,
  roomId: true,
  startTime: true,
  endTime: true,
  participants: true,
  notes: true
})

export type CreateReservationFormValues = z.infer<typeof createReservationSchema>

// Schema untuk update status reservation (admin action)
export const updateReservationStatusSchema = z
  .object({
    status: z.enum(['accepted', 'declined']),
    rejectionReason: z.string().max(255, 'Deskripsi maksimal 255 karakter').optional().nullable()
  })
  .refine(
    (data) => {
      if (data.status === 'declined') {
        return !!data.rejectionReason
      }
      return true
    },
    {
      message: 'Alasan penolakan wajib diisi jika status ditolak',
      path: ['rejectionReason']
    }
  )

export type UpdateReservationStatusFormValues = z.infer<typeof updateReservationStatusSchema>
