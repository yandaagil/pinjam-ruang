import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'
import {
  users,
  accounts,
  roomTypes,
  roomLocations,
  roomCapacities,
  facilities,
  rooms,
  roomFacilities,
  reservations
} from './schema'

const scryptAsync = promisify(scrypt)

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer
  return `${salt}:${derivedKey.toString('hex')}`
}

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client)

async function seed() {
  try {
    console.log('🌱 Seeding database...')

    // Seed Users (Better Auth compatible)
    console.log('👥 Seeding users...')
    const [admin, user1, user2] = await db
      .insert(users)
      .values([
        {
          name: 'Administrator',
          email: 'admin@pinjamruang.com',
          emailVerified: true,
          role: 'admin'
        },
        {
          name: 'Budi Santoso',
          email: 'budi@example.com',
          emailVerified: true,
          role: 'user'
        },
        {
          name: 'Siti Nurhaliza',
          email: 'siti@example.com',
          emailVerified: true,
          role: 'user'
        }
      ])
      .returning()

    console.log('💾 Seeding accounts...')
    const hashedPassword = await hashPassword('password123')
    await db.insert(accounts).values([
      {
        userId: admin.id,
        accountId: admin.email, // Better Auth uses email as accountId for credential provider
        providerId: 'credential',
        password: hashedPassword
      },
      {
        userId: user1.id,
        accountId: user1.email, // Better Auth uses email as accountId for credential provider
        providerId: 'credential',
        password: hashedPassword
      },
      {
        userId: user2.id,
        accountId: user2.email, // Better Auth uses email as accountId for credential provider
        providerId: 'credential',
        password: hashedPassword
      }
    ])
    console.log(`✅ Seeded ${3} users with password: password123`)
    console.log(`🔐 Password hash: ${hashedPassword}`)

    // Seed Room Types
    console.log('🏢 Seeding room types...')
    const [meetingRoom, conferenceRoom, classRoom, auditorium, coworkingSpace] = await db
      .insert(roomTypes)
      .values([
        {
          name: 'Ruang Rapat',
          description: 'Ruang rapat standar untuk kelompok kecil hingga menengah'
        },
        {
          name: 'Ruang Konferensi',
          description: 'Ruang besar untuk konferensi dan presentasi'
        },
        {
          name: 'Ruang Kelas',
          description: 'Ruang pendidikan untuk pelatihan dan workshop'
        },
        {
          name: 'Auditorium',
          description: 'Venue besar untuk acara dan seminar'
        },
        {
          name: 'Ruang Co-working',
          description: 'Ruang kerja fleksibel untuk kolaborasi'
        }
      ])
      .returning()
    console.log(`✅ Seeded ${5} room types`)

    // Seed Room Locations
    console.log('📍 Seeding room locations...')
    const [loc1, loc2, loc3, loc4, loc5] = await db
      .insert(roomLocations)
      .values([
        {
          location: 'Gedung A - Lantai 1',
          building: 'Gedung A',
          floor: 1,
          description: 'Lantai dasar gedung A'
        },
        {
          location: 'Gedung A - Lantai 2',
          building: 'Gedung A',
          floor: 2,
          description: 'Lantai dua gedung A'
        },
        {
          location: 'Gedung B - Lantai 1',
          building: 'Gedung B',
          floor: 1,
          description: 'Lantai dasar gedung B'
        },
        {
          location: 'Gedung B - Lantai 3',
          building: 'Gedung B',
          floor: 3,
          description: 'Lantai tiga gedung B'
        },
        {
          location: 'Gedung C - Lantai 1',
          building: 'Gedung C',
          floor: 1,
          description: 'Lantai dasar gedung C'
        }
      ])
      .returning()
    console.log(`✅ Seeded ${5} room locations`)

    // Seed Room Capacities
    console.log('👥 Seeding room capacities...')
    const [cap10, cap20, cap30, cap50, cap100] = await db
      .insert(roomCapacities)
      .values([
        { capacity: 10, description: 'Ruang kecil untuk maksimal 10 orang' },
        { capacity: 20, description: 'Ruang menengah untuk maksimal 20 orang' },
        { capacity: 30, description: 'Ruang besar untuk maksimal 30 orang' },
        { capacity: 50, description: 'Ruang ekstra besar untuk maksimal 50 orang' },
        { capacity: 100, description: 'Auditorium untuk maksimal 100 orang' }
      ])
      .returning()
    console.log(`✅ Seeded ${5} room capacities`)

    // Seed Facilities
    console.log('🛠️ Seeding facilities...')
    const [projector, whiteboard, wifi, ac, soundSystem, tv, videoConference, flipChart, coffee, parking] = await db
      .insert(facilities)
      .values([
        {
          facility: 'Proyektor',
          description: 'Proyektor HD untuk presentasi'
        },
        {
          facility: 'Papan Tulis',
          description: 'Papan tulis besar dengan spidol'
        },
        {
          facility: 'WiFi',
          description: 'Internet nirkabel berkecepatan tinggi'
        },
        {
          facility: 'AC',
          description: 'Sistem pendingin ruangan'
        },
        {
          facility: 'Sound System',
          description: 'Peralatan audio profesional'
        },
        {
          facility: 'TV Layar',
          description: 'Layar LCD/LED besar'
        },
        {
          facility: 'Video Conference',
          description: 'Peralatan konferensi video'
        },
        {
          facility: 'Flip Chart',
          description: 'Stand flip chart portable'
        },
        {
          facility: 'Kopi/Teh',
          description: 'Minuman gratis'
        },
        {
          facility: 'Parkir',
          description: 'Area parkir khusus'
        }
      ])
      .returning()
    console.log(`✅ Seeded ${10} facilities`)

    // Seed Rooms
    console.log('🚪 Seeding rooms...')
    const [room1, room2, room3, room4, room5, room6, room7] = await db
      .insert(rooms)
      .values([
        {
          name: 'Ruang Inovasi',
          code: 'A101',
          description: 'Ruang rapat modern dengan fasilitas canggih',
          roomTypeId: meetingRoom.id,
          roomCapacityId: cap20.id,
          roomLocationId: loc1.id,
          status: 'active'
        },
        {
          name: 'Ruang Eksekutif',
          code: 'A201',
          description: 'Ruang konferensi premium untuk rapat eksekutif',
          roomTypeId: conferenceRoom.id,
          roomCapacityId: cap30.id,
          roomLocationId: loc2.id,
          status: 'active'
        },
        {
          name: 'Pusat Pelatihan Alpha',
          code: 'B101',
          description: 'Ruang kelas luas untuk sesi pelatihan',
          roomTypeId: classRoom.id,
          roomCapacityId: cap50.id,
          roomLocationId: loc3.id,
          status: 'active'
        },
        {
          name: 'Auditorium Utama',
          code: 'B301',
          description: 'Auditorium besar untuk acara besar',
          roomTypeId: auditorium.id,
          roomCapacityId: cap100.id,
          roomLocationId: loc4.id,
          status: 'active'
        },
        {
          name: 'Ruang Kolaborasi 1',
          code: 'C101',
          description: 'Area co-working fleksibel',
          roomTypeId: coworkingSpace.id,
          roomCapacityId: cap10.id,
          roomLocationId: loc5.id,
          status: 'active'
        },
        {
          name: 'Ruang Rapat Cepat',
          code: 'A102',
          description: 'Ruang kecil untuk rapat singkat',
          roomTypeId: meetingRoom.id,
          roomCapacityId: cap10.id,
          roomLocationId: loc1.id,
          status: 'maintenance'
        },
        {
          name: 'Pusat Pelatihan Beta',
          code: 'B102',
          description: 'Fasilitas pelatihan tambahan',
          roomTypeId: classRoom.id,
          roomCapacityId: cap30.id,
          roomLocationId: loc3.id,
          status: 'renovation'
        }
      ])
      .returning()
    console.log(`✅ Seeded ${7} rooms`)

    // Seed Room Facilities (Many-to-Many)
    console.log('🔗 Seeding room facilities...')
    await db.insert(roomFacilities).values([
      // Innovation Hub facilities
      { roomId: room1.id, facilityId: projector.id },
      { roomId: room1.id, facilityId: whiteboard.id },
      { roomId: room1.id, facilityId: wifi.id },
      { roomId: room1.id, facilityId: ac.id },
      { roomId: room1.id, facilityId: videoConference.id },
      { roomId: room1.id, facilityId: coffee.id },

      // Executive Suite facilities
      { roomId: room2.id, facilityId: projector.id },
      { roomId: room2.id, facilityId: whiteboard.id },
      { roomId: room2.id, facilityId: wifi.id },
      { roomId: room2.id, facilityId: ac.id },
      { roomId: room2.id, facilityId: soundSystem.id },
      { roomId: room2.id, facilityId: tv.id },
      { roomId: room2.id, facilityId: videoConference.id },
      { roomId: room2.id, facilityId: coffee.id },
      { roomId: room2.id, facilityId: parking.id },

      // Training Center Alpha facilities
      { roomId: room3.id, facilityId: projector.id },
      { roomId: room3.id, facilityId: whiteboard.id },
      { roomId: room3.id, facilityId: wifi.id },
      { roomId: room3.id, facilityId: ac.id },
      { roomId: room3.id, facilityId: soundSystem.id },
      { roomId: room3.id, facilityId: flipChart.id },

      // Grand Auditorium facilities
      { roomId: room4.id, facilityId: projector.id },
      { roomId: room4.id, facilityId: wifi.id },
      { roomId: room4.id, facilityId: ac.id },
      { roomId: room4.id, facilityId: soundSystem.id },
      { roomId: room4.id, facilityId: tv.id },
      { roomId: room4.id, facilityId: videoConference.id },
      { roomId: room4.id, facilityId: parking.id },

      // Collaboration Space 1 facilities
      { roomId: room5.id, facilityId: whiteboard.id },
      { roomId: room5.id, facilityId: wifi.id },
      { roomId: room5.id, facilityId: ac.id },
      { roomId: room5.id, facilityId: coffee.id },

      // Quick Meeting Room facilities
      { roomId: room6.id, facilityId: tv.id },
      { roomId: room6.id, facilityId: wifi.id },
      { roomId: room6.id, facilityId: ac.id },

      // Training Center Beta facilities
      { roomId: room7.id, facilityId: projector.id },
      { roomId: room7.id, facilityId: whiteboard.id },
      { roomId: room7.id, facilityId: wifi.id },
      { roomId: room7.id, facilityId: ac.id }
    ])
    console.log(`✅ Seeded room facilities`)

    // Seed Reservations
    console.log('📅 Seeding reservations...')
    await db.insert(reservations).values([
      {
        eventName: 'Rapat Perencanaan Tim',
        description: 'Diskusi perencanaan dan strategi tim bulanan',
        roomId: room1.id,
        userId: user1.id,
        startTime: new Date('2025-11-25 09:00:00'),
        endTime: new Date('2025-11-25 11:00:00'),
        participants: 15,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-11-23 10:00:00')
      },
      {
        eventName: 'Presentasi Peluncuran Produk',
        description: 'Presentasi produk baru kepada stakeholder',
        roomId: room2.id,
        userId: user2.id,
        startTime: new Date('2025-11-26 14:00:00'),
        endTime: new Date('2025-11-26 16:00:00'),
        participants: 25,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-11-23 11:00:00')
      },
      {
        eventName: 'Workshop Pelatihan Karyawan',
        description: 'Sesi pelatihan untuk karyawan baru',
        roomId: room3.id,
        userId: user1.id,
        startTime: new Date('2025-11-27 09:00:00'),
        endTime: new Date('2025-11-27 17:00:00'),
        participants: 40,
        status: 'pending'
      },
      {
        eventName: 'Rapat Tahunan Perusahaan',
        description: 'Pertemuan tahunan seluruh anggota perusahaan',
        roomId: room4.id,
        userId: user1.id,
        startTime: new Date('2025-12-15 09:00:00'),
        endTime: new Date('2025-12-15 17:00:00'),
        participants: 80,
        status: 'pending'
      },
      {
        eventName: 'Sesi Brainstorming',
        description: 'Ideasi kreatif untuk proyek baru',
        roomId: room5.id,
        userId: user2.id,
        startTime: new Date('2025-11-24 13:00:00'),
        endTime: new Date('2025-11-24 15:00:00'),
        participants: 8,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-11-23 09:00:00')
      },
      {
        eventName: 'Presentasi Klien',
        description: 'Presentasi proposal kepada calon klien',
        roomId: room1.id,
        userId: user2.id,
        startTime: new Date('2025-11-28 10:00:00'),
        endTime: new Date('2025-11-28 12:00:00'),
        participants: 12,
        status: 'declined',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-11-23 12:00:00'),
        rejectionReason: 'Ruangan sudah dipesan untuk acara lain'
      },
      {
        eventName: 'Standup Tim Mingguan',
        description: 'Sinkronisasi tim mingguan rutin',
        roomId: room5.id,
        userId: user1.id,
        startTime: new Date('2025-11-24 09:00:00'),
        endTime: new Date('2025-11-24 10:00:00'),
        participants: 10,
        status: 'cancelled'
      },
      {
        eventName: 'Rapat Koordinasi Proyek',
        description: 'Koordinasi progress proyek Q4',
        roomId: room1.id,
        userId: user1.id,
        startTime: new Date('2025-12-08 10:00:00'),
        endTime: new Date('2025-12-08 12:00:00'),
        participants: 18,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-06 14:00:00')
      },
      {
        eventName: 'Workshop Agile Methodology',
        description: 'Pelatihan metodologi agile untuk tim development',
        roomId: room3.id,
        userId: user2.id,
        startTime: new Date('2025-12-09 09:00:00'),
        endTime: new Date('2025-12-09 16:00:00'),
        participants: 35,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-06 15:00:00')
      },
      {
        eventName: 'Review Performa Keuangan',
        description: 'Evaluasi performa keuangan triwulan',
        roomId: room2.id,
        userId: user1.id,
        startTime: new Date('2025-12-10 13:00:00'),
        endTime: new Date('2025-12-10 15:00:00'),
        participants: 22,
        status: 'pending'
      },
      {
        eventName: 'Sesi Mentoring Karyawan Baru',
        description: 'Program mentoring untuk onboarding karyawan',
        roomId: room5.id,
        userId: user2.id,
        startTime: new Date('2025-12-11 14:00:00'),
        endTime: new Date('2025-12-11 16:00:00'),
        participants: 8,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-06 16:00:00')
      },
      {
        eventName: 'Presentasi Roadmap 2026',
        description: 'Presentasi rencana strategis tahun 2026',
        roomId: room4.id,
        userId: user1.id,
        startTime: new Date('2025-12-12 09:00:00'),
        endTime: new Date('2025-12-12 12:00:00'),
        participants: 85,
        status: 'pending'
      },
      {
        eventName: 'Training Digital Marketing',
        description: 'Pelatihan strategi digital marketing',
        roomId: room3.id,
        userId: user2.id,
        startTime: new Date('2025-12-13 10:00:00'),
        endTime: new Date('2025-12-13 15:00:00'),
        participants: 30,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-07 09:00:00')
      },
      {
        eventName: 'Rapat Vendor',
        description: 'Diskusi kerjasama dengan vendor baru',
        roomId: room1.id,
        userId: user1.id,
        startTime: new Date('2025-12-14 14:00:00'),
        endTime: new Date('2025-12-14 16:00:00'),
        participants: 12,
        status: 'declined',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-07 10:00:00'),
        rejectionReason: 'Dokumen persyaratan belum lengkap'
      },
      {
        eventName: 'Townhall Meeting',
        description: 'Pertemuan seluruh karyawan dengan direksi',
        roomId: room4.id,
        userId: user1.id,
        startTime: new Date('2025-12-16 13:00:00'),
        endTime: new Date('2025-12-16 15:00:00'),
        participants: 95,
        status: 'pending'
      },
      {
        eventName: 'Sprint Planning',
        description: 'Perencanaan sprint development dua minggu',
        roomId: room5.id,
        userId: user2.id,
        startTime: new Date('2025-12-17 09:00:00'),
        endTime: new Date('2025-12-17 11:00:00'),
        participants: 10,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-07 11:00:00')
      },
      {
        eventName: 'Workshop Cyber Security',
        description: 'Pelatihan keamanan siber untuk semua karyawan',
        roomId: room3.id,
        userId: user1.id,
        startTime: new Date('2025-12-18 09:00:00'),
        endTime: new Date('2025-12-18 17:00:00'),
        participants: 45,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-07 12:00:00')
      },
      {
        eventName: 'Rapat Evaluasi HR',
        description: 'Evaluasi kebijakan dan program HR',
        roomId: room2.id,
        userId: user2.id,
        startTime: new Date('2025-12-19 10:00:00'),
        endTime: new Date('2025-12-19 12:00:00'),
        participants: 20,
        status: 'pending'
      },
      {
        eventName: 'Sesi Inovasi Produk',
        description: 'Brainstorming fitur produk baru',
        roomId: room1.id,
        userId: user1.id,
        startTime: new Date('2025-12-20 13:00:00'),
        endTime: new Date('2025-12-20 15:00:00'),
        participants: 15,
        status: 'cancelled'
      },
      {
        eventName: 'Pelatihan Leadership',
        description: 'Program pengembangan kepemimpinan',
        roomId: room3.id,
        userId: user2.id,
        startTime: new Date('2025-12-21 09:00:00'),
        endTime: new Date('2025-12-21 16:00:00'),
        participants: 25,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-07 13:00:00')
      },
      {
        eventName: 'Demo Aplikasi Mobile',
        description: 'Demo aplikasi mobile versi terbaru',
        roomId: room2.id,
        userId: user1.id,
        startTime: new Date('2025-12-22 14:00:00'),
        endTime: new Date('2025-12-22 16:00:00'),
        participants: 28,
        status: 'pending'
      },
      {
        eventName: 'Rapat Tim Design',
        description: 'Review design sistem baru',
        roomId: room5.id,
        userId: user2.id,
        startTime: new Date('2025-12-23 10:00:00'),
        endTime: new Date('2025-12-23 12:00:00'),
        participants: 9,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-07 14:00:00')
      },
      {
        eventName: 'Seminar Industri 4.0',
        description: 'Seminar tentang transformasi digital',
        roomId: room4.id,
        userId: user1.id,
        startTime: new Date('2025-12-26 09:00:00'),
        endTime: new Date('2025-12-26 17:00:00'),
        participants: 100,
        status: 'pending'
      },
      {
        eventName: 'Rapat Budget 2026',
        description: 'Pembahasan anggaran tahun depan',
        roomId: room2.id,
        userId: user2.id,
        startTime: new Date('2025-12-27 13:00:00'),
        endTime: new Date('2025-12-27 16:00:00'),
        participants: 24,
        status: 'declined',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-07 15:00:00'),
        rejectionReason: 'Menunggu approval dari CFO'
      },
      {
        eventName: 'Workshop Time Management',
        description: 'Pelatihan manajemen waktu efektif',
        roomId: room3.id,
        userId: user1.id,
        startTime: new Date('2025-12-28 10:00:00'),
        endTime: new Date('2025-12-28 14:00:00'),
        participants: 32,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-07 16:00:00')
      },
      {
        eventName: 'Year End Gathering',
        description: 'Acara perayaan akhir tahun perusahaan',
        roomId: room4.id,
        userId: user2.id,
        startTime: new Date('2025-12-30 18:00:00'),
        endTime: new Date('2025-12-30 22:00:00'),
        participants: 98,
        status: 'accepted',
        reviewedBy: admin.id,
        reviewedAt: new Date('2025-12-07 17:00:00')
      }
    ])
    console.log(`✅ Seeded ${27} reservations`)

    console.log('✨ Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await client.end()
  }
}

seed()
  .then(() => {
    console.log('🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to seed:', error)
    process.exit(1)
  })
