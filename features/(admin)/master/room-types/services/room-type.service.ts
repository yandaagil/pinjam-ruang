import instance from '@/lib/axios'
import { RoomTypeFormValues } from '../validations/room-type.schema'

const roomTypeServices = {
  createRoomType: (payload: RoomTypeFormValues) => instance.post('/master/room-types', payload),
  getRoomType: (id: string) => instance.get(`/master/room-types/${id}`),
  getAllRoomTypes: (page: number = 1, pageSize: number = 10) =>
    instance.get('/master/room-types', { params: { page, pageSize } }),
  updateRoomType: (id: string, payload: Partial<RoomTypeFormValues>) =>
    instance.put(`/master/room-types/${id}`, payload),
  deleteRoomType: (id: string) => instance.delete(`/master/room-types/${id}`)
}

export default roomTypeServices
