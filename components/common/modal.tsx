import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type FC } from "react"
import TooltipWrapper from "./tooltip-wrapper"

type ModalProps = {
  trigger: React.ReactNode
  title: string
  dialogDescription?: string
  children: React.ReactNode
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  triggerTooltip?: string
  className?: string
}

const Modal: FC<ModalProps> = ({
  trigger,
  title,
  dialogDescription,
  children,
  isModalOpen,
  setIsModalOpen,
  triggerTooltip,
  className
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <TooltipWrapper tooltip={triggerTooltip}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className={`sm:max-w-[425px] ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal