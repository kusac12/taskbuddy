'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Bold, Italic, List, Upload, X, Paperclip, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Toggle } from '@/components/ui/toggle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface CreateTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const [description, setDescription] = React.useState('')
  const [category, setCategory] = React.useState('Work')
  const [date, setDate] = React.useState<Date>()
  const [files, setFiles] = React.useState<File[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-normal">Create Task</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Input 
              placeholder="Task title" 
              className="h-12 text-base bg-[#f8f8f8] border-0"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-1 border-b pb-2">
                <Toggle size="sm" aria-label="Toggle bold">
                  <Bold className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle size="sm" aria-label="Toggle italic">
                  <Italic className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle size="sm" aria-label="Toggle list">
                  <List className="h-3.5 w-3.5" />
                </Toggle>
                <div className="ml-auto text-[11px] text-gray-500">
                  {description.length}/300 characters
                </div>
              </div>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={300}
                className="w-full min-h-[100px] bg-[#f8f8f8] rounded-md border-0 p-3 text-sm focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">
                Task Category*
              </Label>
              <RadioGroup 
                value={category} 
                onValueChange={setCategory}
                className="flex gap-2"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="Work" id="work" className="peer sr-only" />
                  <Label
                    htmlFor="work"
                    className="rounded-full px-4 py-1.5 text-xs border peer-aria-checked:bg-[#AA00FF] peer-aria-checked:text-white peer-aria-checked:border-[#AA00FF] cursor-pointer"
                  >
                    Work
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="Personal" id="personal" className="peer sr-only" />
                  <Label
                    htmlFor="personal"
                    className="rounded-full px-4 py-1.5 text-xs border peer-aria-checked:bg-[#AA00FF] peer-aria-checked:text-white peer-aria-checked:border-[#AA00FF] cursor-pointer"
                  >
                    Personal
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">
                Due on*
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-[#f8f8f8] border-0"
                  >
                    {date ? format(date, 'dd/MM/yyyy') : 'DD/MM/YYYY'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">
                Task Status*
              </Label>
              <Select>
                <SelectTrigger className="bg-[#f8f8f8] border-0">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">TO-DO</SelectItem>
                  <SelectItem value="in-progress">IN-PROGRESS</SelectItem>
                  <SelectItem value="completed">COMPLETED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-gray-500">
              Attachment
            </Label>
            <div 
              className={`rounded-lg border-2 border-dashed transition-colors ${
                isDragging ? 'border-[#AA00FF] bg-[#AA00FF]/5' : 'border-gray-200'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                className="hidden"
                multiple
              />
              <div 
                className="flex flex-col items-center gap-2 text-center p-4 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-xs text-gray-500">
                  Drop your files here or <span className="text-[#AA00FF]">Upload</span>
                </div>
              </div>
            </div>
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 bg-[#f8f8f8] rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-gray-400" />
                      <span className="text-sm truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => removeFile(file)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-9 rounded-full px-6"
            >
              CANCEL
            </Button>
            <Button 
              className="h-9 rounded-full px-6 bg-[#AA00FF] hover:bg-[#9000dd]"
            >
              CREATE
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

