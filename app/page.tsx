"use client"

import { useHomeViewModel } from "@/viewmodels/home.viewmodel"
import AppHeader from "@/components/app-header"
import CategoriesMenu from "@/components/categories-menu"
import ProductCard from "@/components/product-card"
import SideMenu from "@/components/side-menu"
import LoadingErrorState from "@/components/loading-error-state"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const {
    // Состояние
    products,
    categories,
    loading,
    error,
    selectedCategory,
    isCategoryMenuOpen,
    isMenuOpen,

    // Методы
    selectCategory,
    toggleCategoryMenu,
    closeCategoryMenu,
    navigateToProductDetails,
    navigateToProfile,
    navigateToCart,
    navigateToCategories,
    toggleMenu,
    closeMenu,
    refreshData,
  } = useHomeViewModel()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10">
        <div className="text-xs text-center py-1">9:30</div>
        <AppHeader title="Категории" showMenu={true} onMenuClick={toggleMenu} onProfileClick={navigateToProfile} />
        <div className="px-4 py-2">
          <CategoriesMenu
            categories={categories}
            onSelectCategory={selectCategory}
            selectedCategory={selectedCategory}
            isOpen={isCategoryMenuOpen}
            onToggle={toggleCategoryMenu}
            onClose={closeCategoryMenu}
          />
        </div>
      </div>

      <main className="flex-1 p-2">
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

        {/* Список продуктов */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center p-4 text-gray-500">Товары не найдены</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} onClick={navigateToProductDetails} />
                ))}
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

      <SideMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onNavigateHome={() => navigateToProductDetails(0)} // Переход на главную
        onNavigateProfile={navigateToProfile}
        onNavigateCart={navigateToCart}
        onNavigateCategories={navigateToCategories}
      />
    </div>
  )
}

