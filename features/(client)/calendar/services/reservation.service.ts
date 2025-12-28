import instance from '@/lib/axios'
import { ReservationFormValues } from '../validations/reservation.schema'

const reservationServices = {
  createReservation: (payload: ReservationFormValues) => instance.post('/reservation', payload)
}

export default reservationServices
