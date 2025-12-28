import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorPageProps {
  message?: string
  onRetry?: () => void
}

const ErrorPage = ({
  message = "Terjadi kesalahan saat memuat data",
  onRetry
}: ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 mx-auto">
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-semibold">
            Oops! Terjadi Kesalahan
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {message}
          </p>
        </div>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-2"
        >
          <RefreshCw />
          Coba Lagi
        </Button>
      )}
    </div>
  )
}

export default ErrorPage
