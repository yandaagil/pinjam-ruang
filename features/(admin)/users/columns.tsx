"use client"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { formatDate } from "@/utils/date"
import { User } from "@/types/database.type"
import { type ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"
import { dateRangeFilterFn } from "@/utils/tableFilters"
import Update from "./components/update"
import Delete from "./components/delete"

export const columns: ColumnDef<User>[] = [
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
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    meta: {
      label: "Nama",
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    meta: {
      label: "Email",
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return row.getValue("role") === "admin" ? (
        <Badge variant="stale">Admin</Badge>
      ) : (
        <Badge variant="warning">User</Badge>
      )
    },
    enableSorting: false,
    meta: {
      label: "Role",
      filterVariant: "select",
      filterOptions: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verifikasi Email" />
    ),
    cell: ({ row }) => {
      return row.getValue("emailVerified") ? (
        <Badge className="flex items-center justify-center gap-1" variant="success">
          <Check className="h-3 w-3" />
          Terverifikasi
        </Badge>
      ) : (
        <Badge className="flex items-center justify-center gap-1" variant="dangerous">
          <X className="h-3 w-3" />
          Belum Verifikasi
        </Badge>
      )
    },
    enableSorting: false,
    meta: {
      label: "Verifikasi Email",
      filterVariant: "select",
      filterOptions: [
        { label: "Terverifikasi", value: "true" },
        { label: "Belum Verifikasi", value: "false" },
      ],
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Aktif" />
    ),
    cell: ({ row }) => {
      return row.getValue("isActive") ? (
        <Badge variant="success">Aktif</Badge>
      ) : (
        <Badge variant="warning">Tidak Aktif</Badge>
      )
    },
    enableSorting: false,
    meta: {
      label: "Status Aktif",
      filterVariant: "select",
      filterOptions: [
        { label: "Aktif", value: "true" },
        { label: "Tidak Aktif", value: "false" },
      ],
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
      return formatDate(row.getValue("updatedAt"))
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