import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bookmark } from "@/services/bookmarks/types"
import { Category } from "@/services/categories/types"
import { Settings, StickyNote } from "lucide-react"
import { CategorySelectorMenu } from "./category-selector-menu"
 
export const BookmarkDetailsDialog = (props: {bookmark: Bookmark, categories: Category[]}) => {
  const {bookmark, categories} = props
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><StickyNote/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{bookmark.title}</DialogTitle>
          <DialogDescription>
            View and edit your bookmark details
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-wrap gap-4 w-full">
            {bookmark.categories.map((newCat) => {
              const foundCat = categories.find((cat) => cat.id === newCat)
              return (
                <div key={newCat} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{backgroundColor: foundCat?.color}}/>
                  <span>{foundCat?.name}</span>
                </div>
              )
            })}
          </div>
          
          <Input placeholder="Title" value={bookmark.title}/>
          {bookmark.type === 'link' ? (
            <>
              <Input placeholder="Link" value={bookmark.content}/>
              {bookmark.description && (
                <Textarea placeholder="Description (optional)" value={bookmark.description}/>
              )}
            </>
          ): (
            <Textarea placeholder="Type your note here" value={bookmark.content}/>
          )}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}