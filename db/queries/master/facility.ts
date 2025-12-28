import { db } from '@/db'
import { facilities } from '@/db/schema'
import { FacilityFormValues } from '@/features/(admin)/master/facilities/validations/facility.schema'
import { eq, asc, count } from 'drizzle-orm'

/**
 * Get all facilities with pagination
 */
export async function getAllFacilities(page: number = 1, pageSize: number = 10) {
  const offset = (page - 1) * pageSize

  const [data, totalCount] = await Promise.all([
    db.query.facilities.findMany({
      orderBy: asc(facilities.facility),
      limit: pageSize,
      offset: offset
    }),
    db.select({ count: count() }).from(facilities)
  ])

  return {
    data,
    pagination: {
      page,
      pageSize,
      totalCount: totalCount[0].count,
      totalPages: Math.ceil(totalCount[0].count / pageSize)
    }
  }
}

/**
 * Get facility by ID
 */
export async function getFacilityById(facilityId: string) {
  return await db.query.facilities.findFirst({
    where: eq(facilities.id, facilityId)
  })
}

/**
 * Create a new facility
 */
export async function createFacility(data: FacilityFormValues) {
  return await db.insert(facilities).values(data)
}

/**
 * Update a facility by ID
 */
export async function updateFacility(id: string, data: Partial<FacilityFormValues>) {
  return await db.update(facilities).set(data).where(eq(facilities.id, id)).returning({ id: facilities.id })
}

/**
 * Delete facility by ID
 */
export async function deleteFacility(facilityId: string) {
  return await db.delete(facilities).where(eq(facilities.id, facilityId))
}
