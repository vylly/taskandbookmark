'use client'
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button } from "@/components/ui/button"
import { logout } from "@/services/auth/api"
import { useRouter } from "next/navigation"

export const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    logout()
    router.push('/login')
  }
  return (
    <div className="w-full flex justify-between bg-secondary p-4">
      <ThemeToggle />
      <div className="flex items-center justify-center">Dashboard</div>
      <div className="flex items-center justify-center">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}