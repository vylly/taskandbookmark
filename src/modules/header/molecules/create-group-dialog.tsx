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
import { Input } from "@/components/ui/input"
import { createGroup } from "@/services/groups/api"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function CreateGroupDialog() {
  const [newGroupValue, setNewGroupValue] = React.useState('')
  const router = useRouter()
  const onCreateNewGroup = async () => {
    const res = await createGroup(newGroupValue)
    if(!res.id) {
      toast.error('failed to create a group')
    }
    router.push(`/dashboard/${res.id}`)
  } 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Create a new group</DialogTitle>
          <DialogDescription>
            Create a new group to share and add content to.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <span className="self-start">New groupe name</span>
          <div className="flex gap-2 items-center">
            <Input placeholder="Group name" value={newGroupValue} onChange={(ev) => setNewGroupValue(ev.target.value)}/>
            <DialogClose asChild>
              <Plus className="h-[1.2rem] w-[1.2rem]" onClick={() => {
                onCreateNewGroup()
                setNewGroupValue('')
              }}/>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
