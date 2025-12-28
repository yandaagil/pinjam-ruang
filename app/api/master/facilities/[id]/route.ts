import { deleteFacility, getFacilityById, updateFacility } from '@/db/queries/master/facility'
import { requireAdmin } from '@/lib/auth-server'
import { facilitySchema } from '@/features/(admin)/master/facilities/validations/facility.schema'
import { NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'

interface Context {
  params: {
    id: string
  }
}

export async function PUT(request: Request, context: Context) {
  // Validasi autentikasi dan authorization (hanya admin)
  const authResult = await requireAdmin()
  if (authResult.error) {
    return authResult.response
  }

  const id = context.params.id

  // Validasi format ID (basic validation)
  if (!id || id.trim() === '') {
    return NextResponse.json(
      {
        error: 'Bad Request',
        message: 'ID tidak valid'
      },
      { status: 400 }
    )
  }

  try {
    // Cek apakah facility dengan ID tersebut ada
    const existingFacility = await getFacilityById(id)
    if (!existingFacility) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Fasilitas dengan ID tersebut tidak ditemukan'
        },
        { status: 404 }
      )
    }

    const body = await request.json()

    // Validasi input menggunakan Zod schema
    const validatedData = facilitySchema.parse(body)

    // Cek apakah ada data yang akan diupdate
    if (Object.keys(validatedData).length === 0) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Tidak ada data yang akan diperbarui'
        },
        { status: 400 }
      )
    }

    // Update facility
    const updatedFacility = await updateFacility(id, validatedData)

    return NextResponse.json(
      {
        message: 'Fasilitas berhasil diperbarui',
        data: updatedFacility
      },
      { status: 200 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: Request, context: Context) {
  // Validasi autentikasi dan authorization (hanya admin)
  const authResult = await requireAdmin()
  if (authResult.error) {
    return authResult.response
  }

  const id = context.params.id

  // Validasi format ID
  if (!id || id.trim() === '') {
    return NextResponse.json(
      {
        error: 'Bad Request',
        message: 'ID tidak valid'
      },
      { status: 400 }
    )
  }

  try {
    // Cek apakah facility dengan ID tersebut ada
    const existingFacility = await getFacilityById(id)
    if (!existingFacility) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Fasilitas dengan ID tersebut tidak ditemukan'
        },
        { status: 404 }
      )
    }

    // Simpan data sebelum dihapus untuk dikembalikan
    const deletedData = { ...existingFacility }

    // Delete facility
    await deleteFacility(id)

    return NextResponse.json(
      {
        message: 'Fasilitas berhasil dihapus',
        data: deletedData
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle foreign key constraint errors (jika facility masih digunakan)
    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = error as { code?: string }
      if (dbError.code === '23503') {
        // PostgreSQL foreign key violation
        return NextResponse.json(
          {
            error: 'Conflict',
            message: 'Fasilitas tidak dapat dihapus karena masih digunakan oleh data lain'
          },
          { status: 409 }
        )
      }
    }

    // Handle other errors
    console.error('Gagal menghapus facility:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Terjadi kesalahan saat menghapus fasilitas'
      },
      { status: 500 }
    )
  }
}
