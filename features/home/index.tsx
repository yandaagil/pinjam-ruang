import Navbar from "@/components/layouts/navbar"
import { getActiveRooms } from "@/db/queries/master/room"
import RoomList from "@/features/home/components/room-list"
import { Calendar, MapPin, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  const rooms = await getActiveRooms()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b bg-muted/10">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />

        <div className="container relative py-20 md:py-32 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Sistem Peminjaman Ruangan Terpadu
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                Kelola & Reservasi <br />
                <span className="text-primary">Ruangan</span> dengan Mudah
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Platform modern untuk manajemen peminjaman ruangan. Cek ketersediaan real-time, booking instan, dan kelola jadwal kegiatan Anda dalam satu tempat.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/calendar">
                  <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all">
                    Mulai Reservasi <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/calendar">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm">
                    Lihat Jadwal
                  </Button>
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Proses Cepat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Approval Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Real-time Update</span>
                </div>
              </div>
            </div>

            {/* Stats / Visuals */}
            <div className="relative lg:block hidden">
              <div className="grid gap-6 relative z-10">
                <div className="bg-card/80 backdrop-blur-sm border rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-foreground">{rooms.length}</p>
                      <p className="text-sm font-medium text-muted-foreground">Ruangan Tersedia</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card/80 backdrop-blur-sm border rounded-2xl p-6 shadow-lg transform translate-x-8 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-foreground">{Array.from(new Set(rooms.map(r => r.roomType.name))).length}</p>
                      <p className="text-sm font-medium text-muted-foreground">Tipe Ruangan</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card/80 backdrop-blur-sm border rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-foreground">24/7</p>
                      <p className="text-sm font-medium text-muted-foreground">Akses Sistem</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative blobs behind stats */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Room List Section */}
      <div className="container py-20 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Pilihan Ruangan</h2>
          <p className="text-lg text-muted-foreground">
            Temukan ruangan yang sesuai dengan kebutuhan acara Anda. Gunakan filter untuk memudahkan pencarian.
          </p>
        </div>
        <RoomList rooms={rooms} />
      </div>
    </div>
  )
}
