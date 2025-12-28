import { deleteRoomLocation, getRoomLocationById, updateRoomLocation } from '@/db/queries/master/location'
import { requireAdmin } from '@/lib/auth-server'
import { locationSchema } from '@/features/(admin)/master/locations/validations/location.schema'
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
    // Cek apakah location dengan ID tersebut ada
    const existingLocation = await getRoomLocationById(id)
    if (!existingLocation) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Lokasi dengan ID tersebut tidak ditemukan'
        },
        { status: 404 }
      )
    }

    const body = await request.json()

    // Validasi input menggunakan Zod schema
    const validatedData = locationSchema.parse(body)

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

    // Update location
    const updatedLocation = await updateRoomLocation(id, validatedData)

    return NextResponse.json(
      {
        message: 'Lokasi berhasil diperbarui',
        data: updatedLocation
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
    // Cek apakah location dengan ID tersebut ada
    const existingLocation = await getRoomLocationById(id)
    if (!existingLocation) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Lokasi dengan ID tersebut tidak ditemukan'
        },
        { status: 404 }
      )
    }

    // Simpan data sebelum dihapus untuk dikembalikan
    const deletedData = { ...existingLocation }

    // Delete location
    await deleteRoomLocation(id)

    return NextResponse.json(
      {
        message: 'Lokasi berhasil dihapus',
        data: deletedData
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle foreign key constraint errors (jika location masih digunakan)
    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = error as { code?: string }
      if (dbError.code === '23503') {
        // PostgreSQL foreign key violation
        return NextResponse.json(
          {
            error: 'Conflict',
            message: 'Lokasi tidak dapat dihapus karena masih digunakan oleh data lain'
          },
          { status: 409 }
        )
      }
    }

    // Handle other errors
    console.error('Gagal menghapus lokasi:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Terjadi kesalahan saat menghapus lokasi'
      },
      { status: 500 }
    )
  }
}
