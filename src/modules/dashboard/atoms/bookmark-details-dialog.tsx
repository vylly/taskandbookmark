import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bookmark } from "@/services/bookmarks/types"
import { Category } from "@/services/categories/types"
import { SquareArrowOutUpRight, StickyNote } from "lucide-react"
import { DeleteDialog } from "@/modules/common/atoms/delete-dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import toast from "react-hot-toast"
import { CategorySelectorMenu } from "./category-selector-menu"
 
export const BookmarkDetailsDialog = (props: {bookmark: Bookmark, categories: Category[], handleDeleteBookmark:(bookmarkId: number) => void, handleUpdateBookmark:(updatedBm: Bookmark) => void}) => {
  const {bookmark, categories, handleDeleteBookmark, handleUpdateBookmark} = props
  const [newBookmarkContentValue, setNewBookmarkContentValue] = useState(bookmark.content)
  const [newBookmarkDescriptionValue, setNewBookmarkDescriptionValue] = useState(bookmark.description || '')
  const [newBookmarkTitleValue, setNewBookmarkTitleValue] = useState(bookmark.title)
  const [newBookmarkCategories, setNewBookmarkCategories] = useState<number[]>(bookmark.categories)
  const [isPristine, setIsPristine] = useState(true)
  const [isEditting, setIsEditting] = useState(false)

  const handleDelete = () => {
    handleDeleteBookmark(bookmark.id)
  }

  const handleSelectCategory = (selected: number, isSelected: boolean) => {
    if(isSelected && !newBookmarkCategories.some(el => {return el === selected})){
      const newBMCat = [...newBookmarkCategories]
      newBMCat.push(selected)
      setNewBookmarkCategories(newBMCat)
      setIsPristine(false)
      return
    }
    if(!isSelected && newBookmarkCategories.some(el => {return el === selected})){
      const newBMCat = [...newBookmarkCategories]
      const filtered = newBMCat.filter(el => {return el !== selected})
      setNewBookmarkCategories(filtered)
      setIsPristine(false)
      return
    }
  }

  const handleUpdate = () => {
    const updatedBm: Bookmark = {...bookmark}
    updatedBm.categories = newBookmarkCategories
    updatedBm.content = newBookmarkContentValue
    updatedBm.description = newBookmarkDescriptionValue
    updatedBm.title = newBookmarkTitleValue
    if(updatedBm.categories.length < 1 || !updatedBm.content || !updatedBm.title){
      toast.error('Cannot have empty fields besides description (if relevant) or no category')
      return
    }
    setIsEditting(false)
    handleUpdateBookmark(updatedBm)
  }

  const handleEditMode = () => {
    // we're cancelling
    if(isEditting) {
      setNewBookmarkContentValue(bookmark.content)
      setNewBookmarkDescriptionValue(bookmark.description || '')
      setNewBookmarkTitleValue(bookmark.title)
      setNewBookmarkCategories(bookmark.categories)
      setIsPristine(true)
    }
    setIsEditting(!isEditting)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><StickyNote/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {bookmark.title}
            <Button size="sm" variant="outline" onClick={handleEditMode}>{isEditting ? 'Cancel' : 'Edit'}</Button>
            </DialogTitle>
          <DialogDescription>
            View and edit your bookmark details
          </DialogDescription>
        </DialogHeader>
        {isEditting && <CategorySelectorMenu selectedCategory={newBookmarkCategories} categories={categories} onSelect={handleSelectCategory}/>}
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-wrap gap-4 w-full">
            {newBookmarkCategories.map((newCat) => {
              const foundCat = categories.find((cat) => cat.id === newCat)
              return (
                <div key={newCat} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{backgroundColor: foundCat?.color}}/>
                  <span>{foundCat?.name}</span>
                </div>
              )
            })}
          </div>
          <Label>Title</Label>
          <Input 
            placeholder="Title" 
            value={newBookmarkTitleValue} 
            onChange={(ev) => {
              if(!isEditting) return
              setIsPristine(false)
              setNewBookmarkTitleValue(ev.target.value)
            }}
          />
          {bookmark.type === 'link' ? (
            <>
              <Label>Link</Label>
              <div className="flex w-full gap-2">
                <Input placeholder="Link" value={newBookmarkContentValue}
                  onChange={(ev) => {
                    if(!isEditting) return
                    setIsPristine(false)
                    setNewBookmarkContentValue(ev.target.value)
                  }}
                />
                <Button variant="ghost" size="icon" onClick={() => {
                    window.open(newBookmarkContentValue, "_blank");
                  }}>
                  <SquareArrowOutUpRight className="h-[0.8rem] w-[0.8rem]" />
                </Button>
              </div>
              {newBookmarkDescriptionValue || isEditting && 
                <>
                  <Label>Description</Label>
                  <Textarea placeholder="Description (optional)" value={newBookmarkDescriptionValue}
                    onChange={(ev) => {
                      if(!isEditting) return
                      setIsPristine(false)
                      setNewBookmarkDescriptionValue(ev.target.value)
                    }}
                  />
                </>
              }
            </>
          ): (
            <>
              <Label>Content</Label>
              <Textarea placeholder="Type your note here" value={newBookmarkDescriptionValue} 
                onChange={(ev) => {
                  if(!isEditting) return
                  setIsPristine(false)
                  setNewBookmarkContentValue(ev.target.value)
                }}
              />
            </>
          )}
        </div>
        <DialogFooter>
          <div className="flex w-full items-center justify-between">
            <DeleteDialog buttonTitle="Delete" deleteDescription="Are you sure you want to remove this bookmark from your group ?"  deleteAction={handleDelete}/>
            {isEditting &&
              <DialogClose asChild>
                <Button disabled={isPristine} onClick={handleUpdate}>Save changes</Button>
              </DialogClose>
            }
            
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}