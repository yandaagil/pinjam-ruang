import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type VariantProps } from "class-variance-authority"
import { Spinner } from "../ui/spinner"

interface LoadingButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  isLoading: boolean
  loadingText: string
  text: string
  className?: string
}

export function LoadingButton({
  isLoading = false,
  loadingText,
  text,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn("w-full", className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Spinner />}
      {isLoading ? loadingText : text}
    </Button>
  )
}