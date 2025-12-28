"use client"

import * as React from "react"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"

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

type DatePickerProps = {
  date: Date
  setDate: (date: Date | undefined) => void
  buttonSize?: VariantProps<typeof buttonVariants>["size"]
}

export function DatePicker({ date, setDate, buttonSize = "default" }: DatePickerProps) {
  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          size={buttonSize}
          className={cn(
            "justify-between font-normal",
            date ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <CalendarIcon className="text-muted-foreground" />
            {date ? formatDate(date) : "Pilih tanggal"}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date)
            setOpen(false)
          }}
          footer={
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setDate(undefined)
                }}
              >
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setDate(new Date())
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
