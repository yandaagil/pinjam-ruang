import { createFacility, getAllFacilities } from '@/db/queries/master/facility'
import { requireAdmin } from '@/lib/auth-server'
import { facilitySchema } from '@/features/(admin)/master/facilities/validations/facility.schema'
import { NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { paginationSchema } from '@/schemas/pagination.schema'

export async function POST(request: Request) {
  // Validasi autentikasi dan authorization (hanya admin)
  const authResult = await requireAdmin()
  if (authResult.error) {
    return authResult.response
  }

  try {
    const body = await request.json()

    // Validasi input menggunakan Zod schema
    const validatedData = facilitySchema.parse(body)

    // Buat facility baru
    const result = await createFacility(validatedData)

    return NextResponse.json(
      {
        message: 'Fasilitas berhasil dibuat',
        data: result
      },
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}

export async function GET(request: Request) {
  // Validasi autentikasi (hanya admin yang bisa mengakses)
  const authResult = await requireAdmin()
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

    const data = await getAllFacilities(page, pageSize)
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Gagal mengambil semua facilities:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Terjadi kesalahan saat mengambil data fasilitas'
      },
      { status: 500 }
    )
  }
}
