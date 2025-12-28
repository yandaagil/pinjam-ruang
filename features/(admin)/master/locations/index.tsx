'use client'

import Create from "./components/create"
import { useLocations } from "./hooks/useLocationQuery"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { useState } from "react"
import { PaginationState } from "@tanstack/react-table"

const Locations = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isPending, isError, refetch } = useLocations(
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

export default Locations