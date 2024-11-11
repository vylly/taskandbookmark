"use client"

import * as React from "react"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

export function CategoryFilterMenu({categories, onSelectNewFilter}: {categories: {[categoryName: string]: boolean}, onSelectNewFilter: (newCategories: {[categoryName: string]: boolean}) => void}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.keys(categories).map((category, idx) => {
          return (
            <DropdownMenuItem key={idx} className="flex justify-between">
              <span>{category}</span>
              <Switch
                checked={categories[category]}
                onClick={(ev) => {ev.stopPropagation()}}
                onCheckedChange={() => {
                  const newCategories = {...categories}
                  newCategories[category] = !newCategories[category]
                  onSelectNewFilter(newCategories)
                }}
              />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
