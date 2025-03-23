"use client"

import { useProductDetailsViewModel } from "@/viewmodels/product-details.viewmodel"
import AppHeader from "@/components/app-header"
import ProductCard from "@/components/product-card"
import LoadingErrorState from "@/components/loading-error-state"
import { Button } from "@/components/ui/button"
import { RefreshCw, Star, Calendar, Heart } from "lucide-react"
import Image from "next/image"
import { ProductService } from "@/services/product.service"
import { useState } from "react"
import { RentalPeriod } from "@/models/product.model"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = Number.parseInt(params.id)
  const [selectedPeriod, setSelectedPeriod] = useState<RentalPeriod>(RentalPeriod.DAILY)

  const {
    // Состояние
    product,
    relatedProducts,
    loading,
    error,

    // Методы
    navigateBack,
    navigateToProductDetails,
    navigateToCart,
    addToCart,
    addToFavorites,
    refreshData,
  } = useProductDetailsViewModel(productId)

  // Получение цены в зависимости от выбранного периода
  const getRentalPrice = () => {
    if (!product) return ""

    switch (selectedPeriod) {
      case RentalPeriod.DAILY:
        return ProductService.formatRentalPrice(product.dailyRentalPrice)
      case RentalPeriod.WEEKLY:
        return ProductService.formatRentalPrice(product.weeklyRentalPrice)
      case RentalPeriod.MONTHLY:
        return ProductService.formatRentalPrice(product.monthlyRentalPrice)
      default:
        return ProductService.formatRentalPrice(product.dailyRentalPrice)
    }
  }

  // Получение текста периода
  const getPeriodText = () => {
    switch (selectedPeriod) {
      case RentalPeriod.DAILY:
        return "день"
      case RentalPeriod.WEEKLY:
        return "неделю"
      case RentalPeriod.MONTHLY:
        return "месяц"
      default:
        return "день"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10">
        <div className="text-xs text-center py-1">9:30</div>
        <AppHeader showBackButton={true} onBackClick={navigateBack} />
      </div>

      <main className="flex-1 p-4">
        {/* Кнопка обновления данных */}
        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-xs"
            onClick={refreshData}
            disabled={loading}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Обновить
          </Button>
        </div>

        {/* Состояние загрузки и ошибки */}
        <LoadingErrorState loading={loading} error={error} onRetry={refreshData} />

        {/* Детали продукта */}
        {!loading && !error && product && (
          <>
            <div className="bg-white rounded-lg overflow-hidden mb-4">
              <div className="relative pt-[100%]">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>

            <div className="mb-4">
              <h1 className="text-xl font-bold mb-1">{product.name}</h1>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} отзывов)
                </span>
              </div>
              <div className="text-sm mb-4">{product.description}</div>
              <div className="text-sm text-gray-500 mb-1">Категория: {product.category}</div>
              <div className="text-sm text-gray-500 mb-2">Доступно для аренды: {product.availableCount} шт.</div>

              {product.deposit > 0 && (
                <div className="text-sm text-amber-600 mb-2">
                  Требуется залог: {ProductService.formatRentalPrice(product.deposit)}
                </div>
              )}
            </div>

            {/* Выбор периода аренды */}
            <div className="bg-white rounded-lg p-3 mb-4">
              <div className="text-sm font-medium mb-2">Выберите период аренды:</div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={selectedPeriod === RentalPeriod.DAILY ? "default" : "outline"}
                  className="text-xs"
                  onClick={() => setSelectedPeriod(RentalPeriod.DAILY)}
                >
                  День
                </Button>
                <Button
                  variant={selectedPeriod === RentalPeriod.WEEKLY ? "default" : "outline"}
                  className="text-xs"
                  onClick={() => setSelectedPeriod(RentalPeriod.WEEKLY)}
                >
                  Неделя
                </Button>
                <Button
                  variant={selectedPeriod === RentalPeriod.MONTHLY ? "default" : "outline"}
                  className="text-xs"
                  onClick={() => setSelectedPeriod(RentalPeriod.MONTHLY)}
                >
                  Месяц
                </Button>
              </div>
              <div className="font-bold text-xl mt-3 text-center">
                {getRentalPrice()}/{getPeriodText()}
              </div>
            </div>

            <div className="flex gap-2 mb-8">
              <Button
                className="flex-1 bg-primary text-white rounded-full py-2 flex items-center justify-center"
                onClick={addToCart}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Арендовать
              </Button>

              <Button variant="outline" className="rounded-full" onClick={addToFavorites}>
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            {relatedProducts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-4">Похожие товары</h2>

                <div className="grid grid-cols-2 gap-4">
                  {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={navigateToProductDetails} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-auto border-t border-border">
        <div className="flex justify-around py-2">
          <div className="flex flex-col items-center">
            <div className="h-1 w-8 bg-primary rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

