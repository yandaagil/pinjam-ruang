import instance from '@/lib/axios'
import { LocationFormValues } from '../validations/location.schema'

const locationServices = {
  createLocation: (payload: LocationFormValues) => instance.post('/master/locations', payload),
  getLocation: (id: string) => instance.get(`/master/locations/${id}`),
  getAllLocations: (page: number = 1, pageSize: number = 10) =>
    instance.get('/master/locations', { params: { page, pageSize } }),
  updateLocation: (id: string, payload: Partial<LocationFormValues>) =>
    instance.put(`/master/locations/${id}`, payload),
  deleteLocation: (id: string) => instance.delete(`/master/locations/${id}`)
}

export default locationServices
