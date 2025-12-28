"use client"

import * as React from "react"
import {
  CalendarCheck,
  Home,
  Settings,
  User,
  DoorOpen,
  Wrench,
  Users,
  MapPin,
  LayoutGrid,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Reservasi",
      url: "/dashboard/reservasi",
      icon: CalendarCheck,
    }
  ],
  master: [
    {
      title: "Ruangan",
      url: "/dashboard/master/ruangan",
      icon: DoorOpen,
    },
    {
      title: "Fasilitas",
      url: "/dashboard/master/fasilitas",
      icon: Wrench,
    },
    {
      title: "Kapasitas",
      url: "/dashboard/master/kapasitas",
      icon: Users,
    },
    {
      title: "Lokasi",
      url: "/dashboard/master/lokasi",
      icon: MapPin,
    },
    {
      title: "Tipe Ruang",
      url: "/dashboard/master/tipe-ruang",
      icon: LayoutGrid,
    },
  ],
  pengaturan: [
    {
      title: "Akun",
      url: "/dashboard/akun",
      icon: User,
    },
    {
      title: "Pengaturan",
      url: "/dashboard/pengaturan",
      icon: Settings,
    },
    {
      title: "Halaman Client",
      url: "/",
      icon: Home,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.main} label="Main" />
        <NavMain items={data.master} label="Master Data" />
        <NavMain items={data.pengaturan} label="Pengaturan" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
