"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookmarkData } from "../view/dashboard"
import { Input } from "@/components/ui/input"
import { CategorySelectorMenu } from "./category-selector-menu"

export function AddCategoryOrBookmarkMenu({categories, onAddCategory, onAddBookmark}: {categories: {[categoryName: string]: boolean}, onAddCategory: (name: string) => void, onAddBookmark: (bookmark: BookmarkData) => void}) {
  const [newCategoryValue, setNewCategoryValue] = React.useState('')
  const [newBookmarkLinkValue, setNewBookmarkLinkValue] = React.useState('')
  const [newBookmarkNameValue, setNewBookmarkNameValue] = React.useState('')
  const [newBookmarkCategory, setNewBookmarkCategory] = React.useState('all')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Bookmark / bookrmak category</DialogTitle>
          <DialogDescription>
            Add bookmark or bookmark category
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <span className="self-start">New bookmark category</span>
          <div className="flex gap-2 items-center">
            <Input placeholder="Category name" value={newCategoryValue} onChange={(ev) => setNewCategoryValue(ev.target.value)}/>
            <DialogClose asChild>
              <Plus className="h-[1.2rem] w-[1.2rem]" onClick={() => {
                onAddCategory(newCategoryValue)
                setNewCategoryValue('')
              }}/>
            </DialogClose>
          </div>
          
        </div>
        <div onFocus={(ev) => ev.stopPropagation()} className="flex flex-col gap-2 items-start">
          <span className="self-start">New bookmark</span>
          <CategorySelectorMenu selectedCategory={newBookmarkCategory} categories={categories} onSelect={(category) => setNewBookmarkCategory(category)}/>
          <div className="flex w-full gap-2 items-center">
            <Input placeholder="Name" onClick={(ev) => {ev.stopPropagation()}} value={newBookmarkNameValue} onChange={(ev) => setNewBookmarkNameValue(ev.target.value)}/>
            <Plus className="invisible h-[1.2rem] w-[1.2rem]"/>
          </div>
          
          <div className="flex w-full gap-2 items-center">
            <Input onFocusCapture={(ev) => ev.stopPropagation()} placeholder="Link" onClick={(ev) => {ev.stopPropagation()}} value={newBookmarkLinkValue} onChange={(ev) => setNewBookmarkLinkValue(ev.target.value)}/>
            <DialogClose asChild>
              <Plus className="h-[1.2rem] w-[1.2rem]" onClick={() => {
                onAddBookmark({
                  id: crypto.randomUUID(),
                  type: 'bookmark',
                  category: newBookmarkCategory,
                  private: true,
                  title: newBookmarkNameValue,
                  content: newBookmarkLinkValue
                })
                setNewBookmarkNameValue('')
                setNewBookmarkLinkValue('')
                setNewBookmarkCategory('all')
              }}/>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
