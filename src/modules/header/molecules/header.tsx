import { ThemeToggle } from "@/components/theme/theme-toggle"

export const Header = () => {

  return (
    <div className="w-full flex justify-between bg-secondary p-4">
      <ThemeToggle />
      <div className="flex items-center justify-center">Dashboard</div>
      <div className="flex items-center justify-center">Profile</div>
    </div>
  )
}