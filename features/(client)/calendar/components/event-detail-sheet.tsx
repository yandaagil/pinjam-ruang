import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Users, MapPin, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { formatDate, formatTime } from "@/utils/date"
import { CalendarEvent } from "@/features/(client)/calendar/components/event-calendar"

interface EventDetailSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedEvent: CalendarEvent | null
  onNavigate: (direction: "prev" | "next") => void
}

export function EventDetailSheet({
  isOpen,
  onOpenChange,
  selectedEvent,
  onNavigate,
}: EventDetailSheetProps) {
  if (!selectedEvent) return null

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4 border-b">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <SheetTitle className="text-xl font-semibold leading-none tracking-tight">
                  {selectedEvent.eventName}
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground line-clamp-2">
                  {selectedEvent.description || "Tidak ada deskripsi"}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Time Section */}
            <div className="grid gap-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Waktu & Tanggal</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Tanggal</span>
                  </div>
                  <p className="text-sm font-medium">{formatDate(selectedEvent.startTime)}</p>
                </div>
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Waktu</span>
                  </div>
                  <p className="text-sm font-medium">
                    {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Location Section */}
            <div className="grid gap-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lokasi & Peserta</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Ruangan</span>
                  </div>
                  <div className="text-sm font-medium">
                    <p>{selectedEvent.room.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedEvent.room.code} - {selectedEvent.room.roomLocation.location}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Peserta</span>
                  </div>
                  <p className="text-sm font-medium">{selectedEvent.participants} Orang</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Organizer Section */}
            <div className="grid gap-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Peminjam</h4>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                  {selectedEvent.user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedEvent.user?.name || "Unknown"}</p>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {selectedEvent.notes && (
              <>
                <Separator />
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">Catatan Tambahan</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border text-sm text-muted-foreground leading-relaxed">
                    {selectedEvent.notes}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="p-6 border-t bg-muted/5 mt-auto">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate("prev")}
                className="flex-1"
              >
                <ChevronLeft />
                Sebelumnya
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate("next")}
                className="flex-1"
              >
                Selanjutnya
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
