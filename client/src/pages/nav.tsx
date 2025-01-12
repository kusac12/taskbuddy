import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ListView } from './list-view'
import BoardView from './board-view'

export default function TaskBuddy() {
  return (
    <>
    <div className="p-4 bg-green-50">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-semibold">TaskBuddy</h1>
          <nav className="flex space-x-2">
            <Button variant="ghost" className="text-sm">
              List
            </Button>
            <Button variant="ghost" className="text-sm">
              Board
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-01-11%2001-41-57-RzwzwRYCcgF3fqaVJUyyurXGEbJEQJ.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm">Aravind</span>
        </div>
      </header>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Filter by:</span>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Due Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search"
              className="pl-8 w-[250px]"
            />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            ADD TASK
          </Button>
        </div>
      </div>
    </div>
    <BoardView />
    </>
  )
}

