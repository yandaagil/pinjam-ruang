import { useState } from 'react'
import { CalendarEvent } from '@/features/calendar/components/event-calendar'

interface UseEventNavigationProps {
  events: CalendarEvent[]
}

export function useEventNavigation({ events }: UseEventNavigationProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsSheetOpen(true)
  }

  const handleNavigateEvent = (direction: 'prev' | 'next') => {
    if (!selectedEvent) return

    const currentIndex = events.findIndex((e) => e.id === selectedEvent.id)
    if (currentIndex === -1) return

    let newIndex: number
    if (direction === 'prev') {
      newIndex = currentIndex - 1
      if (newIndex < 0) newIndex = events.length - 1
    } else {
      newIndex = currentIndex + 1
      if (newIndex >= events.length) newIndex = 0
    }

    setSelectedEvent(events[newIndex])
  }

  const closeSheet = () => {
    setIsSheetOpen(false)
  }

  return {
    selectedEvent,
    isSheetOpen,
    handleEventClick,
    handleNavigateEvent,
    closeSheet,
    setIsSheetOpen
  }
}
