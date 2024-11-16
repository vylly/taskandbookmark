"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Category } from "@/services/categories/types"

export function CategorySelectorMenu({selectedCategory, categories, onSelect}: {selectedCategory: number[], categories: Category[], onSelect: (selected: number, isSelected: boolean) => void}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default" disabled={!categories.length}>
          {!categories.length ? 'Create some categories first' : 'Select one or multiple categories'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="overflow-y-scroll max-h-64 no-scrollbar">
        {categories.map((category, idx) => {
          return (
            <DropdownMenuCheckboxItem
              key={idx}
              checked={selectedCategory.some(element => element === category.id)}
              onSelect={(e) => {e.preventDefault()}}
              onCheckedChange={(checked) => {
                onSelect(category.id, checked)
              }}
            >
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: category.color}}/>
                <span>{category.name}</span>
              </div>
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
