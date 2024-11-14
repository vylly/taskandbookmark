"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import { NewCategory } from "./new-category"
import { NewBookmark } from "./new-bookmark"
import { CreateBookmarkData } from "@/services/bookmarks/types"
import { Category } from "@/services/categories/types"

export function AddCategoryOrBookmarkMenu({categories, onAddCategory, onAddBookmark}: {categories: Category[], onAddCategory: (name: string, color: string) => void, onAddBookmark: (bookmark: CreateBookmarkData) => void}) { 
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Bookmark / Category</DialogTitle>
          <DialogDescription>
            Create a new bookmark or a new category for the current group
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="bookmark">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookmark">bookmark</TabsTrigger>
            <TabsTrigger value="category">category</TabsTrigger>
          </TabsList>
          <TabsContent value="bookmark" className="pt-4">
            <NewBookmark categories={categories} onAddBookmark={onAddBookmark}/>
          </TabsContent>
          <TabsContent value="category" className="pt-4">
            <NewCategory onAddCategory={onAddCategory}/>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
