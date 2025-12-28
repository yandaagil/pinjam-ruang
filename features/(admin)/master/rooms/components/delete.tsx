'use client'

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
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
import { RoomWithDetails } from '@/types/database.type'
import { useDelete } from '../hooks/useDelete'
import { LoadingButton } from '@/components/common/loading-button'
import TooltipWrapper from '@/components/common/tooltip-wrapper'

const Delete = ({ data }: { data: RoomWithDetails }) => {
  const { isModalOpen, setIsModalOpen, isLoading, handleDelete } = useDelete(data)

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <TooltipWrapper tooltip="Hapus">
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash />
          </Button>
        </AlertDialogTrigger>
      </TooltipWrapper>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin ingin menghapus ruangan ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Data ruangan <span className="font-semibold">{data.name}</span> yang dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              isLoading={isLoading}
              loadingText="Menghapus..."
              text="Hapus"
              variant="destructive"
              className='w-fit'
              onClick={handleDelete}
              disabled={isLoading}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Delete
