import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { TaskGroup as TaskGroupType } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TaskItem } from './task-item'


interface TaskGroupProps extends TaskGroupType {
  onStatusChange: (id: string, status: TaskGroupType['status']) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onAddTask?: (task: Omit<TaskGroupType['tasks'][number], 'id' | 'completed'>) => void
}

export function TaskGroup({
  title,
  status,
  tasks,
  onStatusChange,
  onDelete,
  onToggleComplete,
  onAddTask,
}: TaskGroupProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  })

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={status}
      className={cn(
        'divide-y',
        status === 'TO-DO' && 'bg-pink-50',
        status === 'IN-PROGRESS' && 'bg-blue-50',
        status === 'COMPLETED' && 'bg-green-50'
      )}
      
    >
      <AccordionItem value={status} className="border-b-0">
        <AccordionTrigger className="px-4 hover:no-underline">
          <div className="flex items-center gap-2">
            <span>
              {title} ({tasks.length})
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {/* {status === 'TO-DO' && onAddTask
           && <AddTaskForm onAddTask={onAddTask} />
           } */}
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div
              ref={setNodeRef}
              className="bg-black"
            >
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                />
              ))}
            </div>
          </SortableContext>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

