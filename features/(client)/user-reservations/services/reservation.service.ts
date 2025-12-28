import instance from '@/lib/axios'
import { ReservationFormValues } from '../../../(client)/calendar/validations/reservation.schema'

const reservationServices = {
  createReservation: (payload: ReservationFormValues) => instance.post('/reservation', payload),
  // getReservation: (id: string) => instance.get(`/reservation/${id}`),
  getAllReservations: () => instance.get('/reservation'),
  getUserReservations: (id: string) => instance.get(`/reservation/user/${id}`)
  // updateReservation: (id: string, payload: Partial<ReservationFormValues>) =>
  //   instance.put(`/reservation/${id}`, payload),
  // deleteReservation: (id: string) => instance.delete(`/reservation/${id}`)
}

export default reservationServices
