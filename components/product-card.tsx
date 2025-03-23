"use client"

import Image from "next/image"
import type { Product } from "@/models/product.model"
import { Star } from "lucide-react"
import { ProductService } from "@/services/product.service"

interface ProductCardProps {
  product: Product
  onClick: (productId: number) => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  // Форматирование цены
  const formattedDailyPrice = ProductService.formatRentalPrice(product.dailyRentalPrice)

  return (
    <div className="bg-white rounded-lg p-2 flex flex-col cursor-pointer h-full" onClick={() => onClick(product.id)}>
      <div className="relative pt-[100%] mb-2 bg-white rounded-lg overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain absolute top-0 left-0 p-2"
        />
      </div>
      <div className="flex items-center mb-1">
        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
        <span className="text-xs text-gray-500">
          {product.rating} ({product.reviewCount})
        </span>
      </div>
      <div className="text-xs font-bold line-clamp-2 h-8">{product.name}</div>
      <div className="text-xs text-gray-500 mb-1">{product.category}</div>
      <div className="text-xs text-gray-500">Доступно: {product.availableCount} шт.</div>
      <div className="font-bold mt-auto">{formattedDailyPrice}/день</div>
    </div>
  )
}

