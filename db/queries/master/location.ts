import { db } from '@/db'
import { roomLocations } from '@/db/schema'
import { LocationFormValues } from '@/features/(admin)/master/locations/validations/location.schema'
import { eq, asc, count } from 'drizzle-orm'

/**
 * Get all room locations with pagination
 */
export async function getAllRoomLocations(page: number = 1, pageSize: number = 10) {
  const offset = (page - 1) * pageSize

  const [data, totalCount] = await Promise.all([
    db.query.roomLocations.findMany({
      orderBy: asc(roomLocations.location),
      limit: pageSize,
      offset: offset
    }),
    db.select({ count: count() }).from(roomLocations)
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
 * Get room location by ID
 */
export async function getRoomLocationById(locationId: string) {
  return await db.query.roomLocations.findFirst({
    where: eq(roomLocations.id, locationId)
  })
}

/**
 * Create a new room location
 */
export async function createRoomLocation(data: LocationFormValues) {
  return await db.insert(roomLocations).values(data)
}

/**
 * Update a room location by ID
 */
export async function updateRoomLocation(id: string, data: Partial<LocationFormValues>) {
  return await db.update(roomLocations).set(data).where(eq(roomLocations.id, id)).returning({ id: roomLocations.id })
}

/**
 * Delete room location by ID
 */
export async function deleteRoomLocation(locationId: string) {
  return await db.delete(roomLocations).where(eq(roomLocations.id, locationId))
}
