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
        <Button variant="outline" size="default">
          Select one or multiple categories
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
              {category.name}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
