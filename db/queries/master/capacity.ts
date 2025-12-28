import { db } from '@/db'
import { roomCapacities } from '@/db/schema'
import { CapacityFormValues } from '@/features/(admin)/master/capacities/validations/capacity.schema'
import { eq, asc, count } from 'drizzle-orm'

/**
 * Get all room capacities with pagination
 */
export async function getAllRoomCapacities(page: number = 1, pageSize: number = 10) {
  const offset = (page - 1) * pageSize

  const [data, totalCount] = await Promise.all([
    db.query.roomCapacities.findMany({
      orderBy: asc(roomCapacities.capacity),
      limit: pageSize,
      offset: offset
    }),
    db.select({ count: count() }).from(roomCapacities)
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
 * Get room capacity by ID
 */
export async function getRoomCapacityById(capacityId: string) {
  return await db.query.roomCapacities.findFirst({
    where: eq(roomCapacities.id, capacityId)
  })
}

/**
 * Create a new room capacity
 */
export async function createRoomCapacity(data: CapacityFormValues) {
  return await db.insert(roomCapacities).values(data)
}

/**
 * Update a room capacity by ID
 */
export async function updateRoomCapacity(id: string, data: Partial<CapacityFormValues>) {
  return await db.update(roomCapacities).set(data).where(eq(roomCapacities.id, id)).returning({ id: roomCapacities.id })
}

/**
 * Delete room capacity by ID
 */
export async function deleteRoomCapacity(capacityId: string) {
  return await db.delete(roomCapacities).where(eq(roomCapacities.id, capacityId))
}
