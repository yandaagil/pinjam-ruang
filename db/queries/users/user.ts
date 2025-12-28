import { db } from '@/db'
import { users } from '@/db/schema'
import { eq, asc, desc, count } from 'drizzle-orm'
import type { UserWithReservations } from '@/types/database.type'

/**
 * Get all users
 */
export async function getAllUsers(page: number = 1, pageSize: number = 10) {
  const offset = (page - 1) * pageSize

  const [data, totalCount] = await Promise.all([
    db.query.users.findMany({
      orderBy: asc(users.name),
      limit: pageSize,
      offset: offset
    }),
    db.select({ count: count() }).from(users)
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
 * Get user by ID
 */
export async function getUserById(userId: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, userId)
  })
}

/**
 * Get user by name
 */
export async function getUserByName(name: string) {
  return await db.query.users.findFirst({
    where: eq(users.name, name)
  })
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email)
  })
}

/**
 * Get user with reservations
 */
export async function getUserWithReservations(userId: string): Promise<UserWithReservations | undefined> {
  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      reservations: {
        orderBy: desc(users.createdAt)
      }
    }
  })

  return result as UserWithReservations | undefined
}

/**
 * Get all active users
 */
export async function getActiveUsers() {
  return await db.query.users.findMany({
    where: eq(users.isActive, true),
    orderBy: asc(users.name)
  })
}

/**
 * Get all admin users
 */
export async function getAdminUsers() {
  return await db.query.users.findMany({
    where: eq(users.role, 'admin'),
    orderBy: asc(users.name)
  })
}
