"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Clock, Search, ChevronRight } from "lucide-react"
import Navbar from "@/components/layout/navbar"
import Image from "next/image"

// Mock data for spaces
const spaces = [
  {
    id: 1,
    name: "Study Room A",
    type: "Study Room",
    capacity: 8,
    location: "Library Floor 2",
    amenities: ["Whiteboard", "Power Outlets", "WiFi"],
    image: "/modern-study-room-with-tables-and-chairs.jpg",
  },
  {
    id: 2,
    name: "Conference Room B",
    type: "Meeting Room",
    capacity: 12,
    location: "Admin Building",
    amenities: ["Projector", "Video Conferencing", "WiFi"],
    image: "/conference-room-with-projector-and-meeting-table.jpg",
  },
  {
    id: 3,
    name: "Computer Lab C",
    type: "Computer Lab",
    capacity: 20,
    location: "Engineering Building",
    amenities: ["High-spec PCs", "Software Suite", "Printers"],
    image: "/computer-lab-with-desktop-computers-and-monitors.jpg",
  },
  {
    id: 4,
    name: "Presentation Hall D",
    type: "Event Space",
    capacity: 50,
    location: "Student Center",
    amenities: ["Stage", "Sound System", "Lighting"],
    image: "/modern-study-room-with-tables-and-chairs.jpg",
  },
]

// Mock data for user bookings
const userBookings = [
  {
    id: 1,
    spaceName: "Study Room A",
    date: "Today",
    time: "2:00 PM - 4:00 PM",
    status: "confirmed",
    location: "Library Floor 2",
  },
  {
    id: 2,
    spaceName: "Conference Room B",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    status: "pending",
    location: "Admin Building",
  },
  {
    id: 3,
    spaceName: "Computer Lab C",
    date: "Dec 15",
    time: "1:00 PM - 3:00 PM",
    status: "confirmed",
    location: "Engineering Building",
  },
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCapacity, setSelectedCapacity] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")

  const filteredSpaces = spaces.filter((space) => {
    const matchesSearch =
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || space.type.toLowerCase().includes(selectedType.toLowerCase())
    const matchesCapacity =
      selectedCapacity === "all" ||
      (selectedCapacity === "small" && space.capacity <= 10) ||
      (selectedCapacity === "medium" && space.capacity > 10 && space.capacity <= 25) ||
      (selectedCapacity === "large" && space.capacity > 25)

    return matchesSearch && matchesType && matchesCapacity
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Temukan dan booking ruangan</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="browse">Jelajahi Ruangan</TabsTrigger>
            <TabsTrigger value="bookings">Reservasi Saya</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Cari Ruangan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Cari berdasarkan nama atau lokasi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Space Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Tipe</SelectItem>
                        <SelectItem value="study">Ruang Belajar</SelectItem>
                        <SelectItem value="meeting">Ruang Rapat</SelectItem>
                        <SelectItem value="computer">Laboratorium Komputer</SelectItem>
                        <SelectItem value="event">Ruang Acara</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kapasitas</SelectItem>
                        <SelectItem value="small">1-10 orang</SelectItem>
                        <SelectItem value="medium">11-25 orang</SelectItem>
                        <SelectItem value="large">25+ orang</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Lokasi</SelectItem>
                        <SelectItem value="gedung_a">Gedung A</SelectItem>
                        <SelectItem value="gedung_b">Gedung B</SelectItem>
                        <SelectItem value="gedung_c">Gedung C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Spaces Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSpaces.map((space) => (
                <Card key={space.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0 gap-0">
                  <div className="aspect-video relative">
                    <Image
                      src={space.image || "/placeholder.svg"}
                      alt={space.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div>
                        <CardTitle className="text-lg">{space.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{space.type}</CardDescription>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {space.location}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {space.capacity} orang
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {space.amenities.slice(0, 3).map((amenity) => (
                        <Badge key={amenity} variant="outline" className="text-xs rounded-full">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" size="lg">
                        Reservasi Sekarang
                      </Button>
                      <Button variant="outline" size="lg">
                        Detail
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSpaces.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No spaces found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>Manage your current and upcoming space reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{booking.spaceName}</h4>
                          <Badge variant={booking.status === "confirmed" ? "secondary" : "outline"}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {booking.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {booking.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Modify
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
