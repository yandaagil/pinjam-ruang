import { DoorOpen, MapPin, Users, Wrench, LayoutGrid } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const masterDataLinks = [
  {
    title: "Ruangan",
    description: "Kelola data ruangan yang tersedia untuk dipinjam",
    icon: DoorOpen,
    href: "/dashboard/master/ruangan",
    color: "text-blue-600",
  },
  {
    title: "Fasilitas",
    description: "Kelola daftar fasilitas yang tersedia di setiap ruangan",
    icon: Wrench,
    href: "/dashboard/master/fasilitas",
    color: "text-green-600",
  },
  {
    title: "Kapasitas",
    description: "Atur kategori kapasitas ruangan",
    icon: Users,
    href: "/dashboard/master/kapasitas",
    color: "text-purple-600",
  },
  {
    title: "Lokasi",
    description: "Kelola data gedung dan lokasi ruangan",
    icon: MapPin,
    href: "/dashboard/master/lokasi",
    color: "text-red-600",
  },
  {
    title: "Tipe Ruang",
    description: "Kelola jenis dan kategori ruangan",
    icon: LayoutGrid,
    href: "/dashboard/master/tipe-ruang",
    color: "text-orange-600",
  },
]

export default function MasterDataPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {masterDataLinks.map((item) => (
        <Link key={item.href} href={item.href} className="block h-full group">
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </div>
              </div>
              <CardDescription className="pt-2">
                {item.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
