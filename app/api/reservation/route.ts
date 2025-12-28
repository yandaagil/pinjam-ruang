import { createReservation, getAllReservations } from '@/db/queries/reservations/reservation'
import { requireAuth } from '@/lib/auth-server'
import { paginationSchema } from '@/schemas/pagination.schema'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = await createReservation(body)
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Gagal membuat reservation:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(request: Request) {
  // Validasi autentikasi (user atau admin bisa mengakses)
  const authResult = await requireAuth()
  if (authResult.error) {
    return authResult.response
  }

  try {
    const { searchParams } = new URL(request.url)

    // Dapatkan object plain dari searchParams
    const rawParams = Object.fromEntries(searchParams)

    // Validasi input menggunakan Zod schema
    const validatedParams = paginationSchema.parse(rawParams)

    // Gunakan nilai yang sudah divalidasi dan di-default
    const { page, pageSize } = validatedParams

    // Validasi jika page atau pageSize bukan angka valid
    if (isNaN(page) || isNaN(pageSize)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Parameter page dan pageSize harus berupa angka'
        },
        { status: 400 }
      )
    }

    const data = await getAllReservations(page, pageSize)
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Gagal mengambil semua reservations:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Terjadi kesalahan saat mengambil data reservations'
      },
      { status: 500 }
    )
  }
}
