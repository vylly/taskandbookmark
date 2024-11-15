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
import { Category } from "@/services/categories/types"

export function CategoryFilterMenu({categories, filteredCategories, onSelectNewFilter}: {categories: Category[], filteredCategories: {[categoryName: string]: boolean}, onSelectNewFilter: (cateroyId: number) => void}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="overflow-y-scroll max-h-64 no-scrollbar">
        {categories.map((category, idx) => {
          return (
            <DropdownMenuItem key={idx} className="flex justify-between">
              <span>{category.name}</span>
              <Switch
                checked={filteredCategories[category.id]}
                onClick={(ev) => {ev.stopPropagation()}}
                onCheckedChange={() => {
                  onSelectNewFilter(category.id)
                }}
              />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
