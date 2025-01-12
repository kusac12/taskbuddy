import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Task } from "@/lib/types"
import { Badge } from "./ui/badge"

interface StatusPopoverProps {
  status: Task['status']
  onStatusChange: (status: Task['status']) => void
}

export function StatusPopover({ status, onStatusChange }: StatusPopoverProps) {
  const statuses: Task['status'][] = ['TO-DO', 'IN-PROGRESS', 'COMPLETED']

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Badge
            variant="secondary"
            className={`whitespace-nowrap w-28 justify-center ${
              status === 'TO-DO'
                ? 'bg-pink-100 text-pink-800'
                : status === 'IN-PROGRESS'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {status}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0">
        <div className="flex flex-col">
          {statuses.filter(s => s !== status).map((s) => (
            <Button
              key={s}
              variant="ghost"
              className="justify-start"
              onClick={() => onStatusChange(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

