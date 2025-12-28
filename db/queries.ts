import { db } from '@/db'
import { reservations, roomFacilities } from '@/db/schema'
import { eq, and, or, gte, lte } from 'drizzle-orm'

/**
 * Get all facilities for a specific room
 */
export async function getRoomFacilities(roomId: string) {
  return await db.query.roomFacilities.findMany({
    where: eq(roomFacilities.roomId, roomId),
    with: {
      facility: true
    }
  })
}

/**
 * Check if room is available for booking
 * Returns conflicting reservations if any
 */
export async function checkRoomAvailability(
  roomId: string,
  startTime: Date,
  endTime: Date,
  excludeReservationId?: string
) {
  const baseCondition = and(
    eq(reservations.roomId, roomId),
    or(eq(reservations.status, 'accepted'), eq(reservations.status, 'pending')),
    or(
      // Check if new booking overlaps with existing bookings
      and(lte(reservations.startTime, startTime), gte(reservations.endTime, startTime)),
      and(lte(reservations.startTime, endTime), gte(reservations.endTime, endTime)),
      and(gte(reservations.startTime, startTime), lte(reservations.endTime, endTime))
    )
  )

  const whereCondition = excludeReservationId
    ? and(baseCondition, eq(reservations.id, excludeReservationId))
    : baseCondition

  const conflicts = await db.query.reservations.findMany({
    where: whereCondition,
    with: {
      user: true
    }
  })

  return {
    isAvailable: conflicts.length === 0,
    conflicts
  }
}
