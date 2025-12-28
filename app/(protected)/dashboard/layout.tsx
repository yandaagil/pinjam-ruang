import { DynamicBreadcrumb } from "@/components/layouts/dynamic-breadcrumb"
import { AppSidebar } from "@/components/sidebar/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { requireAdmin } from "@/hooks/useSession"

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-[calc(100%-var(--sidebar-width))]">
        <header className="flex h-12 sticky top-0 bg-background z-50 border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-x-hidden overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
