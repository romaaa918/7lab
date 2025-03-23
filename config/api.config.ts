// API конфигурация
export const API_CONFIG = {
  BASE_URL: "https://fakestoreapi.com", // Используем FakeStore API для демонстрации
  ENDPOINTS: {
    PRODUCTS: "/products",
    CATEGORIES: "/products/categories",
    PRODUCT_BY_ID: (id: number) => `/products/${id}`,
    PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  },
  HEADERS: {
    "Content-Type": "application/json",
  },
}

