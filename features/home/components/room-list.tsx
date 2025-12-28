"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, Calendar, Search, LayoutGrid, X } from "lucide-react"
import type { RoomWithDetails } from "@/types/database.type"

interface RoomListProps {
  rooms: RoomWithDetails[]
}

export default function RoomList({ rooms }: RoomListProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCapacity, setSelectedCapacity] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")

  // Extract unique values for filters
  const roomTypes = Array.from(new Set(rooms.map(room => room.roomType.name)))
  const locations = Array.from(new Set(rooms.map(room => room.roomLocation.building).filter(Boolean))) as string[]

  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.roomLocation.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || room.roomType.name === selectedType

    const matchesCapacity =
      selectedCapacity === "all" ||
      (selectedCapacity === "small" && room.roomCapacity.capacity <= 10) ||
      (selectedCapacity === "medium" && room.roomCapacity.capacity > 10 && room.roomCapacity.capacity <= 25) ||
      (selectedCapacity === "large" && room.roomCapacity.capacity > 25)

    const matchesLocation = selectedLocation === "all" || room.roomLocation.building === selectedLocation

    return matchesSearch && matchesType && matchesCapacity && matchesLocation
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      maintenance: "secondary",
      renovation: "outline",
      inactive: "destructive",
    }

    const labels: Record<string, string> = {
      active: "Tersedia",
      maintenance: "Maintenance",
      renovation: "Renovasi",
      inactive: "Tidak Aktif",
    }

    return (
      <Badge variant={variants[status] || "default"} className="shadow-sm">
        {labels[status] || "Tersedia"}
      </Badge>
    )
  }

  const hasActiveFilters = searchQuery || selectedType !== "all" || selectedCapacity !== "all" || selectedLocation !== "all"

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="sticky top-20 z-30 rounded-2xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 shadow-sm transition-all">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama ruangan, kode, atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-background"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="Tipe Ruangan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                {roomTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="Kapasitas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kapasitas</SelectItem>
                <SelectItem value="small">1-10 orang</SelectItem>
                <SelectItem value="medium">11-25 orang</SelectItem>
                <SelectItem value="large">25+ orang</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="Lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lokasi</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedType("all")
                  setSelectedCapacity("all")
                  setSelectedLocation("all")
                }}
                className="h-11 px-3 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Available Spaces Grid */}
      {filteredRooms.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-muted/30 p-16 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Tidak ada ruangan ditemukan</h3>
            <p className="text-muted-foreground">
              Coba ubah kriteria pencarian atau filter untuk menemukan ruangan yang sesuai
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedType("all")
                setSelectedCapacity("all")
                setSelectedLocation("all")
              }}
            >
              Reset Semua Filter
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group relative flex flex-col rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Header with Gradient */}
              <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 p-6 flex flex-col justify-between group-hover:from-primary/5 group-hover:to-blue-500/5 transition-colors">
                <div className="flex justify-between items-start">
                  {getStatusBadge(room.status)}
                  <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/10">
                    {room.code}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {room.name}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    <span className="truncate">{room.roomLocation.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                {room.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {room.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Kapasitas</p>
                    <div className="flex items-center font-medium text-sm">
                      <Users className="h-4 w-4 mr-2 text-primary/70" />
                      {room.roomCapacity.capacity} Orang
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Tipe</p>
                    <div className="flex items-center font-medium text-sm">
                      <LayoutGrid className="h-4 w-4 mr-2 text-primary/70" />
                      {room.roomType.name}
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/50" />

                {room.roomFacilities.length > 0 ? (
                  <div className="space-y-2 flex-1">
                    <p className="text-xs font-medium text-muted-foreground">Fasilitas Tersedia</p>
                    <div className="flex flex-wrap gap-1.5">
                      {room.roomFacilities.map((rf) => (
                        <Badge key={rf.facility.facility} variant="outline" className="text-xs font-normal">
                          {rf.facility.facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1"></div>
                )}

                {/* Card Actions */}
                <Button className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
                  <Calendar />
                  Reservasi Sekarang
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
