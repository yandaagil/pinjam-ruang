import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import {
  users,
  roomTypes,
  roomLocations,
  roomCapacities,
  facilities,
  rooms,
  roomFacilities,
  reservations
} from '@/db/schema'

// Select Models (for data retrieved from DB)
export type User = InferSelectModel<typeof users>
export type RoomType = InferSelectModel<typeof roomTypes>
export type RoomLocation = InferSelectModel<typeof roomLocations>
export type RoomCapacity = InferSelectModel<typeof roomCapacities>
export type Facility = InferSelectModel<typeof facilities>
export type Room = InferSelectModel<typeof rooms>
export type RoomFacility = InferSelectModel<typeof roomFacilities>
export type Reservation = InferSelectModel<typeof reservations>

// Insert Models (for data to be inserted into DB)
export type NewUser = InferInsertModel<typeof users>
export type NewRoomType = InferInsertModel<typeof roomTypes>
export type NewRoomLocation = InferInsertModel<typeof roomLocations>
export type NewRoomCapacity = InferInsertModel<typeof roomCapacities>
export type NewFacility = InferInsertModel<typeof facilities>
export type NewRoom = InferInsertModel<typeof rooms>
export type NewRoomFacility = InferInsertModel<typeof roomFacilities>
export type NewReservation = InferInsertModel<typeof reservations>

// Extended Types with Relations
export type RoomWithDetails = Room & {
  roomType: RoomType
  roomCapacity: RoomCapacity
  roomLocation: RoomLocation
  roomFacilities: Array<{
    facility: Facility
  }>
}

export type ReservationWithDetails = Reservation & {
  room: RoomWithDetails
  user: User
  reviewer?: User | null
}

export type UserWithReservations = User & {
  reservations: Reservation[]
}

// Enum Types
export type UserRole = 'admin' | 'user'
export type ReservationStatus = 'pending' | 'accepted' | 'declined' | 'cancelled'
export type RoomStatus = 'active' | 'maintenance' | 'renovation' | 'inactive'
