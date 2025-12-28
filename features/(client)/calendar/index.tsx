"use client"

import Navbar from "@/components/layouts/navbar"
import { EventCalendar } from "@/features/(client)/calendar/components/event-calendar"
import { ReservationSidebar } from "@/components/calendar/reservation-sidebar"
import { EventDetailSheet } from "@/features/(client)/calendar/components/event-detail-sheet"
import { EventListSheet } from "@/features/(client)/calendar/components/event-list-sheet"
import { useEventNavigation } from "@/features/(client)/calendar/hooks/useEventNavigation"
import { useEventList } from "@/features/(client)/calendar/hooks/useEventList"
import { useCalendarReservation } from "./hooks/useCalendarReservation"

export default function CalendarPage() {
  const { data: calendarReservation, isPending, isError } = useCalendarReservation()

  const {
    selectedEvent,
    isSheetOpen,
    handleEventClick,
    handleNavigateEvent,
    setIsSheetOpen,
  } = useEventNavigation({ events: calendarReservation || [] })

  const {
    isListSheetOpen,
    selectedDateEvents,
    selectedDate,
    handleViewAllClick,
    setIsListSheetOpen,
  } = useEventList()

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading reservations.</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar Section */}
        <div className="w-[400px] overflow-y-auto">
          <ReservationSidebar />
        </div>

        {/* Calendar Section */}
        <div className="flex-1 overflow-auto">
          <EventCalendar
            events={calendarReservation || []}
            onEventClick={handleEventClick}
            onViewAllClick={handleViewAllClick}
          />
        </div>
      </div>

      {/* Event Detail Sheet */}
      <EventDetailSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        selectedEvent={selectedEvent}
        onNavigate={handleNavigateEvent}
      />

      {/* Event List Sheet */}
      <EventListSheet
        isOpen={isListSheetOpen}
        onOpenChange={setIsListSheetOpen}
        events={selectedDateEvents}
        date={selectedDate}
        onEventClick={handleEventClick}
      />
    </div>
  )
}
