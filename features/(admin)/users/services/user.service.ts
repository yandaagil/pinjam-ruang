import instance from '@/lib/axios'
import { UserFormValues } from '../validations/user.schema'

const userServices = {
  createUser: (payload: UserFormValues) => instance.post('/user', payload),
  getUser: (id: string) => instance.get(`/user/${id}`),
  getAllUsers: (page: number = 1, pageSize: number = 10) => instance.get('/user', { params: { page, pageSize } }),
  updateUser: (id: string, payload: Partial<UserFormValues>) => instance.put(`/user/${id}`, payload),
  deleteUser: (id: string) => instance.delete(`/user/${id}`)
}

export default userServices
