/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterFn } from '@tanstack/react-table'

type DateRangeFilter = { from: string | Date; to: string | Date }

export const dateRangeFilterFn: FilterFn<any> = (row, columnId, filterValue: DateRangeFilter) => {
  if (!filterValue?.from || !filterValue?.to) return true

  const rowDate = new Date(row.getValue(columnId))
  const fromDate = new Date(filterValue.from)
  const toDate = new Date(filterValue.to)

  // Normalisasi tanggal untuk mencakup seluruh hari
  fromDate.setHours(0, 0, 0, 0)
  toDate.setHours(23, 59, 59, 999)
  // rowDate.setHours(0, 0, 0, 0) // Tidak perlu menormalkan rowDate jika hanya membandingkan dengan batas from/to yang sudah dinormalisasi

  return rowDate >= fromDate && rowDate <= toDate
}
