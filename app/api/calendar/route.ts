import { getAllAcceptedReservations } from '@/db/queries/reservations/reservation'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await getAllAcceptedReservations()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Gagal mengambil semua users:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
