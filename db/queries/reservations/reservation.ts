import { db } from '@/db'
import { reservations } from '@/db/schema'
import { eq, asc, desc, and, gte, lte, count } from 'drizzle-orm'
import type { ReservationWithDetails } from '@/types/database.type'

/**
 * Create a new reservation
 */
export async function createReservation(data: typeof reservations.$inferInsert) {
  const [reservation] = await db.insert(reservations).values(data).returning()
  return reservation
}

/**
 * Get all reservations with details and pagination
 */
export async function getAllReservations(page: number = 1, pageSize: number = 10) {
  const offset = (page - 1) * pageSize

  const [data, totalCount] = await Promise.all([
    db.query.reservations.findMany({
      columns: {
        id: true,
        eventName: true,
        startTime: true,
        endTime: true,
        participants: true,
        createdAt: true,
        status: true
      },
      with: {
        room: {
          columns: {
            name: true
          },
          with: {
            roomLocation: {
              columns: {
                location: true
              }
            }
          }
        },
        user: {
          columns: {
            name: true,
            email: true
          }
        }
      },
      orderBy: desc(reservations.createdAt),
      limit: pageSize,
      offset: offset
    }),
    db.select({ count: count() }).from(reservations)
  ])

  return {
    data: data as ReservationWithDetails[],
    pagination: {
      page,
      pageSize,
      totalCount: totalCount[0].count,
      totalPages: Math.ceil(totalCount[0].count / pageSize)
    }
  }
}

export async function getAllAcceptedReservations(): Promise<ReservationWithDetails[]> {
  const result = await db.query.reservations.findMany({
    where: eq(reservations.status, 'accepted'),
    columns: {
      id: true,
      eventName: true,
      description: true,
      startTime: true,
      endTime: true,
      participants: true,
      notes: true
    },
    with: {
      room: {
        columns: {
          code: true,
          name: true
        },
        with: {
          roomLocation: {
            columns: {
              location: true
            }
          }
        }
      },
      user: {
        columns: {
          name: true
        }
      }
    },
    orderBy: desc(reservations.createdAt)
  })

  return result as ReservationWithDetails[]
}

/**
 * Get reservations by user ID
 */
export async function getReservationsByUserId(userId: string): Promise<ReservationWithDetails[]> {
  const result = await db.query.reservations.findMany({
    where: eq(reservations.userId, userId),
    columns: {
      id: true,
      eventName: true,
      startTime: true,
      endTime: true,
      participants: true,
      createdAt: true,
      status: true
    },
    with: {
      room: {
        columns: {
          name: true
        },
        with: {
          roomLocation: {
            columns: {
              location: true
            }
          }
        }
      },
      user: {
        columns: {
          name: true,
          email: true
        }
      }
    },
    orderBy: desc(reservations.createdAt)
  })

  return result as ReservationWithDetails[]
}

/**
 * Get reservation by ID
 */
export async function getReservationById(reservationId: string): Promise<ReservationWithDetails | undefined> {
  const result = await db.query.reservations.findFirst({
    where: eq(reservations.id, reservationId),
    with: {
      room: {
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
      },
      user: true,
      reviewer: true
    }
  })

  return result as ReservationWithDetails | undefined
}

/**
 * Get pending reservations
 */
export async function getPendingReservations(): Promise<ReservationWithDetails[]> {
  const result = await db.query.reservations.findMany({
    where: eq(reservations.status, 'pending'),
    with: {
      room: {
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
      },
      user: true,
      reviewer: true
    },
    orderBy: asc(reservations.startTime)
  })

  return result as ReservationWithDetails[]
}

/**
 * Get reservations by date range
 */
export async function getReservationsByDateRange(startDate: Date, endDate: Date): Promise<ReservationWithDetails[]> {
  const result = await db.query.reservations.findMany({
    where: and(gte(reservations.startTime, startDate), lte(reservations.endTime, endDate)),
    with: {
      room: {
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
      },
      user: true,
      reviewer: true
    },
    orderBy: asc(reservations.startTime)
  })

  return result as ReservationWithDetails[]
}

/**
 * Check room availability
 */
export async function checkRoomAvailability(roomId: string, startTime: Date, endTime: Date) {
  const whereCondition = and(
    eq(reservations.roomId, roomId),
    eq(reservations.status, 'accepted'),
    gte(reservations.endTime, startTime),
    lte(reservations.startTime, endTime)
  )

  const conflictingReservations = await db.query.reservations.findMany({
    where: whereCondition
  })

  return conflictingReservations.length === 0
}

/**
 * Update reservation status
 */
export async function updateReservationStatus(
  reservationId: string,
  status: 'accepted' | 'declined' | 'cancelled',
  reviewedBy?: string,
  rejectionReason?: string
) {
  const [updated] = await db
    .update(reservations)
    .set({
      status,
      reviewedBy,
      reviewedAt: new Date(),
      rejectionReason,
      updatedAt: new Date()
    })
    .where(eq(reservations.id, reservationId))
    .returning()

  return updated
}
