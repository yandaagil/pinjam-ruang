import { Inbox } from "lucide-react"

interface NoDataProps {
  message?: string
}

const NoData = ({
  message = "Tidak ada data yang tersedia untuk ditampilkan saat ini.",
}: NoDataProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 mx-auto">
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full bg-muted p-3">
          <Inbox className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-semibold">
            Tidak ada data
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default NoData
