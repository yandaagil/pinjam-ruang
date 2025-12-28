'use client'

import { BookOpen, CalendarCheck, CalendarDays, Home, LogOut, ShieldUser } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuthState } from '@/hooks/useAuthState'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LoadingButton } from '../common/loading-button'
import { useLogout } from '@/features/auth/hooks/useLogout'

const NAVIGATION_ITEMS: { label: string; href: string; icon: React.ComponentType }[] = [
  {
    label: 'Beranda',
    href: '/',
    icon: Home
  },
  {
    label: 'Kalender',
    href: '/calendar',
    icon: CalendarDays
  },
  {
    label: 'Reservasi Saya',
    href: '/my-reservations',
    icon: CalendarCheck
  },
  {
    label: 'Admin Panel',
    href: '/dashboard',
    icon: ShieldUser
  },
]

const Navbar = () => {
  const pathname = usePathname()
  const { isLoading, onSubmit } = useLogout()
  const { isAuthenticated, isAdmin, isPending } = useAuthState()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 mx-auto items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold text-foreground">Pinjam Ruang</span>
          </Link>
        </div>

        {/* NAVIGATION */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-2">
            {NAVIGATION_ITEMS
              .filter((item) => {
                if (item.href === '/dashboard' && !isAdmin) return false
                if (item.href === '/my-reservations' && isAdmin || item.href === '/calendar' && isAdmin) return false
                return true
              })
              .map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href
                return (
                  <Link key={href} href={href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent'
                      )}
                    >
                      <Icon />
                      {label}
                    </Button>
                  </Link>
                )
              })
            }
          </div>
        )}

        {/* LOGIN / LOGOUT */}
        <div className="flex items-center space-x-2">
          {!isAuthenticated && !isPending ? (
            <Button variant="default" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            isAuthenticated && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Log out
                    <LogOut />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Anda akan keluar dari aplikasi ini.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <LoadingButton
                        isLoading={isLoading}
                        loadingText="Memproses..."
                        text="Keluar"
                        variant="destructive"
                        className="w-fit"
                        onClick={onSubmit}
                        disabled={isLoading}
                      />
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar