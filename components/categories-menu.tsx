"use client"

import Image from "next/image"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Category } from "@/models/product.model"

interface CategoriesMenuProps {
  categories: Category[]
  onSelectCategory: (categoryName: string | null) => void
  selectedCategory: string | null
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export default function CategoriesMenu({
  categories,
  onSelectCategory,
  selectedCategory,
  isOpen,
  onToggle,
  onClose,
}: CategoriesMenuProps) {
  const handleCategorySelect = (categoryName: string) => {
    onSelectCategory(categoryName)
    onClose()
  }

  const selectedCategoryName = selectedCategory || "Категории"

  return (
    <div className="relative">
      {/* Кнопка категорий */}
      <Button
        onClick={onToggle}
        className="bg-primary text-white py-2 px-4 w-full rounded-full flex items-center justify-center gap-2"
      >
        <span>{selectedCategoryName}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-20 max-h-[70vh] overflow-y-auto">
          <div className="p-2 flex justify-between items-center border-b">
            <h3 className="font-medium">Виды товаров</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X size={16} />
            </Button>
          </div>

          <div className="p-2">
            <div
              className="flex items-center gap-3 p-2 hover:bg-background rounded-md transition-colors cursor-pointer"
              onClick={() => {
                onSelectCategory(null)
                onClose()
              }}
            >
              <span className="text-sm">Все категории</span>
            </div>

            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-3 p-2 hover:bg-background rounded-md transition-colors cursor-pointer"
                onClick={() => handleCategorySelect(category.name)}
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="text-sm">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Затемнение фона при открытом меню */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-10" onClick={onClose} aria-hidden="true" />}
    </div>
  )
}

