import type { FC } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

type TooltipWrapperProps = {
  tooltip?: string
  children: React.ReactNode
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({ tooltip, children }) => {
  if (!tooltip) return <>{children}</>

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

export default TooltipWrapper