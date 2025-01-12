import * as React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EditTaskDialog } from './edit-task-dialog'

interface Task {
  id: string
  title: string
  description?: string
  date: string
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED'
  category: 'Work' | 'Personal'
}

interface TaskCardProps {
  task: Task
  isDragging?: boolean
  onUpdate?: (task: Task) => void
}

export function TaskCard({ task, isDragging = false, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "bg-white rounded-md p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] cursor-move",
          isDragging && "opacity-50"
        )}
      >
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-xs font-medium text-gray-900">{task.title}</h3>
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">⋮</Button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-[11px] text-gray-500">{task.date}</span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="text-[11px] px-2 py-0.5 rounded bg-[#f8f8f8] text-gray-600">
              {task.status}
            </div>
            <div className="text-[11px] text-gray-600">{task.category}</div>
            <div className="flex items-center gap-2">
              <button 
                className="text-[11px] text-gray-600 hover:text-gray-900"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button className="text-[11px] text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditTaskDialog
        task={task}
        open={isEditing}
        onOpenChange={setIsEditing}
        onUpdate={onUpdate}
      />
    </>
  )
}

