'use client'

import { useRoomTypes } from "./hooks/useRoomTypeQuery"
import Create from "./components/create"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { useState } from "react"
import { PaginationState } from "@tanstack/react-table"

const RoomTypes = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isPending, isError, refetch } = useRoomTypes(
    pagination.pageIndex + 1,
    pagination.pageSize
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data || []}
      queryState={{ isError, isPending, refetch }}
      createElement={<Create />}
      pagination={pagination}
      onPaginationChange={setPagination}
      totalPages={data?.pagination?.totalPages || 0}
      manualPagination={true}
    />
  )
}

export default RoomTypes
