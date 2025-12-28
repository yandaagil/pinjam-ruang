"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  OnChangeFn,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFilter } from "./data-table-filter"
import { cn } from "@/lib/utils"
import ErrorPage from "./data-table-error"
import DataTableLoader from "./data-table-loader"
import { DataTablePagination } from "./data-table-pagination"
import { Fragment, useState } from "react"
import NoData from "./data-table-no-data"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  createElement?: React.ReactNode
  queryState: {
    isPending: boolean
    isError: boolean
    refetch: () => void
  }
  pagination?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>
  totalPages?: number
  manualPagination?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  createElement,
  queryState: { isPending, isError, refetch },
  pagination,
  onPaginationChange,
  totalPages,
  manualPagination = false
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination,
    pageCount: totalPages,
    state: {
      ...(manualPagination && pagination ? { pagination } : {}),
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: manualPagination && onPaginationChange
      ? onPaginationChange
      : undefined,
  })

  return (
    <div className="space-y-4">
      <div className={cn("flex items-center", createElement ? "justify-between" : "justify-end")}>
        {createElement}
        <DataTableViewOptions table={table} />
      </div>
      <div className="overflow-x-auto rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <Fragment key={headerGroup.id}>
                <TableRow>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="px-0">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
                <TableRow>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.column.getCanFilter() && (
                          <DataTableFilter column={header.column} />
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </Fragment>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              <DataTableLoader totalRow={10} totalColumn={columns.length} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow className="hover:bg-background">
                <TableCell colSpan={columns.length} className="font-sans-serif hover:bg-background">
                  <ErrorPage
                    message="Gagal memuat data. Silakan coba lagi."
                    onRetry={refetch}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow className="hover:bg-background">
                <TableCell colSpan={columns.length} className="font-sans-serif hover:bg-background">
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}