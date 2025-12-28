import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { formatDateDetail } from "@/utils/date"
import { Facility } from "@/types/database.type"
import { type ColumnDef } from "@tanstack/react-table"
import Update from "./components/update"
import Delete from "./components/delete"
import { dateRangeFilterFn } from "@/utils/tableFilters"

export const columns: ColumnDef<Facility>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" className="text-center" />
    ),
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination
      const number = pageIndex * pageSize + row.index + 1
      return <div className="text-center">{number}</div>
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "facility",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fasilitas" />
    ),
    meta: {
      label: "Fasilitas",
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deskripsi" />
    ),
    enableSorting: false,
    meta: {
      label: "Deskripsi",
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Dibuat" />
    ),
    cell: ({ row }) => {
      return formatDateDetail(row.getValue("createdAt"))
    },
    filterFn: dateRangeFilterFn,
    meta: {
      label: "Tanggal Dibuat",
      filterVariant: "date-range"
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Diperbarui" />
    ),
    cell: ({ row }) => {
      return formatDateDetail(row.getValue("updatedAt"))
    },
    filterFn: dateRangeFilterFn,
    meta: {
      label: "Tanggal Diperbarui",
      filterVariant: "date-range"
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aksi" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-end space-x-2">
          <Update data={row.original} />
          <Delete data={row.original} />
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
]