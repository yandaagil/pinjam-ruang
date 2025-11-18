'use client'

import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '../common/theme-switcher'

const NAVIGATION_ITEMS = [
  {
    label: 'Dashboard',
    href: '/',
  },
  {
    label: 'Kalender',
    href: '/calendar',
  },
  {
    label: 'Admin Panel',
    href: '/admin',
  },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 mx-auto items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold text-foreground">Pinjam Ruang</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`${isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent'
                    }`}
                >
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Button variant="ghost" size="sm">
            Profil
          </Button>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar