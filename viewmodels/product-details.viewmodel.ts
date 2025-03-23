"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { type Product, LoadingState, type ApiError } from "@/models/product.model"
import { ProductService } from "@/services/product.service"
import { CacheService } from "@/services/cache.service"

export function useProductDetailsViewModel(productId: number) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE)
  const [error, setError] = useState<ApiError | null>(null)

  // Загрузка данных о продукте
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return

      try {
        setLoadingState(LoadingState.LOADING)

        // Проверяем кэш
        const cacheKey = `product_${productId}`
        const cachedProduct = CacheService.get<Product>(cacheKey)

        if (cachedProduct) {
          setProduct(cachedProduct)

          // Загружаем связанные продукты
          if (cachedProduct.category) {
            await fetchRelatedProducts(cachedProduct.category)
          }

          setLoadingState(LoadingState.SUCCESS)
          return
        }

        // Если кэша нет, делаем запрос
        const productData = await ProductService.getProductById(productId)
        setProduct(productData)

        // Кэшируем результат
        CacheService.set(cacheKey, productData)

        // Загружаем связанные продукты
        if (productData.category) {
          await fetchRelatedProducts(productData.category)
        }

        setLoadingState(LoadingState.SUCCESS)
      } catch (err) {
        console.error(`Error fetching product with ID ${productId}:`, err)
        setError({
          message: err instanceof Error ? err.message : "Ошибка при загрузке данных о товаре",
        })
        setLoadingState(LoadingState.ERROR)
      }
    }

    fetchProductDetails()
  }, [productId])

  // Загрузка связанных продуктов
  const fetchRelatedProducts = async (category: string) => {
    try {
      // Проверяем кэш
      const cacheKey = `related_products_${category}`
      const cachedProducts = CacheService.get<Product[]>(cacheKey)

      if (cachedProducts) {
        // Фильтруем, чтобы исключить текущий продукт
        const filtered = cachedProducts.filter((p) => p.id !== productId).slice(0, 4)
        setRelatedProducts(filtered)
        return
      }

      // Если кэша нет, делаем запрос
      const productsData = await ProductService.getProductsByCategory(category)

      // Кэшируем результат
      CacheService.set(cacheKey, productsData)

      // Фильтруем, чтобы исключить текущий продукт
      const filtered = productsData.filter((p) => p.id !== productId).slice(0, 4)
      setRelatedProducts(filtered)
    } catch (err) {
      console.error(`Error fetching related products for category ${category}:`, err)
      // Не устанавливаем ошибку, так как это не критичная функциональность
    }
  }

  // Навигация
  const navigateBack = () => {
    router.back()
  }

  const navigateToProductDetails = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  const navigateToCart = () => {
    router.push("/cart")
  }

  // Действия с товаром
  const addToCart = () => {
    if (!product) return

    // Здесь была бы логика добавления в корзину
    console.log(`Добавлен товар с ID ${product.id} в корзину`)
    // После добавления можно перейти в корзину
    // router.push('/cart');
  }

  const addToFavorites = () => {
    if (!product) return

    // Здесь была бы логика добавления в избранное
    console.log(`Добавлен товар с ID ${product.id} в избранное`)
  }

  // Обновление данных
  const refreshData = async () => {
    if (!productId) return

    setLoadingState(LoadingState.LOADING)
    // Очищаем кэш
    CacheService.clear(`product_${productId}`)

    try {
      const productData = await ProductService.getProductById(productId)
      setProduct(productData)

      // Загружаем связанные продукты
      if (productData.category) {
        await fetchRelatedProducts(productData.category)
      }

      setError(null)
      setLoadingState(LoadingState.SUCCESS)
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Ошибка при обновлении данных",
      })
      setLoadingState(LoadingState.ERROR)
    }
  }

  return {
    // Состояние
    product,
    relatedProducts,
    loading: loadingState === LoadingState.LOADING,
    error,

    // Методы
    navigateBack,
    navigateToProductDetails,
    navigateToCart,
    addToCart,
    addToFavorites,
    refreshData,
  }
}

