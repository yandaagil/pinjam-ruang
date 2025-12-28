import { ReservationWithDetails } from '@/types/database.type'

export const dummyReservations: ReservationWithDetails[] = [
  {
    id: '1',
    eventName: 'Rapat Koordinasi Tim',
    description: 'Rapat bulanan tim development',
    roomId: 'room-1',
    userId: 'user-1',
    startTime: new Date('2025-12-22T09:00:00'),
    endTime: new Date('2025-12-22T11:00:00'),
    participants: 10,
    notes: 'Butuh proyektor',
    status: 'pending',
    reviewedBy: null,
    reviewedAt: null,
    rejectionReason: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    room: {
      id: 'room-1',
      name: 'Ruang Meeting A',
      code: 'MTG-A',
      description: 'Ruang meeting kapasitas sedang',
      image: null,
      roomTypeId: 'type-1',
      roomCapacityId: 'cap-1',
      roomLocationId: 'loc-1',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      roomType: {
        id: 'type-1',
        name: 'Meeting Room',
        description: 'Standard meeting room',
        createdAt: new Date()
      },
      roomCapacity: {
        id: 'cap-1',
        capacity: 15,
        description: 'Up to 15 people',
        createdAt: new Date()
      },
      roomLocation: {
        id: 'loc-1',
        location: 'Lantai 2',
        building: 'Gedung Utama',
        floor: 2,
        description: 'Sayap Kanan',
        createdAt: new Date()
      },
      roomFacilities: [
        {
          facility: {
            id: 'fac-1',
            facility: 'Proyektor',
            description: 'Proyektor HD',
            createdAt: new Date()
          }
        }
      ]
    },
    user: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user',
      isActive: true
    }
  },
  {
    id: '2',
    eventName: 'Workshop Design System',
    description: 'Workshop pengenalan design system baru',
    roomId: 'room-2',
    userId: 'user-1',
    startTime: new Date('2025-12-23T13:00:00'),
    endTime: new Date('2025-12-23T16:00:00'),
    participants: 25,
    notes: 'Setup kursi U-shape',
    status: 'accepted',
    reviewedBy: 'admin-1',
    reviewedAt: new Date('2025-12-20T10:00:00'),
    rejectionReason: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    room: {
      id: 'room-2',
      name: 'Aula Utama',
      code: 'HALL-1',
      description: 'Aula besar untuk acara',
      image: null,
      roomTypeId: 'type-2',
      roomCapacityId: 'cap-2',
      roomLocationId: 'loc-1',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      roomType: {
        id: 'type-2',
        name: 'Hall',
        description: 'Large hall',
        createdAt: new Date()
      },
      roomCapacity: {
        id: 'cap-2',
        capacity: 100,
        description: 'Up to 100 people',
        createdAt: new Date()
      },
      roomLocation: {
        id: 'loc-1',
        location: 'Lantai 1',
        building: 'Gedung Utama',
        floor: 1,
        description: 'Lobby Area',
        createdAt: new Date()
      },
      roomFacilities: [
        {
          facility: {
            id: 'fac-2',
            facility: 'Sound System',
            description: 'Full sound system',
            createdAt: new Date()
          }
        }
      ]
    },
    user: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user',
      isActive: true
    }
  },
  {
    id: '3',
    eventName: 'Sesi Brainstorming',
    description: 'Brainstorming fitur baru',
    roomId: 'room-1',
    userId: 'user-1',
    startTime: new Date('2025-12-24T10:00:00'),
    endTime: new Date('2025-12-24T12:00:00'),
    participants: 5,
    notes: null,
    status: 'declined',
    reviewedBy: 'admin-1',
    reviewedAt: new Date('2025-12-21T09:00:00'),
    rejectionReason: 'Ruangan sedang dalam perbaikan AC',
    createdAt: new Date(),
    updatedAt: new Date(),
    room: {
      id: 'room-1',
      name: 'Ruang Meeting A',
      code: 'MTG-A',
      description: 'Ruang meeting kapasitas sedang',
      image: null,
      roomTypeId: 'type-1',
      roomCapacityId: 'cap-1',
      roomLocationId: 'loc-1',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      roomType: {
        id: 'type-1',
        name: 'Meeting Room',
        description: 'Standard meeting room',
        createdAt: new Date()
      },
      roomCapacity: {
        id: 'cap-1',
        capacity: 15,
        description: 'Up to 15 people',
        createdAt: new Date()
      },
      roomLocation: {
        id: 'loc-1',
        location: 'Lantai 2',
        building: 'Gedung Utama',
        floor: 2,
        description: 'Sayap Kanan',
        createdAt: new Date()
      },
      roomFacilities: []
    },
    user: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user',
      isActive: true
    }
  }
]
