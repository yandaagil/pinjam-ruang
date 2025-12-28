import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        message: 'Data yang dikirim tidak valid',
        details: error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      },
      { status: 400 }
    )
  }

  // Cek jika error terkait JSON parsing (misalnya, jika error berupa SyntaxError)
  if (error instanceof SyntaxError && error.message.includes('JSON')) {
    return NextResponse.json({ error: 'Bad Request', message: 'Payload body bukan JSON yang valid' }, { status: 400 })
  }

  console.error('API Error:', error)
  return NextResponse.json(
    {
      error: 'Internal Server Error',
      message: 'Terjadi kesalahan pada server.'
    },
    { status: 500 }
  )
}
