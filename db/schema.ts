import { pgTable, text, varchar, integer, timestamp, pgEnum, boolean, unique } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'user'])
export const reservationStatusEnum = pgEnum('reservation_status', ['pending', 'accepted', 'declined', 'cancelled'])
export const roomStatusEnum = pgEnum('room_status', ['active', 'maintenance', 'renovation', 'inactive'])

// Users Table (compatible with Better Auth)
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  // Custom fields for our app
  role: userRoleEnum('role').default('user').notNull(),
  isActive: boolean('is_active').default(true).notNull()
})

// Sessions Table (required by Better Auth)
export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
})

// Accounts Table (required by Better Auth)
export const accounts = pgTable('account', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Verifications Table (required by Better Auth)
export const verifications = pgTable('verification', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Room Types Table
export const roomTypes = pgTable('room_types', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Room Locations Table
export const roomLocations = pgTable('room_locations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  location: varchar('location', { length: 100 }).notNull().unique(),
  building: varchar('building', { length: 100 }),
  floor: integer('floor'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Room Capacities Table
export const roomCapacities = pgTable('room_capacities', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  capacity: integer('capacity').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Facilities Table
export const facilities = pgTable('facilities', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  facility: varchar('facility', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Rooms Table
export const rooms = pgTable('rooms', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 100 }).notNull().unique(),
  code: varchar('code', { length: 20 }).unique(), // Room code/number
  description: text('description'),
  image: text('image'), // Room image URL
  roomTypeId: text('room_type_id')
    .notNull()
    .references(() => roomTypes.id),
  roomCapacityId: text('room_capacity_id')
    .notNull()
    .references(() => roomCapacities.id),
  roomLocationId: text('room_location_id')
    .notNull()
    .references(() => roomLocations.id),
  status: roomStatusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Room Facilities (Many-to-Many relationship)
export const roomFacilities = pgTable(
  'room_facilities',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    roomId: text('room_id')
      .notNull()
      .references(() => rooms.id, { onDelete: 'cascade' }),
    facilityId: text('facility_id')
      .notNull()
      .references(() => facilities.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull()
  },
  (table) => ({
    uniqueRoomFacility: unique().on(table.roomId, table.facilityId)
  })
)

// Reservations Table
export const reservations = pgTable('reservations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  eventName: varchar('event_name', { length: 255 }).notNull(),
  description: text('description'),
  roomId: text('room_id')
    .notNull()
    .references(() => rooms.id),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  participants: integer('participants').notNull(),
  notes: text('notes'), // Additional notes
  status: reservationStatusEnum('status').default('pending').notNull(),
  reviewedBy: text('reviewed_by').references(() => users.id), // Admin who reviewed
  reviewedAt: timestamp('reviewed_at'),
  rejectionReason: text('rejection_reason'), // If declined
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  reservations: many(reservations),
  reviewedReservations: many(reservations),
  sessions: many(sessions),
  accounts: many(accounts)
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id]
  })
}))

export const roomTypesRelations = relations(roomTypes, ({ many }) => ({
  rooms: many(rooms)
}))

export const roomLocationsRelations = relations(roomLocations, ({ many }) => ({
  rooms: many(rooms)
}))

export const roomCapacitiesRelations = relations(roomCapacities, ({ many }) => ({
  rooms: many(rooms)
}))

export const facilitiesRelations = relations(facilities, ({ many }) => ({
  roomFacilities: many(roomFacilities)
}))

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  roomType: one(roomTypes, {
    fields: [rooms.roomTypeId],
    references: [roomTypes.id]
  }),
  roomCapacity: one(roomCapacities, {
    fields: [rooms.roomCapacityId],
    references: [roomCapacities.id]
  }),
  roomLocation: one(roomLocations, {
    fields: [rooms.roomLocationId],
    references: [roomLocations.id]
  }),
  roomFacilities: many(roomFacilities),
  reservations: many(reservations)
}))

export const roomFacilitiesRelations = relations(roomFacilities, ({ one }) => ({
  room: one(rooms, {
    fields: [roomFacilities.roomId],
    references: [rooms.id]
  }),
  facility: one(facilities, {
    fields: [roomFacilities.facilityId],
    references: [facilities.id]
  })
}))

export const reservationsRelations = relations(reservations, ({ one }) => ({
  room: one(rooms, {
    fields: [reservations.roomId],
    references: [rooms.id]
  }),
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id]
  }),
  reviewer: one(users, {
    fields: [reservations.reviewedBy],
    references: [users.id]
  })
}))
