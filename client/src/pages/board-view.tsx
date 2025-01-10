'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Menu } from 'lucide-react'
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
import { Column } from './column'
import { ListView } from './list-view'
import { TaskCard } from './task-card'

interface Task {
  id: string
  title: string
  description?: string
  date: string
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED'
  category: 'Work' | 'Personal'
}

export default function BoardView() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: '1',
      title: 'Interview with Design Team',
      description: 'Discuss the new design system and component library',
      date: 'Today',
      status: 'TO-DO',
      category: 'Work',
    },
    {
      id: '2',
      title: 'Team Meeting',
      date: '30 Dec 2024',
      status: 'TO-DO',
      category: 'Personal',
    },
    {
      id: '3',
      title: 'Design a Dashboard page along with wireframes',
      date: '21 Dec 2024',
      status: 'TO-DO',
      category: 'Work',
    },
    {
      id: '4',
      title: 'Morning Workout',
      date: 'Today',
      status: 'IN-PROGRESS',
      category: 'Work',
    },
    {
      id: '5',
      title: 'Code Review',
      date: 'Today',
      status: 'IN-PROGRESS',
      category: 'Personal',
    },
    {
      id: '6',
      title: 'Submit Project Proposal',
      date: 'Today',
      status: 'COMPLETED',
      category: 'Work',
    },
    {
      id: '7',
      title: 'Birthday Gift Shopping',
      date: 'Today',
      status: 'COMPLETED',
      category: 'Personal',
    },
  ])

  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [currentView, setCurrentView] = React.useState<'list' | 'board'>('list')
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      // coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-6">
          <span className="text-base font-medium">TaskBuddy</span>
          <div className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-xs px-3 py-1.5 ${currentView === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setCurrentView('list')}
            >
              List
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-xs px-3 py-1.5 ${currentView === 'board' ? 'bg-gray-100' : ''}`}
              onClick={() => setCurrentView('board')}
            >
              Board
            </Button>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Select defaultValue="category">
              <SelectTrigger className="h-7 text-xs bg-[#f8f8f8] border-0 w-[100px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="date">
              <SelectTrigger className="h-7 text-xs bg-[#f8f8f8] border-0 w-[100px]">
                <SelectValue placeholder="Due Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Due Date</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transform text-gray-400" />
            <Input 
              className="h-7 w-[180px] pl-8 text-xs bg-[#f8f8f8] border-0" 
              placeholder="Search" 
            />
          </div>
          <Button 
            className="h-7 bg-[#AA00FF] hover:bg-[#9000dd] text-xs px-4" 
            size="sm"
          >
            ADD TASK
          </Button>
          <div className="hidden md:flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <span className="text-xs">Aravind</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 border-b">
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs px-3 py-1.5 flex-1 ${currentView === 'list' ? 'bg-gray-100' : ''}`}
                onClick={() => setCurrentView('list')}
              >
                List
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs px-3 py-1.5 flex-1 ${currentView === 'board' ? 'bg-gray-100' : ''}`}
                onClick={() => setCurrentView('board')}
              >
                Board
              </Button>
            </div>
            <Select defaultValue="category">
              <SelectTrigger className="h-7 text-xs bg-[#f8f8f8] border-0 w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="date">
              <SelectTrigger className="h-7 text-xs bg-[#f8f8f8] border-0 w-full">
                <SelectValue placeholder="Due Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Due Date</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transform text-gray-400" />
              <Input 
                className="h-7 w-full pl-8 text-xs bg-[#f8f8f8] border-0" 
                placeholder="Search" 
              />
            </div>
          </div>
        </div>
      )}
      <main className="container mx-auto max-w-7xl p-4 md:p-6">
        {currentView === 'board' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={({active}) => setActiveId(active.id as string)}
            onDragEnd={({active, over}) => {
              if (over && active.id !== over.id) {
                const activeTask = tasks.find(t => t.id === active.id)
                const overTask = tasks.find(t => t.id === over.id)
                if (activeTask && overTask) {
                  setTasks(tasks.map(t => 
                    t.id === activeTask.id 
                      ? {...t, status: overTask.status}
                      : t
                  ))
                }
              }
              setActiveId(null)
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Column 
                title="TO-DO" 
                tasks={tasks.filter(t => t.status === 'TO-DO')}
                status="TO-DO"
              />
              <Column 
                title="IN-PROGRESS" 
                tasks={tasks.filter(t => t.status === 'IN-PROGRESS')}
                status="IN-PROGRESS"
              />
              <Column 
                title="COMPLETED" 
                tasks={tasks.filter(t => t.status === 'COMPLETED')}
                status="COMPLETED"
              />
            </div>
            <DragOverlay>
              {activeId ? (
                <TaskCard 
                  task={tasks.find(t => t.id === activeId)!} 
                  isDragging 
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <ListView 
            tasks={tasks} 
            onTaskUpdate={(updatedTask) => {
              setTasks(tasks.map(t => 
                t.id === updatedTask.id ? updatedTask : t
              ))
            }} 
          />
        )}
      </main>
    </div>
  )
}

