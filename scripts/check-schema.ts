import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { sql } from 'drizzle-orm'

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client)

async function checkSchema() {
  try {
    console.log('🔍 Checking database schema...\n')

    // Check session table structure
    const sessionColumns = await db.execute(sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'session'
      ORDER BY ordinal_position
    `)

    console.log('📊 Session table columns:')
    console.table(sessionColumns)

    // Check user table structure
    const userColumns = await db.execute(sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'user'
      ORDER BY ordinal_position
    `)

    console.log('\n👤 User table columns:')
    console.table(userColumns)

    // Check account table structure
    const accountColumns = await db.execute(sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'account'
      ORDER BY ordinal_position
    `)

    console.log('\n🔐 Account table columns:')
    console.table(accountColumns)

    console.log('\n✅ Schema check completed!')
  } catch (error) {
    console.error('❌ Error checking schema:', error)
    throw error
  } finally {
    await client.end()
  }
}

checkSchema()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed:', error)
    process.exit(1)
  })
