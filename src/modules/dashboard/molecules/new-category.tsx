"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import toast from "react-hot-toast"

export function NewCategory ({onAddCategory}: {onAddCategory: (name: string, color: string) => void}) {
  const [color, setColor] = useState("#aabbcc");
  const [newCategoryValue, setNewCategoryValue] = useState('')
  const handleAddCategory = () => {
    if(!newCategoryValue) {
      toast.error('Cannot have empty category name')
    }
    onAddCategory(newCategoryValue, color)
    setNewCategoryValue('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-start">
        <Label>Category name</Label>
        <Input placeholder="Category name (min 3 characters)" value={newCategoryValue} onChange={(ev) => setNewCategoryValue(ev.target.value)}/>
      </div>
      <div className="flex gap-4 flex-col items-start">
        <Label>Category color</Label>
        <div className="flex w-full items-center justify-between">
          <HexColorPicker color={color} onChange={setColor} />
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <span>Preview</span>
            <Badge style={{
              backgroundColor: color
            }}>{newCategoryValue || 'New Category'}</Badge>
          </div>
        </div>
      </div>
      <Button 
        className="w-full"
        variant='secondary'
        disabled={newCategoryValue.length < 3}
        onClick={handleAddCategory}
      >
        Create
      </Button>
    </div>
  )
}