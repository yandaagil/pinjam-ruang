import instance from '@/lib/axios'

const calendarReservationServices = {
  getAllReservations: () => instance.get('/calendar')
}

export default calendarReservationServices
