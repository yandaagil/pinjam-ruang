"use client"

import TooltipWrapper from "@/components/common/tooltip-wrapper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { formatDate, formatDateDetail, formatTime } from "@/utils/date"
import { ReservationStatus, ReservationWithDetails } from "@/types/database.type"
import { type ColumnDef } from "@tanstack/react-table"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { dateRangeFilterFn } from "@/utils/tableFilters"

export const columns: ColumnDef<ReservationWithDetails>[] = [
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
    accessorKey: "eventName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Acara" />
    ),
    enableSorting: false,
    meta: {
      label: "Nama Acara",
    },
  },
  {
    accessorKey: "room.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ruangan" />
    ),
    cell: ({ row }) => {
      const room = row.original.room
      return (
        <div className="flex flex-col">
          <span>{room.name}</span>
          <span className="text-xs text-muted-foreground">{room.roomLocation.location}</span>
        </div>
      )
    },
    enableSorting: false,
    meta: {
      label: "Ruangan",
    },
  },
  {
    accessorKey: "participants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah Peserta" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("participants")} orang</span>
    },
    meta: {
      label: "Jumlah Peserta",
    },
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Peminjam" />
    ),
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <div className="flex flex-col">
          <span>{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div >
      )
    },
    enableSorting: false,
    meta: {
      label: "Peminjam",
    },
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu Mulai" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span>
            {formatDate(row.getValue("startTime"))}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTime(row.getValue("startTime"))}
          </span>
        </div>
      )
    },
    filterFn: dateRangeFilterFn,
    meta: {
      label: "Waktu Mulai",
      filterVariant: "date-range"
    },
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu Selesai" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span>
            {formatDate(row.getValue("endTime"))}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTime(row.getValue("endTime"))}
          </span>
        </div>
      )
    },
    filterFn: dateRangeFilterFn,
    meta: {
      label: "Waktu Selesai",
      filterVariant: "date-range"
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const formattedStatus = (status: ReservationStatus) => {
        if (status === "accepted") {
          return <Badge className="bg-green-600">Disetujui</Badge>
        } else if (status === "pending") {
          return <Badge className="bg-yellow-600">Menunggu</Badge>
        } else if (status === "declined") {
          return <Badge className="bg-red-600">Ditolak</Badge>
        } else if (status === "cancelled") {
          return <Badge className="bg-gray-600">Dibatalkan</Badge>
        } else {
          return <Badge className="bg-gray-600">Tidak Diketahui</Badge>
        }
      }
      return formattedStatus(row.getValue("status"))
    },
    enableSorting: false,
    meta: {
      label: "Status",
      filterVariant: "select",
      filterOptions: [
        { label: "Disetujui", value: "accepted" },
        { label: "Menunggu", value: "pending" },
        { label: "Ditolak", value: "declined" },
        { label: "Dibatalkan", value: "cancelled" },
      ],
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
    cell: () => {
      return (
        <div className="flex justify-end space-x-2">
          <TooltipWrapper tooltip="Lihat">
            <Button variant="outline" size="sm">
              <Eye />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Ubah">
            <Button variant="outline" size="sm">
              <Pencil />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Hapus">
            <Button variant="destructive" size="sm">
              <Trash2 />
            </Button>
          </TooltipWrapper>
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
]