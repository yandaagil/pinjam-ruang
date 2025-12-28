'use client'

import { columns } from './columns'
import { DataTable } from '@/components/data-table/data-table'
import { useReservations } from './hooks/useReservationQuery'
import { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'

const Reservations = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isPending, isError, refetch } = useReservations(
    pagination.pageIndex + 1,
    pagination.pageSize
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data || []}
      queryState={{ isPending, isError, refetch }}
      pagination={pagination}
      onPaginationChange={setPagination}
      totalPages={data?.pagination?.totalPages || 0}
      manualPagination={true}
    />
  )
}

export default Reservations