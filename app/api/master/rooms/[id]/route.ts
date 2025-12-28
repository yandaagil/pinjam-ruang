import { deleteRoom, getRoomById, updateRoom } from '@/db/queries/master/room'
import { requireAdmin } from '@/lib/auth-server'
import { roomSchema } from '@/features/(admin)/master/rooms/validations/room.schema'
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
    // Cek apakah room dengan ID tersebut ada
    const existingRoom = await getRoomById(id)
    if (!existingRoom) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Ruangan dengan ID tersebut tidak ditemukan'
        },
        { status: 404 }
      )
    }

    const body = await request.json()

    // Validasi input menggunakan Zod schema
    const validatedData = roomSchema.parse(body)

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

    // Update room
    const updatedRoom = await updateRoom(id, validatedData)

    return NextResponse.json(
      {
        message: 'Ruangan berhasil diperbarui',
        data: updatedRoom
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
    // Cek apakah room dengan ID tersebut ada
    const existingRoom = await getRoomById(id)
    if (!existingRoom) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Ruangan dengan ID tersebut tidak ditemukan'
        },
        { status: 404 }
      )
    }

    // Delete room
    const result = await deleteRoom(id)

    return NextResponse.json(
      {
        message: 'Ruangan berhasil dihapus',
        data: result[0]
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle foreign key constraint errors (jika room masih digunakan)
    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = error as { code?: string }
      if (dbError.code === '23503') {
        // PostgreSQL foreign key violation
        return NextResponse.json(
          {
            error: 'Conflict',
            message: 'Ruangan tidak dapat dihapus karena masih digunakan oleh data lain'
          },
          { status: 409 }
        )
      }
    }

    // Handle other errors
    console.error('Gagal menghapus room:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Terjadi kesalahan saat menghapus ruangan'
      },
      { status: 500 }
    )
  }
}
