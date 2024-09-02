"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../lib"
import { Button } from "/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "/components/ui/popover"
import { userListPageContext } from "../../context/userListPageContext"


export function ComboboxUser({value,setValue}) {
    const [open, setOpen] = React.useState(false)
    // const [value, setValue] = React.useState("")
    const contextU = React.useContext(userListPageContext)

//   contextU.userList = contextU.userList
    // console.log("Combobox:",contextU.userList);
    
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? contextU.userList.find((framework) => framework._id === value)?.name
            : "Select preson"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search person" />
          <CommandList>
            <CommandEmpty>No person found.</CommandEmpty>
            <CommandGroup>
              {contextU.userList.map((framework) => (
                <CommandItem
                  key={framework._id}
                  value={framework._id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
