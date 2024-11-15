import { Input } from "@/components/ui/input"
import { CategorySelectorMenu } from "../atoms/category-selector-menu"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateBookmarkData } from "@/services/bookmarks/types"
import { Category } from "@/services/categories/types"
import toast from "react-hot-toast"

export function NewBookmark({categories, onAddBookmark}: {categories: Category[], onAddBookmark: (bookmark: CreateBookmarkData) => void}) {
  const [newBookmarkContentValue, setNewBookmarkContentValue] = useState('')
  const [newBookmarkDescriptionValue, setNewBookmarkDescriptionValue] = useState('')
  const [newBookmarkTitleValue, setNewBookmarkTitleValue] = useState('')
  const [newBookmarkCategories, setNewBookmarkCategories] = useState<number[]>([])
  const [bookmarkType, setBookmarkType] = useState<'link' | 'note'>('link')

  const handleSelectCategory = (selected: number, isSelected: boolean) => {
    if(isSelected && !newBookmarkCategories.some(el => {return el === selected})){
      const newBMCat = [...newBookmarkCategories]
      newBMCat.push(selected)
      setNewBookmarkCategories(newBMCat)
    }
    if(!isSelected && newBookmarkCategories.some(el => {return el === selected})){
      const newBMCat = [...newBookmarkCategories]
      const filtered = newBMCat.filter(el => {return el !== selected})
      setNewBookmarkCategories(filtered)
    }
  }

  const handleAddBookmark = () => {
    if(newBookmarkCategories.length < 1 || !newBookmarkContentValue || !newBookmarkTitleValue){
      toast.error('Cannot have empty fields besides description (if relevant) or no category')
      return
    }
    onAddBookmark({
      type: bookmarkType,
      categories: newBookmarkCategories,
      title: newBookmarkTitleValue,
      content: newBookmarkContentValue,
      description: newBookmarkDescriptionValue
    })
    setNewBookmarkTitleValue('')
    setNewBookmarkContentValue('')
    setNewBookmarkDescriptionValue('')
    setNewBookmarkCategories([])
  }

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex w-full items-center justify-between">
        <CategorySelectorMenu selectedCategory={newBookmarkCategories} categories={categories} onSelect={handleSelectCategory}/>
        <div className="flex items-center space-x-2">
          <Label 
            style={{
              opacity: bookmarkType === 'link' ? '0.5' : '1'
            }} 
          >Note</Label>
          <Switch 
            checked={bookmarkType === 'link'}
            onCheckedChange={(checked) => {
              return checked ? setBookmarkType('link') : setBookmarkType('note')
            }}
          />
          <Label 
            style={{
              opacity: bookmarkType === 'note' ? '0.5' : '1'
            }} 
            htmlFor="airplane-mode"
          >Link</Label>
        </div>
      </div>

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
      <Input placeholder="Title" value={newBookmarkTitleValue} onChange={(ev) => setNewBookmarkTitleValue(ev.target.value)}/>
      {bookmarkType === 'link' ? (
        <>
          <Label>Link</Label>
          <Input placeholder="Link" value={newBookmarkContentValue} onChange={(ev) => setNewBookmarkContentValue(ev.target.value)} />
          <Label>Description</Label>
          <Textarea placeholder="Description (optional)" value={newBookmarkDescriptionValue} onChange={(ev) => setNewBookmarkDescriptionValue(ev.target.value)} />
        </>
      ): (
        <>
          <Label>Content</Label>
          <Textarea placeholder="Type your note here" value={newBookmarkContentValue} onChange={(ev) => setNewBookmarkContentValue(ev.target.value)} />
        </>
      )}
      <Button 
        className="w-full"
        variant='secondary'
        disabled={newBookmarkTitleValue.length < 3}
        onClick={handleAddBookmark}
      >
        Create
      </Button>
    </div>
  )
}