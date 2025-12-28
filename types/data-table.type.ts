import type { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string
    filterVariant?: 'date-range' | 'select'
    filterOptions?: { label: string; value: string }[]
  }
}
