import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

interface DataTableLoaderProps {
  totalRow: number
  totalColumn: number
  className?: string
}

const DataTableLoader: React.FC<DataTableLoaderProps> = ({ totalRow, totalColumn, className }) => {
  return (
    <>
      {Array.from({ length: totalRow }).map((_, index) => (
        <TableRow key={index} className="animate-pulse">
          {Array.from({ length: totalColumn }).map((_, index) => (
            <TableCell key={index} className={cn("p-4", className)}>
              <Skeleton className="h-5 w-3/4" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default DataTableLoader