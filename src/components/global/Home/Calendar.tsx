"use client"

import React from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Calendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const today = new Date()

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const getMonthOptions = () => {
    const options = []
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentMonth.getFullYear(), i, 1)
      options.push(
        <SelectItem key={i} value={i.toString()}>
          {format(date, 'MMMM')}
        </SelectItem>
      )
    }
    return options
  }

  const getDayColor = (day: Date) => {
    if (isSameDay(day, today)) {
      return 'bg-[#10b77f] text-white'
    }
    return ''
  }

  return (
    <Card className="w-full h-fit mx-auto bg-card shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-card border-b">
        <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
        <Select
          value={currentMonth.getMonth().toString()}
          onValueChange={(value) => setCurrentMonth(new Date(currentMonth.getFullYear(), parseInt(value), 1))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue>{format(currentMonth, 'MMMM')}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {getMonthOptions()}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-xs font-medium text-gray-50">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {Array.from({ length: getDay(monthStart) }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2" />
          ))}
          {monthDays.map((day:any) => {
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const dayColor = getDayColor(day)
            return (
              <TooltipProvider key={day.toString()}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-2 text-sm rounded-full ${
                        !isCurrentMonth ? 'text-gray-300' : dayColor || 'text-gray-700'
                      } cursor-pointer`}
                    >
                      {format(day, 'd')}
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}