"use client"

import { usePathname } from "next/navigation"

const masterRoutes: Record<string, {
  title: string
}> = {
  "/dashboard/master": {
    title: "Master Data",
  },
  "/dashboard/master/ruangan": {
    title: "Master Ruangan",
  },
  "/dashboard/master/fasilitas": {
    title: "Master Fasilitas",
  },
  "/dashboard/master/kapasitas": {
    title: "Master Kapasitas",
  },
  "/dashboard/master/lokasi": {
    title: "Master Lokasi",
  },
  "/dashboard/master/tipe-ruang": {
    title: "Master Tipe Ruang",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const config = masterRoutes[pathname] || {
    title: "Master Data",
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{config.title}</h1>
      </div>

      {children}
    </div>
  )
}