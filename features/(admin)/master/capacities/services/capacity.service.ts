import instance from '@/lib/axios'
import { CapacityFormValues } from '../validations/capacity.schema'

const capacityService = {
  createCapacity: (payload: CapacityFormValues) => instance.post('/master/capacities', payload),
  getCapacity: (id: string) => instance.get(`/master/capacities/${id}`),
  getAllCapacities: (page: number = 1, pageSize: number = 10) =>
    instance.get('/master/capacities', { params: { page, pageSize } }),
  updateCapacity: (id: string, payload: Partial<CapacityFormValues>) =>
    instance.put(`/master/capacities/${id}`, payload),
  deleteCapacity: (id: string) => instance.delete(`/master/capacities/${id}`)
}

export default capacityService
