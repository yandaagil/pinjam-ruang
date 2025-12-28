'use client'

import { DataTable } from "@/components/data-table/data-table"
import Navbar from "@/components/layouts/navbar"
import { columns } from "./columns"
import { useUserReservations } from "./hooks/useReservationQuery"

const UserReservations = () => {
  const { data: reservations, isPending, isError, refetch } = useUserReservations('a48a7a1b-d1b7-4479-a565-6f8bebd97231')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-4 space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Reservasi Saya</h1>
          <p className="text-muted-foreground">
            Daftar riwayat reservasi ruangan yang telah Anda ajukan.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={reservations || []}
          queryState={{ isPending, isError, refetch }}
        />
      </div>
    </div>
  )
}

export default UserReservations
