import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

/**
 * Hash a password using the same method as Better Auth
 * Better Auth uses crypto.scrypt with a random salt
 */
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer
  return `${salt}:${derivedKey.toString('hex')}`
}

/**
 * Verify a password against a hash
 */
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(':')
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer
  return key === derivedKey.toString('hex')
}

// Main function to demonstrate usage
async function main() {
  const password = 'password123'

  console.log('🔐 Better Auth Password Hasher')
  console.log('================================\n')

  // Hash the password
  console.log('Original password:', password)
  const hashedPassword = await hashPassword(password)
  console.log('Hashed password:', hashedPassword)
  console.log()

  // Verify the password
  const isValid = await verifyPassword(password, hashedPassword)
  console.log('Verification result:', isValid ? '✅ Valid' : '❌ Invalid')
  console.log()

  // Test with wrong password
  const wrongPassword = 'wrongpassword'
  const isInvalid = await verifyPassword(wrongPassword, hashedPassword)
  console.log('Wrong password test:', isInvalid ? '❌ Should be invalid!' : '✅ Correctly rejected')
  console.log()

  // Generate multiple hashes for seeding
  console.log('📦 Generating hashes for seed data:')
  console.log('-----------------------------------')
  const passwords = ['password123', 'admin123', 'user123']

  for (const pwd of passwords) {
    const hash = await hashPassword(pwd)
    console.log(`Password: "${pwd}"`)
    console.log(`Hash: "${hash}"`)
    console.log()
  }
}

// Run if executed directly
if (require.main === module) {
  main()
    .then(() => {
      console.log('✨ Done!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Error:', error)
      process.exit(1)
    })
}

export { hashPassword, verifyPassword }
