import { deleteRoomCapacity, getRoomCapacityById, updateRoomCapacity } from '@/db/queries/master/capacity'
import { requireAdmin } from '@/lib/auth-server'
import { capacitySchema } from '@/features/(admin)/master/capacities/validations/capacity.schema'
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
    // Cek apakah capacity dengan ID tersebut ada
    const existingCapacity = await getRoomCapacityById(id)
    if (!existingCapacity) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Kapasitas dengan ID tersebut tidak ditemukan'
        },
        { status: 404 }
      )
    }

    const body = await request.json()

    // Validasi input menggunakan Zod schema
    const validatedData = capacitySchema.parse(body)

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

    // Update capacity
    const updatedCapacity = await updateRoomCapacity(id, validatedData)

    return NextResponse.json(
      {
        message: 'Kapasitas berhasil diperbarui',
        data: updatedCapacity
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
    // Cek apakah capacity dengan ID tersebut ada
    const existingCapacity = await getRoomCapacityById(id)
    if (!existingCapacity) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Kapasitas dengan ID tersebut tidak ditemukan'
        },
        { status: 404 }
      )
    }

    // Simpan data sebelum dihapus untuk dikembalikan
    const deletedData = { ...existingCapacity }

    // Delete capacity
    await deleteRoomCapacity(id)

    return NextResponse.json(
      {
        message: 'Kapasitas berhasil dihapus',
        data: deletedData
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle foreign key constraint errors (jika capacity masih digunakan)
    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = error as { code?: string }
      if (dbError.code === '23503') {
        // PostgreSQL foreign key violation
        return NextResponse.json(
          {
            error: 'Conflict',
            message: 'Kapasitas tidak dapat dihapus karena masih digunakan oleh data lain'
          },
          { status: 409 }
        )
      }
    }

    // Handle other errors
    console.error('Gagal menghapus capacity:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Terjadi kesalahan saat menghapus kapasitas'
      },
      { status: 500 }
    )
  }
}
