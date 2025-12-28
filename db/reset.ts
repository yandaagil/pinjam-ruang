import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { sql } from 'drizzle-orm'

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client)

async function reset() {
  try {
    console.log('⚠️  Dropping all tables...')

    // Drop all tables (in correct order due to foreign key dependencies)
    await db.execute(sql`DROP TABLE IF EXISTS reservations CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS room_facilities CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS rooms CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS facilities CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS room_capacities CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS room_locations CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS room_types CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS account CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS session CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS verification CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS "user" CASCADE`)

    // Drop enums
    await db.execute(sql`DROP TYPE IF EXISTS user_role CASCADE`)
    await db.execute(sql`DROP TYPE IF EXISTS reservation_status CASCADE`)
    await db.execute(sql`DROP TYPE IF EXISTS room_status CASCADE`)

    console.log('✅ All tables dropped successfully!')
    console.log('ℹ️  Now run: npm run db:push')
  } catch (error) {
    console.error('❌ Error dropping tables:', error)
    throw error
  } finally {
    await client.end()
  }
}

reset()
  .then(() => {
    console.log('🎉 Reset completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to reset:', error)
    process.exit(1)
  })
