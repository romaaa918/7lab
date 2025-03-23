// Модель продукта из API
export interface ApiProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// Наша внутренняя модель продукта
export interface Product {
  id: number
  name: string
  price: number
  dailyRentalPrice: number
  weeklyRentalPrice: number
  monthlyRentalPrice: number
  description: string
  category: string
  image: string
  rating: number
  reviewCount: number
  deposit?: number
  availableCount?: number
}

// Период аренды
export enum RentalPeriod {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

// Модель категории
export interface Category {
  id: number
  name: string
  image: string
}

// Состояние загрузки
export enum LoadingState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// Тип ошибки API
export interface ApiError {
  message: string
  code?: string
  status?: number
}

