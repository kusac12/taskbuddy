import * as React from 'react'
import { format } from 'date-fns'
import { Bold, Italic, Strikethrough, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Task {
  id: string
  title: string
  description?: string
  date: string
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED'
  category: 'Work' | 'Personal'
}

interface EditTaskDialogProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (task: Task) => void
}

export function EditTaskDialog({ task, open, onOpenChange, onUpdate }: EditTaskDialogProps) {
  const [title, setTitle] = React.useState(task.title)
  const [description, setDescription] = React.useState(task.description || '')
  const [category, setCategory] = React.useState(task.category)
  const [status, setStatus] = React.useState(task.status)
  const [date, setDate] = React.useState<Date | undefined>(
    task.date === 'Today' ? new Date() : new Date(task.date)
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,280px]">
          <div className="p-6">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium border-0 px-0 focus-visible:ring-0 mb-6"
            />
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1 border-b pb-2">
                  <Toggle size="sm" aria-label="Toggle bold">
                    <Bold className="h-3.5 w-3.5" />
                  </Toggle>
                  <Toggle size="sm" aria-label="Toggle italic">
                    <Italic className="h-3.5 w-3.5" />
                  </Toggle>
                  <Toggle size="sm" aria-label="Toggle strikethrough">
                    <Strikethrough className="h-3.5 w-3.5" />
                  </Toggle>
                  <div className="ml-auto text-[11px] text-gray-500">
                    0/200 characters
                  </div>
                </div>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add description..."
                  className="resize-none border-0 focus-visible:ring-0 text-sm"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500">
                    Task Category
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500">
                    Due on
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal text-xs"
                      >
                        {date ? format(date, 'dd MMM yyyy') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-500">
                  Task Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TO-DO">TO-DO</SelectItem>
                    <SelectItem value="IN-PROGRESS">IN-PROGRESS</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-500">
                  Attachment
                </label>
                <div className="rounded-lg border-2 border-dashed p-4">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <div className="text-xs text-gray-500">
                      Drop your files here to <span className="text-[#AA00FF]">Upload</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-l bg-[#fafafa] p-6">
            <h3 className="font-medium text-sm mb-4">Activity</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] text-gray-500">
                  You created this task
                </p>
                <p className="text-[11px] text-gray-400">
                  Dec 27 at 2:13 pm
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-gray-500">
                  You changed status from in progress to complete
                </p>
                <p className="text-[11px] text-gray-400">
                  Dec 28 at 2:13 pm
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-gray-500">
                  You updated it
                </p>
                <p className="text-[11px] text-gray-400">
                  Dec 28 at 2:13 pm
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="p-4 border-t">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="text-xs h-8"
          >
            CANCEL
          </Button>
          <Button 
            className="bg-[#AA00FF] hover:bg-[#9000dd] text-xs h-8"
            onClick={() => {
              onUpdate({
                ...task,
                title,
                description,
                category,
                status,
                date: date ? format(date, 'dd MMM yyyy') : 'Today',
              })
              onOpenChange(false)
            }}
          >
            UPDATE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}