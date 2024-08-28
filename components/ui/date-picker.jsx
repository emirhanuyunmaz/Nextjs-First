"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "/components/lib"
import { Button } from "/components/ui/button"
import { Calendar } from "/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "/components/ui/popover"

export function DatePicker({userDate , setUserDate}) {
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-start text-left font-normal",
            !userDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {userDate ? format(userDate, "dd/MM/yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={userDate}
          onSelect={setUserDate}
          
        />
      </PopoverContent>
    </Popover>
  )
}
