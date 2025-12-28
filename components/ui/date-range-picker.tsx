"use client"

import * as React from "react"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { DateRange } from "react-day-picker"

import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "@/utils/date"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"

type DateRangePickerProps = {
  dateRange: DateRange | undefined
  setDateRange: (dateRange: DateRange | undefined) => void
  placeholder?: string
  buttonSize?: VariantProps<typeof buttonVariants>["size"]
}

export function DateRangePicker({
  dateRange,
  setDateRange,
  placeholder = "Pilih rentang tanggal",
  buttonSize = "default"
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState<boolean>(false)

  const formatDateRange = () => {
    if (!dateRange?.from) {
      return placeholder
    }
    if (dateRange.to) {
      return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
    }
    return formatDate(dateRange.from)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          size={buttonSize}
          className={cn(
            "justify-between font-normal w-full",
            dateRange?.from ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <CalendarIcon className="text-muted-foreground" />
            {formatDateRange()}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="center">
        <Calendar
          mode="range"
          selected={dateRange}
          captionLayout="dropdown"
          onSelect={(range) => {
            setDateRange(range)
          }}
          numberOfMonths={2}
          footer={
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setDateRange(undefined)
                }}
              >
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => {
                  const today = new Date()
                  setDateRange({ from: today, to: today })
                  setOpen(false)
                }}
              >
                Hari Ini
              </Button>
            </div>
          }
        />
      </PopoverContent>
    </Popover>
  )
}
