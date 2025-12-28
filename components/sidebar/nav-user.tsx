"use client"

import { LogOut } from "lucide-react"
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { authClient } from "@/lib/auth-client"
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
import { useLogout } from "@/features/auth/hooks/useLogout"
import { LoadingButton } from "../common/loading-button"

export function NavUser() {
  const { isLoading, onSubmit } = useLogout()
  // const { data: session } = authClient.useSession()

  return (
    <>
      <SidebarMenu>
        {/* <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={session?.user?.image ?? undefined} alt={session?.user?.name ?? undefined} />
              <AvatarFallback className="rounded-lg">{session?.user?.name?.[0] ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{session?.user?.name}</span>
              <span className="truncate text-xs">{session?.user?.email}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
        <SidebarMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <SidebarMenuButton tooltip="Logout">
                <LogOut />
                Log out
              </SidebarMenuButton>
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
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
