"use client"

import TooltipWrapper from "@/components/common/tooltip-wrapper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { formatDate, formatTime } from "@/utils/date"
import { ReservationStatus, ReservationWithDetails } from "@/types/database.type"
import { type ColumnDef } from "@tanstack/react-table"
import { Eye, Pencil } from "lucide-react"

export const columns: ColumnDef<ReservationWithDetails>[] = [
  {
    accessorKey: "eventName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Acara" />
    ),
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("eventName")}</span>
    },
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
          <span className="font-medium">{room.name}</span>
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
      return (
        <span className="font-medium">
          {row.getValue("participants")} orang
        </span>
      )
    },
    meta: {
      label: "Jumlah Peserta",
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
          <span className="font-medium">
            {formatDate(row.getValue("startTime"))}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTime(row.getValue("startTime"))}
          </span>
        </div>
      )
    },
    enableSorting: false,
    meta: {
      label: "Waktu Mulai",
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
          <span className="font-medium">
            {formatDate(row.getValue("endTime"))}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTime(row.getValue("endTime"))}
          </span>
        </div>
      )
    },
    enableSorting: false,
    meta: {
      label: "Waktu Selesai",
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
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Dibuat" />
    ),
    cell: ({ row }) => {
      return formatDate(row.getValue("createdAt"))
    },
    meta: {
      label: "Tanggal Dibuat",
    },
  },
  {
    id: "actions",
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
        </div>
      )
    },
  },
]