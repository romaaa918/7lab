"use client"

import Image from "next/image"
import { Search, User, MenuIcon, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  showBackButton?: boolean
  showMenu?: boolean
  title?: string
  onMenuClick?: () => void
  onBackClick?: () => void
  onProfileClick?: () => void
  onSearchClick?: () => void
}

export default function AppHeader({
  showBackButton = false,
  showMenu = false,
  title,
  onMenuClick,
  onBackClick,
  onProfileClick,
  onSearchClick,
}: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between p-2 bg-background">
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Button variant="ghost" size="sm" className="flex items-center text-sm font-medium p-1" onClick={onBackClick}>
            <ArrowLeft size={18} className="mr-1" />
            Назад
          </Button>
        )}

        {showMenu && (
          <Button variant="ghost" size="icon" className="p-1" onClick={onMenuClick}>
            <MenuIcon size={20} className="text-primary" />
          </Button>
        )}

        {title && !showMenu && !showBackButton && <div className="text-sm font-medium">{title}</div>}
      </div>

      <div className="flex items-center">
        <div className="flex items-center">
          <Image
            src="/placeholder.svg?height=24&width=24"
            alt="InvSp Logo"
            width={24}
            height={24}
            className="rounded-full border-2 border-primary"
          />
          <span className="ml-1 font-semibold">InvSp</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 hover:bg-secondary/50 rounded-full"
          onClick={onSearchClick}
        >
          <Search size={18} />
          <span className="sr-only">Поиск</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 hover:bg-secondary/50 rounded-full"
          onClick={onProfileClick}
        >
          <User size={18} />
          <span className="sr-only">Профиль пользователя</span>
        </Button>
      </div>
    </header>
  )
}

