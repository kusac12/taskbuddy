import { useState } from 'react'
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { TaskGroup } from './task-group'
import { Task } from '@/lib/types'


export function groupTasksByStatus(tasks: Task[]): { status: Task['status']; tasks: Task[] }[] {
    const groupedTasks = tasks.reduce((groups, task) => {
        if (!groups[task.status]) {
            groups[task.status] = [];
        }
        groups[task.status].push(task)
        return groups
    }, {} as Record<Task['status'], Task[]>)

    return Object.entries(groupedTasks).map(([status, tasks]) => ({
        status: status as Task['status'],
        tasks,
    }))

}


const initialTasks: Task[] = [
    {
        taskId: '1',
        title: 'Interview with Design Team',
        description: 'Interview with the design team to discuss the new project requirements.',
        dueDate: new Date(),
        status: 'TO-DO',
        category: 'Work',
        attachment: "",
        createdAt: new Date(),
    },
    {
        taskId: '2',
        title: 'Team Meeting',
        description: 'Meeting with the team to discuss the project requirements and assign tasks.',
        dueDate: new Date('2024-12-30'),
        status: 'TO-DO',
        category: 'Personal',
        attachment: "",
        createdAt: new Date(),
    },
    {
        taskId: '4',
        title: 'Review Project Proposal',
        description: 'Review the project proposal and provide feedback.',
        dueDate: new Date('2024-12-28'),
        status: 'IN-PROGRESS',
        category: 'Work',
        attachment: "",
        createdAt: new Date(),
    },
    {
        taskId: '5',
        title: 'Complete Online Course',
        description: 'Complete the online course on React.js.',
        dueDate: new Date('2024-12-29'),
        status: 'IN-PROGRESS',
        category: 'Personal',
        attachment: "",
        createdAt: new Date(),
    },
    {
        taskId: '6',
        title: 'Submit Expense Report',
        description: 'Submit the expense report for the last month.',
        dueDate: new Date('2024-12-27'),
        status: 'COMPLETED',
        category: 'Work',
        attachment: "",
        createdAt: new Date(),
    },
]

let nextId = initialTasks.length + 1

export function TaskManager() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    function handleDragStart(event: DragStartEvent) {
        // You can add any logic needed when drag starts
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return

        const activeTask = tasks.find((t) => t.taskId === active.id)
        const overTask = tasks.find((t) => t.taskId === over.id)

        if (!activeTask || !overTask) return

        if (activeTask.status !== overTask.status) {
            setTasks((tasks) =>
                tasks.map((t) =>
                    t.taskId === active.id ? { ...t, status: overTask.status } : t
                )
            )
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over) return

        if (active.id !== over.id) {
            setTasks((tasks) => {
                const oldIndex = tasks.findIndex((t) => t.taskId === active.id)
                const newIndex = tasks.findIndex((t) => t.taskId === over.id)
                return arrayMove(tasks, oldIndex, newIndex)
            })
        }
    }

    function handleAddTask(newTask: Omit<Task, 'id' | 'completed'>) {
        setTasks((tasks) => [
            ...tasks,
            {
                id: String(nextId++),
                completed: false,
                ...newTask,
            },
        ])
    }

    function handleStatusChange(id: string, status: Task['status']) {
        setTasks((tasks) =>
            tasks.map((task) => (task.taskId === id ? { ...task, status } : task))
        )
    }

    function handleDeleteTask(id: string) {
        setTasks((tasks) => tasks.filter((task) => task.taskId !== id))
    }

    function handleToggleComplete(id: string) {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.taskId === id ? { ...task } : task
            )
        )
    }

    const taskGroups = groupTasksByStatus(tasks)

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="mx-auto max-w-6xl space-y-4 p-4">
                <div className="flex items-center gap-2 px-4 text-sm font-medium text-gray-500">
                    <div className="w-5" />
                    <div className="w-4" />
                    <div className="flex-grow">Task name</div>
                    <div className="hidden sm:block w-32">Due on</div>
                    <div className="w-28">Task Status</div>
                    <div className="hidden md:block w-24">Category</div>
                    <div className="w-8" />
                </div>
                <SortableContext items={tasks.map(t => t.taskId)}>
                    <div className="space-y-4">
                        {taskGroups.map((group) => (
                            <TaskGroup
                                key={group.status}
                                {...group}
                                onStatusChange={handleStatusChange}
                                onDelete={handleDeleteTask}
                                onToggleComplete={handleToggleComplete}
                                onAddTask={group.status === 'TO-DO' ? handleAddTask : undefined}
                            />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </DndContext>
    )
}