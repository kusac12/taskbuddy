import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MoreHorizontal, Plus, GripVertical } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Task {
  id: string
  title: string
  description?: string
  date: string
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED'
  category: 'Work' | 'Personal'
}

interface ListViewProps {
  tasks: Task[]
  onTaskUpdate?: (updatedTask: Task) => void
}

interface DraggableTaskRowProps {
  task: Task
  onTaskUpdate?: (updatedTask: Task) => void;
}

function DraggableTaskRow({ task, onTaskUpdate }: DraggableTaskRowProps) {
  const handleCheckboxChange = (checked: boolean) => {
    if (onTaskUpdate) {
      onTaskUpdate({
        ...task,
        status: checked ? 'COMPLETED' : 'TO-DO',
      });
    }
  };
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
      // {...listeners}
      className="bg-white cursor-ns-resize"
    >
      
      <div className="flex items-center gap-4 py-2 px-4">
        <Checkbox
          className='h-3 w-3 rounded-md'
          checked={task.status === 'COMPLETED'}
          onCheckedChange={handleCheckboxChange}
        />
        <GripVertical className='h-3 w-3' />
        <span className="text-sm">{task.title}</span>
        <span className="text-xs text-gray-500">{task.date}</span>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
          <div className="flex flex-col">
              {['Work', 'Personal', 'Urgent'].map((option) => (
                <Button
                  key={option}
                  variant="ghost"
                  onClick={() => {}}
                  className={`text-left ${true ? 'font-bold' : ''}`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-600">{task.category}</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}

export function ListView({ tasks, onTaskUpdate }: ListViewProps) {
  const [newTask, setNewTask] = React.useState<Pick<Task, 'title' | 'status' | 'category'>>({
    title: '',
    status: 'TO-DO',
    category: 'Work'
  })
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const todoTasks = tasks.filter(t => t.status === 'TO-DO')
  const inProgressTasks = tasks.filter(t => t.status === 'IN-PROGRESS')
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const getStatusBgColor = (status: Task['status']) => {
    switch (status) {
      case 'TO-DO':
        return 'bg-[#FAC3FF]'
      case 'IN-PROGRESS':
        return 'bg-[#E6FBFF]'
      case 'COMPLETED':
        return 'bg-[#E6FFE6]'
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const activeTask = tasks.find(t => t.id === active.id)
      const overTask = tasks.find(t => t.id === over.id)

      if (activeTask && overTask && onTaskUpdate) {
        onTaskUpdate({
          ...activeTask,
          status: overTask.status
        })
      }
    }

    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={({ active }) => setActiveId(active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <Accordion type="multiple" defaultValue={['todo', 'in-progress', 'completed']} className="space-y-4">
        <AccordionItem value="todo" className={`${getStatusBgColor('TO-DO')} border-none rounded-lg`}>
          <AccordionTrigger className="px-4 hover:no-underline">
            <span className="text-xs font-medium">Todo ({todoTasks.length})</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <div className="grid grid-cols-[auto,1fr,auto,auto,auto] items-center gap-4 py-2 px-4 bg-white/50">
                <Plus className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="h-7 text-sm bg-transparent border-0 p-0 focus-visible:ring-0"
                />
                <Select
                  value={newTask.status}
                  onValueChange={(value: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED') =>
                    setNewTask({ ...newTask, status: value })
                  }
                >
                  <SelectTrigger className="h-7 text-xs bg-[#f8f8f8] border-0 w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TO-DO">TO-DO</SelectItem>
                    <SelectItem value="IN-PROGRESS">IN-PROGRESS</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={newTask.category}
                  onValueChange={(value: 'Work' | 'Personal') =>
                    setNewTask({ ...newTask, category: value })
                  }
                >
                  <SelectTrigger className="h-7 text-xs bg-[#f8f8f8] border-0 w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="h-7 text-xs px-3 bg-[#AA00FF] hover:bg-[#9000dd]">
                    ADD
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs px-3">
                    CANCEL
                  </Button>
                </div>
              </div>
              <SortableContext items={todoTasks} strategy={verticalListSortingStrategy}>
                {todoTasks.map((task) => (
                  <DraggableTaskRow key={task.id} task={task} onTaskUpdate={onTaskUpdate} />
                ))}
              </SortableContext>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="in-progress" className={`rounded-md ${getStatusBgColor('IN-PROGRESS')} border-none`}>
          <AccordionTrigger className="px-4 hover:no-underline">
            <span className="text-xs font-medium">In-Progress ({inProgressTasks.length})</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <SortableContext items={inProgressTasks} strategy={verticalListSortingStrategy}>
                {inProgressTasks.map((task) => (
                  <DraggableTaskRow key={task.id} task={task} />
                ))}
              </SortableContext>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="completed" className={`rounded-md ${getStatusBgColor('COMPLETED')} border-none`}>
          <AccordionTrigger className="px-4 hover:no-underline">
            <span className="text-xs font-medium">Completed ({completedTasks.length})</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <SortableContext items={completedTasks} strategy={verticalListSortingStrategy}>
                {completedTasks.map((task) => (
                  <DraggableTaskRow key={task.id} task={task} />
                ))}
              </SortableContext>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <DragOverlay>
        {activeId ? (
          <div className="bg-white rounded-md shadow-lg">
            <DraggableTaskRow
              task={tasks.find(t => t.id === activeId)!}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

