'use client'

import { useFacilities } from "./hooks/useFacilityQuery"
import Create from "./components/create"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table/data-table"
import { useState } from "react"
import { PaginationState } from "@tanstack/react-table"

const Facilities = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isPending, isError, refetch } = useFacilities(
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

export default Facilities
