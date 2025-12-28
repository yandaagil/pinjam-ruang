import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Users } from "lucide-react"
import { formatDate, formatTime } from "@/utils/date"
import { CalendarEvent } from "@/features/(client)/calendar/components/event-calendar"

interface EventListSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  events: CalendarEvent[]
  date: Date | null
  onEventClick: (event: CalendarEvent) => void
}

export function EventListSheet({
  isOpen,
  onOpenChange,
  events,
  date,
  onEventClick,
}: EventListSheetProps) {
  if (!date) return null

  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  })

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4 border-b">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <SheetTitle className="text-xl font-semibold leading-none tracking-tight">
                  Semua Acara
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  {formatDate(date)} - {sortedEvents.length} Acara
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {sortedEvents.map((event, index) => (
                <div key={event.id}>
                  <button
                    onClick={() => {
                      onEventClick(event)
                      onOpenChange(false)
                    }}
                    className="w-full text-left p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors group cursor-pointer"
                  >
                    <div className="space-y-3">
                      {/* Event Title */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                          {event.eventName}
                        </h3>
                      </div>

                      {/* Event Description */}
                      {event.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <Separator />

                      {/* Event Details Grid */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{event.participants} Orang</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">
                            {event.room.name} - {event.room.roomLocation.location}
                          </span>
                        </div>
                      </div>

                      {/* Organizer */}
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs shrink-0">
                          {event.user?.name?.charAt(0) || "U"}
                        </div>
                        <span className="text-xs text-muted-foreground truncate">
                          {event.user?.name || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </button>
                  {index < sortedEvents.length - 1 && <Separator className="my-3" />}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-muted/5 mt-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Tutup
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
