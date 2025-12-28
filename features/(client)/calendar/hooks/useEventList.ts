import { useState } from 'react'
import { CalendarEvent } from '@/features/calendar/components/event-calendar'

export function useEventList() {
  const [isListSheetOpen, setIsListSheetOpen] = useState(false)
  const [selectedDateEvents, setSelectedDateEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleViewAllClick = (events: CalendarEvent[], date: Date) => {
    setSelectedDateEvents(events)
    setSelectedDate(date)
    setIsListSheetOpen(true)
  }

  const closeListSheet = () => {
    setIsListSheetOpen(false)
  }

  return {
    isListSheetOpen,
    selectedDateEvents,
    selectedDate,
    handleViewAllClick,
    closeListSheet,
    setIsListSheetOpen
  }
}
