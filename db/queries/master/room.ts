import { db } from '@/db'
import { rooms } from '@/db/schema'
import { eq, asc, count } from 'drizzle-orm'
import type { RoomWithDetails } from '@/types/database.type'
import { RoomFormValues } from '@/features/(admin)/master/rooms/validations/room.schema'

/**
 * Get all rooms with full details
 */
export async function getAllRooms(): Promise<RoomWithDetails[]> {
  const result = await db.query.rooms.findMany({
    columns: {
      id: true,
      code: true,
      name: true,
      description: true,
      status: true,
      createdAt: true
    },
    with: {
      roomType: {
        columns: {
          id: true,
          name: true
        }
      },
      roomCapacity: {
        columns: {
          id: true,
          capacity: true
        }
      },
      roomLocation: {
        columns: {
          id: true,
          location: true
        }
      },
      roomFacilities: {
        columns: {},
        with: {
          facility: {
            columns: {
              id: true,
              facility: true
            }
          }
        }
      }
    },
    orderBy: asc(rooms.name)
  })

  return result as RoomWithDetails[]
}

/**
 * Get all active rooms with full details
 */
export async function getActiveRooms(): Promise<RoomWithDetails[]> {
  const result = await db.query.rooms.findMany({
    where: eq(rooms.status, 'active'),
    columns: {
      id: true,
      code: true,
      name: true,
      image: true,
      description: true
    },
    with: {
      roomType: {
        columns: {
          description: true,
          name: true
        }
      },
      roomCapacity: {
        columns: {
          capacity: true
        }
      },
      roomLocation: {
        columns: {
          location: true
        }
      },
      roomFacilities: {
        columns: {},
        with: {
          facility: {
            columns: {
              facility: true
            }
          }
        }
      }
    },
    orderBy: asc(rooms.name)
  })

  return result as RoomWithDetails[]
}

/**
 * Get room by ID with full details
 */
export async function getRoomById(roomId: string): Promise<RoomWithDetails | undefined> {
  const result = await db.query.rooms.findFirst({
    where: eq(rooms.id, roomId),
    with: {
      roomType: true,
      roomCapacity: true,
      roomLocation: true,
      roomFacilities: {
        with: {
          facility: true
        }
      }
    }
  })

  return result as RoomWithDetails | undefined
}

/**
 * Get all rooms with pagination
 */
export async function getAllRoomsWithPagination(page: number = 1, pageSize: number = 10) {
  const offset = (page - 1) * pageSize

  const [data, totalCount] = await Promise.all([getAllRooms(), db.select({ count: count() }).from(rooms)])

  // Apply pagination manually since getAllRooms returns detailed data
  const paginatedData = data.slice(offset, offset + pageSize)

  return {
    data: paginatedData,
    pagination: {
      page,
      pageSize,
      totalCount: totalCount[0].count,
      totalPages: Math.ceil(totalCount[0].count / pageSize)
    }
  }
}

/**
 * Create a new room
 */
export async function createRoom(data: RoomFormValues) {
  return await db.insert(rooms).values(data).returning()
}

/**
 * Update a room by ID
 */
export async function updateRoom(id: string, data: Partial<RoomFormValues>) {
  return await db.update(rooms).set(data).where(eq(rooms.id, id)).returning({ id: rooms.id })
}

/**
 * Delete room by ID
 */
export async function deleteRoom(roomId: string) {
  return await db.delete(rooms).where(eq(rooms.id, roomId)).returning()
}
