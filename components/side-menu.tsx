"use client"

import { Home, ShoppingCart, User, LogOut, MenuIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigateHome: () => void
  onNavigateProfile: () => void
  onNavigateCart: () => void
  onNavigateCategories: () => void
}

export default function SideMenu({
  isOpen,
  onClose,
  onNavigateHome,
  onNavigateProfile,
  onNavigateCart,
  onNavigateCategories,
}: SideMenuProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-30" onClick={onClose} />

      <div className="fixed top-0 left-0 bottom-0 w-64 bg-white z-40 shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="p-4 flex justify-between items-center border-b">
          <div className="font-bold text-lg">Меню</div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start py-2 px-4 mb-1"
            onClick={() => {
              onNavigateHome()
              onClose()
            }}
          >
            <Home size={18} className="mr-2" />
            Главная
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start py-2 px-4 mb-1"
            onClick={() => {
              onNavigateCategories()
              onClose()
            }}
          >
            <MenuIcon size={18} className="mr-2" />
            Категории
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start py-2 px-4 mb-1"
            onClick={() => {
              onNavigateCart()
              onClose()
            }}
          >
            <ShoppingCart size={18} className="mr-2" />
            Корзина
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start py-2 px-4 mb-1"
            onClick={() => {
              onNavigateProfile()
              onClose()
            }}
          >
            <User size={18} className="mr-2" />
            Профиль
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button variant="ghost" className="w-full justify-start py-2 px-4 text-red-500">
            <LogOut size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </div>
    </>
  )
}

