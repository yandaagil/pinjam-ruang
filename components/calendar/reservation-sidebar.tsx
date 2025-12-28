"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Create from "@/features/(client)/calendar/components/create"

export function ReservationSidebar() {
  return (
    <div className="w-full h-full bg-card border-r flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Tambah Reservasi</h2>
      </div>

      {/* Form */}
      <ScrollArea className="flex-1">
        <Create />
      </ScrollArea>
    </div>
  )
}
