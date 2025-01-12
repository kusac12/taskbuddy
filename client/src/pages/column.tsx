import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TaskCard } from './task-card'
import { ChevronUp } from 'lucide-react'

interface Task {
  id: string
  title: string
  description?: string
  date: string
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED'
  category: 'Work' | 'Personal'
}

interface ColumnProps {
  title: string
  tasks: Task[]
  status: Task['status']
}

export function Column({ title, tasks, status }: ColumnProps) {
  const getBgColor = (status: Task['status']) => {
    switch (status) {
      case 'TO-DO':
        return 'bg-[#FFF0FF]'
      case 'IN-PROGRESS':
        return 'bg-[#E6FBFF]'
      case 'COMPLETED':
        return 'bg-[#E6FFE6]'
      default:
        return 'bg-white'
    }
  }

  return (
    <div className={`rounded-md ${getBgColor(status)}`}>
      <div className="px-4 py-2 flex items-center justify-between">
        <h2 className="text-xs font-medium text-gray-700">
          {title} ({tasks.length})
        </h2>
        <ChevronUp className="h-3.5 w-3.5 text-gray-500" />
      </div>
      <div className="p-3">
        <SortableContext
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  )
}

