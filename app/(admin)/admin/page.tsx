"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Settings,
  AlertCircle,
  X,
} from "lucide-react"
import Navbar from "@/components/layout/navbar"
import { MultiSelect } from "@/components/ui/multi-select";

// Mock data for admin dashboard
const dashboardStats = {
  totalSpaces: 24,
  totalBookings: 156,
  activeUsers: 89,
  utilizationRate: 78,
}

const recentBookings = [
  {
    id: 1,
    user: "John Doe",
    space: "Study Room A",
    date: "2024-12-10",
    time: "10:00 - 12:00",
    status: "pending",
    attendees: 4,
  },
  {
    id: 2,
    user: "Jane Smith",
    space: "Conference Room B",
    date: "2024-12-10",
    time: "14:00 - 16:00",
    status: "approved",
    attendees: 8,
  },
  {
    id: 3,
    user: "Mike Johnson",
    space: "Computer Lab C",
    date: "2024-12-11",
    time: "09:00 - 11:00",
    status: "pending",
    attendees: 15,
  },
  {
    id: 4,
    user: "Sarah Wilson",
    space: "Presentation Hall D",
    date: "2024-12-12",
    time: "13:00 - 15:00",
    status: "approved",
    attendees: 30,
  },
]

const spaces = [
  {
    id: 1,
    name: "Study Room A",
    type: "Study Room",
    capacity: 8,
    location: "Library Floor 2",
    status: "aktif",
    bookings: 23,
    utilization: 85,
  },
  {
    id: 2,
    name: "Conference Room B",
    type: "Meeting Room",
    capacity: 12,
    location: "Admin Building",
    status: "aktif",
    bookings: 18,
    utilization: 72,
  },
  {
    id: 3,
    name: "Computer Lab C",
    type: "Computer Lab",
    capacity: 20,
    location: "Engineering Building",
    status: "maintenance",
    bookings: 15,
    utilization: 60,
  },
  {
    id: 4,
    name: "Presentation Hall D",
    type: "Event Space",
    capacity: 50,
    location: "Student Center",
    status: "aktif",
    bookings: 12,
    utilization: 45,
  },
]

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "Student",
    department: "Computer Science",
    bookings: 8,
    status: "aktif",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    role: "Faculty",
    department: "Business",
    bookings: 12,
    status: "aktif",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@university.edu",
    role: "Staff",
    department: "IT Services",
    bookings: 5,
    status: "aktif",
  },
]

const amenitiesOptions = [
  { value: 'projector', label: 'Projector' },
  { value: 'whiteboard', label: 'Whiteboard' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'video_conference', label: 'Video Conference' },
  { value: 'air_conditioning', label: 'Air Conditioning' },
  { value: 'sound_system', label: 'Sound System' }
]

export default function AdminPage() {
  const [isSpaceDialogOpen, setIsSpaceDialogOpen] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const handleBookingAction = (bookingId: number, action: "approve" | "reject") => {
    console.log(`${action} booking ${bookingId}`)
    // Here you would typically make an API call to update the booking status
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage spaces, bookings, and users across campus</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Peminjaman</TabsTrigger>
            <TabsTrigger value="spaces">Ruang</TabsTrigger>
            <TabsTrigger value="users">User</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalSpaces}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.utilizationRate}%</div>
                  <p className="text-xs text-muted-foreground">+3% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking requests requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 4).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{booking.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.space} • {booking.date} {booking.time}
                          </p>
                        </div>
                        <Badge variant={booking.status === "approved" ? "secondary" : "outline"}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Space Utilization</CardTitle>
                  <CardDescription>Most and least used spaces this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {spaces
                      .sort((a, b) => b.utilization - a.utilization)
                      .slice(0, 4)
                      .map((space) => (
                        <div key={space.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{space.name}</p>
                            <p className="text-sm text-muted-foreground">{space.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{space.utilization}%</p>
                            <p className="text-sm text-muted-foreground">{space.bookings} bookings</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Peminjaman</CardTitle>
                <CardDescription>Reviu dan kelola semua permintaan peminjaman ruang</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Peminjam</TableHead>
                      <TableHead>Ruang</TableHead>
                      <TableHead>Tanggal & Waktu</TableHead>
                      <TableHead>Peserta</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.user}</TableCell>
                        <TableCell>{booking.space}</TableCell>
                        <TableCell>
                          {booking.date}
                          <br />
                          <span className="text-sm text-muted-foreground">{booking.time}</span>
                        </TableCell>
                        <TableCell>{booking.attendees}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === "approved" ? "secondary" : "outline"}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {booking.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleBookingAction(booking.id, "approve")}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleBookingAction(booking.id, "reject")}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spaces" className="space-y-6">
            <Card>
              <CardHeader className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <CardTitle>Manajemen Ruang</CardTitle>
                  <CardDescription>Tambah, edit, dan kelola ruang kampus</CardDescription>
                </div>
                <Dialog open={isSpaceDialogOpen} onOpenChange={setIsSpaceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4" />
                      Tambah Ruang
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Tambah Ruang Baru</DialogTitle>
                      <DialogDescription>Buat ruang baru yang dapat dipesan</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="space-name">Nama Ruang</Label>
                        <Input id="space-name" placeholder="Masukkan nama ruang" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="space-type">Tipe Ruang</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe ruang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="study">Ruang Belajar</SelectItem>
                            <SelectItem value="meeting">Ruang Rapat</SelectItem>
                            <SelectItem value="computer">Laboratorium Komputer</SelectItem>
                            <SelectItem value="event">Ruang Acara</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="capacity">Kapasitas</Label>
                        <Input id="capacity" type="number" placeholder="Maksimal kapasitas" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Lokasi</Label>
                        <Input id="location" placeholder="Gedung dan lantai" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="amenities">Fasilitas</Label>
                        <MultiSelect
                          options={amenitiesOptions}
                          defaultValue={selectedAmenities}
                          onValueChange={setSelectedAmenities}
                          placeholder="Pilih fasilitas..."
                          variant="default"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsSpaceDialogOpen(false)}>
                        <X />
                        Batal
                      </Button>
                      <Button onClick={() => setIsSpaceDialogOpen(false)}>
                        <Plus />
                        Tambah Ruang
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Kapasitas</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Utilisasi</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {spaces.map((space) => (
                      <TableRow key={space.id}>
                        <TableCell className="font-medium">{space.name}</TableCell>
                        <TableCell>{space.type}</TableCell>
                        <TableCell>{space.capacity} orang</TableCell>
                        <TableCell>{space.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              space.status === "aktif"
                                ? "default"
                                : space.status === "maintenance"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {space.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{space.utilization}%</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen User</CardTitle>
                <CardDescription>Kelola akun user dan izin</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Peran</TableHead>
                      <TableHead>Departemen</TableHead>
                      <TableHead>Peminjaman</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.bookings}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Usage Analytics
                  </CardTitle>
                  <CardDescription>Space utilization trends and patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Peak Usage Hours</span>
                      <span className="font-medium">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Most Popular Space Type</span>
                      <span className="font-medium">Study Rooms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Booking Duration</span>
                      <span className="font-medium">2.5 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>No-Show Rate</span>
                      <span className="font-medium">8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    System Alerts
                  </CardTitle>
                  <CardDescription>Important notifications and issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium">Computer Lab C Maintenance</p>
                        <p className="text-sm text-muted-foreground">Scheduled for Dec 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">High Demand Alert</p>
                        <p className="text-sm text-muted-foreground">Study rooms at 95% capacity</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">System Update</p>
                        <p className="text-sm text-muted-foreground">Completed successfully</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
                <CardDescription>Generate detailed reports for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <BarChart3 className="h-4 w-4" />
                    Usage Report
                  </Button>
                  <Button variant="secondary">
                    <Users className="h-4 w-4" />
                    User Activity
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4" />
                    Booking History
                  </Button>
                  <Button variant="ghost">
                    <MapPin className="h-4 w-4" />
                    Space Utilization
                  </Button>
                  <Button variant="destructive">
                    <MapPin className="h-4 w-4" />
                    Space Utilization
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
