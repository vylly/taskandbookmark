'use client'
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button } from "@/components/ui/button"
import { logout } from "@/services/auth/api"
import { Group } from "@/services/groups/types"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CreateGroupDialog } from "./create-group-dialog"
import { ShareGroupDialog } from "./share-group-dialog"

export const Header = (props: {currGroup: Group, allGroup: Group[]}) => {
  const {currGroup, allGroup} = props
  const router = useRouter();
  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const onChangeDashboard = (value: string) => {
    console.log('value: ', value)
    router.push(`/dashboard/${value.split('_')[0]}`)
  }

  return (
    <div className="w-full flex justify-between bg-tertiary p-8">
      <ThemeToggle />
      <div className="flex items-center justify-center gap-2">
        <Select onValueChange={onChangeDashboard}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={currGroup.name} />
          </SelectTrigger>
          <SelectContent>
            {allGroup.map((group) => {
              return (
                <SelectItem key={group.id} value={group.id + '_' + group.name}>{group.name}</SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <CreateGroupDialog />
        <ShareGroupDialog currGroup={currGroup}/>
      </div>
      <div className="flex items-center justify-center">
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}