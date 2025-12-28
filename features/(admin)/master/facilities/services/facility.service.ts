import instance from '@/lib/axios'
import { FacilityFormValues } from '../validations/facility.schema'

const facilityService = {
  createFacility: (payload: FacilityFormValues) => instance.post('/master/facilities', payload),
  getFacility: (id: string) => instance.get(`/master/facilities/${id}`),
  getAllFacilities: (page: number = 1, pageSize: number = 10) =>
    instance.get('/master/facilities', { params: { page, pageSize } }),
  updateFacility: (id: string, payload: Partial<FacilityFormValues>) =>
    instance.put(`/master/facilities/${id}`, payload),
  deleteFacility: (id: string) => instance.delete(`/master/facilities/${id}`)
}

export default facilityService
