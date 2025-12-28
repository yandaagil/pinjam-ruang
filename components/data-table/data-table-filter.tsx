import { useEffect, useState } from "react"
import type { Column } from "@tanstack/react-table"
import type { DateRange } from "react-day-picker"
import { useDebounceValue } from "usehooks-ts"
import { Input } from "../ui/input"
import { DateRangePicker } from "../ui/date-range-picker"
import { Combobox } from "../ui/combobox"

interface DataTableFilterProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
}

export function DataTableFilter<TData, TValue>({
  column
}: DataTableFilterProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue()
  const { filterVariant, filterOptions, label } = column.columnDef.meta ?? {}

  const defaultValue = (columnFilterValue ?? "") as string

  const [inputValue, setInputValue] = useState<string>(defaultValue)
  const [debouncedValue, setDebouncedValue] = useDebounceValue<string>(inputValue, 500)
  const [date, setDate] = useState<DateRange | undefined>()

  useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (filterVariant !== "date-range") {
      column.setFilterValue(debouncedValue === "" ? undefined : debouncedValue)
    }
  }, [debouncedValue, column, filterVariant])

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setDebouncedValue(value)
  }

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate)
    column.setFilterValue(newDate)
  }

  // Select Filter
  if (filterVariant === "select") {
    return (
      <Combobox
        options={filterOptions}
        value={inputValue}
        onValueChange={handleInputChange}
        placeholder={`Pilih ${label?.toLowerCase() ?? column.id.replace(/[_-]/g, " ")}`}
        buttonSize="sm"
      />
    )
  }

  // Date Range Filter
  if (filterVariant === "date-range") {
    return (
      <DateRangePicker
        dateRange={date}
        setDateRange={handleDateChange}
        buttonSize="sm"
      />
    )
  }

  // Default Text Input Filter
  return (
    <Input
      id={column.id}
      name={column.id}
      type="search"
      className="h-8"
      onChange={(e) => handleInputChange(e.target.value)}
      placeholder={`Cari ${label?.toLowerCase() ?? column.id.replace(/[_-]/g, " ")}...`}
      value={inputValue}
    />
  )
}