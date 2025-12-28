import { db } from '@/db'
import { roomTypes } from '@/db/schema'
import { RoomTypeFormValues } from '@/features/(admin)/master/room-types/validations/room-type.schema'
import { eq, asc, count } from 'drizzle-orm'

/**
 * Get all room types with pagination
 */
export async function getAllRoomTypes(page: number = 1, pageSize: number = 10) {
  const offset = (page - 1) * pageSize

  const [data, totalCount] = await Promise.all([
    db.query.roomTypes.findMany({
      orderBy: asc(roomTypes.name),
      limit: pageSize,
      offset: offset
    }),
    db.select({ count: count() }).from(roomTypes)
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
 * Get room type by ID
 */
export async function getRoomTypeById(typeId: string) {
  return await db.query.roomTypes.findFirst({
    where: eq(roomTypes.id, typeId)
  })
}

/**
 * Create a new facility
 */
export async function createRoomType(data: RoomTypeFormValues) {
  return await db.insert(roomTypes).values(data)
}

/**
 * Update a facility by ID
 */
export async function updateRoomType(id: string, data: Partial<RoomTypeFormValues>) {
  return await db.update(roomTypes).set(data).where(eq(roomTypes.id, id)).returning({ id: roomTypes.id })
}

/**
 * Delete facility by ID
 */
export async function deleteRoomType(roomTypeId: string) {
  return await db.delete(roomTypes).where(eq(roomTypes.id, roomTypeId))
}
