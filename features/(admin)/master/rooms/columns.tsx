import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { formatDateDetail } from "@/utils/date"
import { RoomWithDetails, RoomStatus } from "@/types/database.type"
import { type ColumnDef } from "@tanstack/react-table"
import { dateRangeFilterFn } from "@/utils/tableFilters"
import { Badge, badgeVariants } from "@/components/ui/badge"
import type { VariantProps } from "class-variance-authority"
import Update from "@/features/(admin)/master/rooms/components/update"
import Delete from "@/features/(admin)/master/rooms/components/delete"

const getStatusBadge = (status: RoomStatus) => {
  const variants: Record<RoomStatus, VariantProps<typeof badgeVariants>["variant"]> = {
    active: "success",
    maintenance: "warning",
    renovation: "stale",
    inactive: "dangerous",
  }

  const labels: Record<RoomStatus, string> = {
    active: "Aktif",
    maintenance: "Maintenance",
    renovation: "Renovasi",
    inactive: "Tidak Aktif",
  }

  return (
    <Badge variant={variants[status] || "default"}>
      {labels[status] || status}
    </Badge>
  )
}

export const columns: ColumnDef<RoomWithDetails>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Ruangan" />
    ),
    cell: ({ row }) => {
      const code = row.original.code
      return (
        <div>
          <div>{row.getValue("name")}</div>
          {code && (
            <div className="text-xs text-muted-foreground">Kode: {code}</div>
          )}
        </div>
      )
    },
    meta: {
      label: "Nama Ruangan",
    },
  },
  {
    accessorKey: "roomType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipe" />
    ),
    cell: ({ row }) => {
      return row.original.roomType.name
    },
    enableSorting: false,
    meta: {
      label: "Tipe",
    },
  },
  {
    accessorKey: "roomCapacity.capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kapasitas" />
    ),
    cell: ({ row }) => {
      return `${row.original.roomCapacity.capacity} orang`
    },
    meta: {
      label: "Kapasitas",
    },
  },
  {
    accessorKey: "roomLocation.location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokasi" />
    ),
    cell: ({ row }) => {
      return row.original.roomLocation.location
    },
    enableSorting: false,
    meta: {
      label: "Lokasi",
    },
  },
  {
    accessorKey: "roomFacilities",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fasilitas" />
    ),
    cell: ({ row }) => {
      const facilities = row.original.roomFacilities
      if (!facilities || facilities.length === 0) {
        return <span className="text-muted-foreground text-sm">-</span>
      }
      return (
        <div className="flex flex-wrap gap-1">
          {facilities.slice(0, 3).map((rf) => (
            <Badge key={rf.facility.id} variant="outline" className="text-xs">
              {rf.facility.facility}
            </Badge>
          ))}
          {facilities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{facilities.length - 3}
            </Badge>
          )}
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: false,
    meta: {
      label: "Fasilitas",
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return getStatusBadge(row.getValue("status"))
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    meta: {
      label: "Status",
      filterVariant: "select",
      filterOptions: [
        { label: "Aktif", value: "active" },
        { label: "Maintenance", value: "maintenance" },
        { label: "Renovasi", value: "renovation" },
        { label: "Tidak Aktif", value: "inactive" },
      ]
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
