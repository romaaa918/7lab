"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { type Product, type Category, LoadingState, type ApiError, RentalPeriod } from "@/models/product.model"
import { ProductService } from "@/services/product.service"
import { CacheService } from "@/services/cache.service"

export function useHomeViewModel() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE)
  const [error, setError] = useState<ApiError | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean>(false)
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState<RentalPeriod>(RentalPeriod.DAILY)

  // Загрузка категорий
  const fetchCategories = useCallback(async () => {
    try {
      // Проверяем кэш
      const cachedCategories = CacheService.get<Category[]>("categories")
      if (cachedCategories) {
        setCategories(cachedCategories)
        return
      }

      setLoadingState(LoadingState.LOADING)
      const categoriesData = await ProductService.getCategories()
      setCategories(categoriesData)

      // Кэшируем результат
      CacheService.set("categories", categoriesData)
    } catch (err) {
      console.error("Error fetching categories:", err)
      setError({
        message: err instanceof Error ? err.message : "Ошибка при загрузке категорий",
      })
    }
  }, [])

  // Загрузка продуктов
  const fetchProducts = useCallback(async (category?: string) => {
    try {
      setLoadingState(LoadingState.LOADING)

      // Формируем ключ кэша
      const cacheKey = category ? `products_${category}` : "products_all"

      // Проверяем кэш
      const cachedProducts = CacheService.get<Product[]>(cacheKey)
      if (cachedProducts) {
        setProducts(cachedProducts)
        setLoadingState(LoadingState.SUCCESS)
        return
      }

      // Если кэша нет, делаем запрос
      let productsData: Product[]

      if (category) {
        productsData = await ProductService.getProductsByCategory(category)
      } else {
        productsData = await ProductService.getProducts()
      }

      setProducts(productsData)
      setLoadingState(LoadingState.SUCCESS)

      // Кэшируем результат
      CacheService.set(cacheKey, productsData)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError({
        message: err instanceof Error ? err.message : "Ошибка при загрузке продуктов",
      })
      setLoadingState(LoadingState.ERROR)
    }
  }, [])

  // Загрузка данных при инициализации
  useEffect(() => {
    const initData = async () => {
      await fetchCategories()
      await fetchProducts()
    }

    initData()
  }, [fetchCategories, fetchProducts])

  // Загрузка продуктов при изменении категории
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory)
    } else {
      fetchProducts()
    }
  }, [selectedCategory, fetchProducts])

  // Методы для взаимодействия с UI

  // Управление категориями
  const selectCategory = (categoryName: string | null) => {
    setSelectedCategory(categoryName)
  }

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen)
  }

  const closeCategoryMenu = () => {
    setIsCategoryMenuOpen(false)
  }

  // Управление периодом аренды
  const selectRentalPeriod = (period: RentalPeriod) => {
    setSelectedRentalPeriod(period)
  }

  // Навигация
  const navigateToProductDetails = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  const navigateToProfile = () => {
    router.push("/profile")
  }

  const navigateToCart = () => {
    router.push("/cart")
  }

  const navigateToCategories = () => {
    router.push("/categories")
  }

  // Управление боковым меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Действия с товарами
  const rentProduct = (productId: number, period: RentalPeriod) => {
    // Здесь была бы логика добавления в корзину аренды
    console.log(`Добавлен товар с ID ${productId} в корзину аренды на период ${period}`)
    // После добавления можно перейти в корзину
    // router.push('/cart');
  }

  const addToFavorites = (productId: number) => {
    // Здесь была бы логика добавления в избранное
    console.log(`Добавлен товар с ID ${productId} в избранное`)
  }

  // Обновление данных
  const refreshData = async () => {
    setLoadingState(LoadingState.LOADING)
    // Очищаем кэш
    CacheService.clear()

    try {
      await fetchCategories()
      await fetchProducts(selectedCategory || undefined)
      setError(null)
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Ошибка при обновлении данных",
      })
      setLoadingState(LoadingState.ERROR)
    }
  }

  return {
    // Состояние
    products,
    categories,
    loading: loadingState === LoadingState.LOADING,
    error,
    selectedCategory,
    isMenuOpen,
    isCategoryMenuOpen,
    selectedRentalPeriod,

    // Методы
    selectCategory,
    toggleCategoryMenu,
    closeCategoryMenu,
    selectRentalPeriod,
    navigateToProductDetails,
    navigateToProfile,
    navigateToCart,
    navigateToCategories,
    toggleMenu,
    closeMenu,
    rentProduct,
    addToFavorites,
    refreshData,
  }
}

