import instance from '@/lib/axios'
import { RoomFormValues } from '../validations/room.schema'

const roomService = {
  createRoom: (payload: RoomFormValues) => instance.post('/master/rooms', payload),
  getRoom: (id: string) => instance.get(`/master/rooms/${id}`),
  getAllRooms: (page: number = 1, pageSize: number = 10) =>
    instance.get('/master/rooms', { params: { page, pageSize } }),
  updateRoom: (id: string, payload: Partial<RoomFormValues>) => instance.put(`/master/rooms/${id}`, payload),
  deleteRoom: (id: string) => instance.delete(`/master/rooms/${id}`)
}

export default roomService
