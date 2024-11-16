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
import { ui } from "@/store"

export const CategoryFilterMenu = ({categories, filteredCategories, onSelectNewFilter}: {categories: Category[], filteredCategories: {[categoryName: string]: boolean}, onSelectNewFilter: (cateroyId: number) => void}) => {
  const showLinks = ui.$showLinks.hook()
  const showNotes = ui.$showNotes.hook()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="overflow-y-scroll max-h-64 no-scrollbar">
        <DropdownMenuItem className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span>Show links</span>
          </div>
          
          <Switch
            checked={showLinks}
            onClick={(ev) => {ev.stopPropagation()}}
            onCheckedChange={() => {
              ui.$showLinks.next(!showLinks)
            }}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span>Show notes</span>
          </div>
          
          <Switch
            checked={showNotes}
            onClick={(ev) => {ev.stopPropagation()}}
            onCheckedChange={() => {
              ui.$showNotes.next(!showNotes)
            }}
          />
        </DropdownMenuItem>
        {categories.map((category, idx) => {
          return (
            <DropdownMenuItem key={idx} className="flex justify-between">
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: category.color}}/>
                <span>{category.name}</span>
              </div>
              
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
