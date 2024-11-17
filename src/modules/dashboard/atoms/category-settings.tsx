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
import { Category } from "@/services/categories/types"
import { Settings } from "lucide-react"
import { DeleteDialog } from "@/modules/common/atoms/delete-dialog"
import { useState } from "react"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { HexColorPicker } from "react-colorful"
import { Badge } from "@/components/ui/badge"
 
export const CategorySettingsDialog = (props: {categories: Category[], handleDeleteCategory:(bookmarkId: number) => void, handleUpdateCategory:(updatedBm: Category) => void}) => {
  const {categories, handleDeleteCategory, handleUpdateCategory} = props
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [newCategoryName, setNewCategoryName] = useState(categories[0].name)
  const [newCategoryColor, setNewCategoryColor] = useState(categories[0].color)
  const [isPristine, setIsPristine] = useState(true)
  const [isEditting, setIsEditting] = useState(false)

  const handleDelete = () => {
    handleDeleteCategory(selectedCategory.id)
  }

  const handleUpdate = () => {
    const updatedCat: Category = {
      id: selectedCategory.id,
      color: newCategoryColor,
      name: newCategoryName,
    }
    if(!newCategoryName || !newCategoryColor){
      toast.error('Cannot have empty fields')
      return
    }
    setIsEditting(false)
    handleUpdateCategory(updatedCat)
  }

  const handleEditMode = () => {
    // we're cancelling
    if(isEditting) {
      setIsPristine(true)
    }
    setIsEditting(!isEditting)
  }

  const onChangeCategory = (value: string) => {
    const catId = value.split('_')[0]
    const cat = categories.find((cat) => {
      return cat.id.toString() === catId
    })
    if(!cat) return
    setSelectedCategory(cat)
    setNewCategoryColor(cat.color)
    setNewCategoryName(cat.name)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><Settings/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 rounded-full" style={{backgroundColor: selectedCategory.color}}/>
              <span style={{color: selectedCategory.color}}>{selectedCategory.name}</span>
            </div>
            <Button size="sm" variant="outline" onClick={handleEditMode}>{isEditting ? 'Cancel' : 'Edit'}</Button>
            </DialogTitle>
          <DialogDescription>
            View and edit your categories details
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={onChangeCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder='Select category'/> 
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => {
              return (
                <SelectItem key={cat.id} value={cat.id + '_' + cat.name}>
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 rounded-full" style={{backgroundColor: cat.color}}/>
                    <span style={{color: cat.color}}>{cat.name}</span>
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        {isEditting &&
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex flex-col gap-2 items-start">
              <Label>Category name</Label>
              <Input placeholder="Category name (min 3 characters)" value={newCategoryName} onChange={(ev) => 
                {
                  setIsPristine(false)
                  setNewCategoryName(ev.target.value)
                }
                
              }/>
            </div>
            <div className="flex gap-4 flex-col items-start w-full">
              <Label>Category color</Label>
              <div className="flex w-full items-center justify-between">
                <HexColorPicker color={newCategoryColor} onChange={(value) => {
                  setIsPristine(false)
                  setNewCategoryColor(value)
                }} />
                <div className="flex flex-1 flex-col items-center justify-center gap-4">
                  <span>Preview</span>
                  <Badge style={{
                    backgroundColor: newCategoryColor
                  }}>{newCategoryName || 'New Category'}</Badge>
                </div>
              </div>
            </div>
          </div>
        }
        
        <DialogFooter>
          <div className="flex w-full items-center justify-between">
            <DeleteDialog buttonTitle="Delete" deleteDescription="Are you sure you want to remove this category from your group ?"  deleteAction={handleDelete}/>
            <DialogClose asChild>
              {isEditting ? <Button disabled={isPristine} onClick={handleUpdate}>Save changes</Button> : <Button>Close</Button>}
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}