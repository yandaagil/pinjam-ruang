import { getReservationsByUserId } from '@/db/queries/reservations/reservation'
import { NextResponse } from 'next/server'

interface Context {
  params: Promise<{
    id: string
  }>
}

export async function GET(context: Context) {
  const { id } = await context.params

  try {
    const data = await getReservationsByUserId(id)
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Gagal mengambil semua users:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
