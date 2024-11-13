"use client"

import * as React from "react"
import { Copy, Plus, Share2 } from "lucide-react"

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
import { joinGroup } from "@/services/groups/api"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Group } from "@/services/groups/types"

export function ShareGroupDialog(props: {currGroup: Group}) {
  const { currGroup } = props
  const [shareCodeValue, setShareCodeValue] = React.useState('')
  const router = useRouter()
  const onJoinGroup = async () => {
    const res = await joinGroup(shareCodeValue)
    if(!res.id) {
      toast.error(res.message)
      return
    }
    router.push(`/dashboard/${res.id}`)
    console.log('res: ', res)
  } 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Share or join a group</DialogTitle>
          <DialogDescription>
            Share your group using the code below or join a group using the associated code.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <span className="self-start">Invite people in &quot;{currGroup.name}&quot; by giving them this code:</span>
          <div className="flex gap-2 items-center">
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText(currGroup.shareToken)
              toast.success('Copied to clipboard')
            }}><Copy />{currGroup.shareToken}</Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="self-start">Join a group using the share code</span>
          <div className="flex gap-2 items-center">
            <Input placeholder="Share code" value={shareCodeValue} onChange={(ev) => setShareCodeValue(ev.target.value)}/>
            <DialogClose asChild>
              <Plus className="h-[1.2rem] w-[1.2rem]" onClick={() => {
                onJoinGroup()
                setShareCodeValue('')
              }}/>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
