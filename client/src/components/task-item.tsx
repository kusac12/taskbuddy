import { forwardRef } from 'react'
import { format } from 'date-fns'
import { GripVertical, MoreHorizontal } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Task } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { StatusPopover } from './status-popover'

interface TaskItemProps {
  task: Task
  onStatusChange: (id: string, status: Task['status']) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export const TaskItem = forwardRef<HTMLDivElement, TaskItemProps>(
  ({ task, onStatusChange, onDelete, onToggleComplete }, ref) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({ id: task.id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border-b last:border-b-0"
      >
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="h-5 w-5"
        />
        <div className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex-grow min-w-0 truncate text-sm">
          {task.title}
        </div>
        <div className="hidden sm:block text-sm text-gray-500 w-32">
          {task.dueDate ? format(task.dueDate, 'dd MMM, yyyy') : 'No date'}
        </div>
        <StatusPopover 
          status={task.status} 
          onStatusChange={(status) => onStatusChange(task.id, status)} 
        />
        <Badge variant="outline" className="hidden md:inline-flex w-24 justify-center">
          {task.category}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onDelete(task.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
)

TaskItem.displayName = 'TaskItem'

