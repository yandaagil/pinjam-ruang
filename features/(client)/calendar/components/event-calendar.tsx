"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface CalendarEvent {
  id: string
  eventName: string
  description?: string
  room: {
    code: string
    name: string
    roomLocation: {
      location: string
    }
  }
  userId?: string
  user?: {
    name: string
  }
  startTime: Date | string
  endTime: Date | string
  participants: number
  notes?: string
}

interface EventCalendarProps {
  events?: CalendarEvent[]
  className?: string
  onEventClick?: (event: CalendarEvent) => void
  onViewAllClick?: (events: CalendarEvent[], date: Date) => void
}

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay()
  // Convert Sunday (0) to 7, and shift Monday to 0
  return day === 0 ? 6 : day - 1
}

export function EventCalendar({ events = [], className, onEventClick, onViewAllClick }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
  const today = new Date()

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleMonthChange = (value: string) => {
    setCurrentDate(new Date(currentYear, MONTHS.indexOf(value), 1))
  }

  // Create calendar grid
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1)
    const dayNumber = prevMonthDays - firstDayOfMonth + i + 1
    calendarDays.push({
      day: dayNumber,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth - 1, dayNumber),
    })
  }

  // Add days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(currentYear, currentMonth, day),
    })
  }

  // Add days from next month to complete the grid
  const remainingCells = 35 - calendarDays.length
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth + 1, day),
    })
  }

  // Group events by date
  const eventsByDate = React.useMemo(() => {
    const grouped: Record<string, CalendarEvent[]> = {}
    events.forEach((event) => {
      const dateKey = new Date(event.startTime).toDateString()
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
    })
    return grouped
  }, [events])

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className={cn("w-full h-full bg-card rounded-lg", className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={previousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold ml-2">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={goToToday}>
            Hari ini
          </Button>
          <Select value={MONTHS[currentMonth]} onValueChange={handleMonthChange}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent align="end">
              {MONTHS.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="py-4 px-6 space-y-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border bg-muted/30">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold py-3 border-r last:border-r-0 bg-muted"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 border-t border-l border-r">
          {calendarDays.map((calendarDay, index) => {
            const dateKey = calendarDay.date.toDateString()
            const dayEvents = eventsByDate[dateKey] || []
            const isTodayDate = isToday(calendarDay.date)
            const isLastCol = (index + 1) % 7 === 0

            return (
              <div
                key={index}
                className={cn(
                  "min-h-[120px] bg-background p-1 relative border-r border-b",
                  !calendarDay.isCurrentMonth && "bg-muted",
                  isLastCol && "border-r-0",
                  isTodayDate && "bg-primary/10 border border-primary"
                )}
              >
                <div className="flex justify-end mb-2">
                  <span
                    className={cn(
                      "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                      !calendarDay.isCurrentMonth && "text-muted-foreground",
                      isTodayDate && "bg-primary text-background"
                    )}
                  >
                    {calendarDay.day}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => {
                    return (
                      <div
                        key={event.id}
                        className="text-xs px-2 py-1 rounded-md truncate cursor-pointer bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200 hover:opacity-80 transition-opacity font-medium"
                        title={event.eventName}
                        onClick={() => onEventClick?.(event)}
                      >
                        {event.eventName}
                      </div>
                    )
                  })}
                  {dayEvents.length > 3 && (
                    <button
                      className="w-full text-xs text-muted-foreground hover:text-foreground px-2 py-1 flex items-center gap-1 cursor-pointer"
                      onClick={() => onViewAllClick?.(dayEvents, calendarDay.date)}
                    >
                      Lihat semua
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
