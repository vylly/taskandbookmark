"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CategorySelectorMenu({selectedCategory, categories, onSelect}: {selectedCategory: string, categories: {[categoryName: string]: boolean}, onSelect: (selected: string) => void}) {
  const [isPristine, setIsPristine] = React.useState(true)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default">
          {isPristine ? 'Category' : selectedCategory}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {Object.keys(categories).map((category, idx) => {
          return (
            <DropdownMenuItem key={idx} className="felx justify-between" onClick={(ev) => {
              ev.stopPropagation()
              setIsPristine(false)
              onSelect(category)
              }}>
              <span>{category}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
