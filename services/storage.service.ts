// Сервис для работы с локальным хранилищем
export class StorageService {
  // Ключи для хранения данных
  private static KEYS = {
    USER: "invsp_user_data",
    THEME: "invsp_theme",
    CART: "invsp_cart",
    FAVORITES: "invsp_favorites",
    RENTAL_HISTORY: "invsp_rental_history",
  }

  // Проверка доступности localStorage
  private static isLocalStorageAvailable(): boolean {
    try {
      const testKey = "__test__"
      localStorage.setItem(testKey, testKey)
      localStorage.removeItem(testKey)
      return true
    } catch (e) {
      console.error("localStorage is not available:", e)
      return false
    }
  }

  // Сохранение данных
  static set<T>(key: string, data: T): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false
    }

    try {
      const serializedData = JSON.stringify(data)
      localStorage.setItem(key, serializedData)
      return true
    } catch (e) {
      console.error(`Error saving data for key ${key}:`, e)
      return false
    }
  }

  // Получение данных
  static get<T>(key: string): T | null {
    if (!this.isLocalStorageAvailable()) {
      return null
    }

    try {
      const serializedData = localStorage.getItem(key)
      if (serializedData === null) {
        return null
      }
      return JSON.parse(serializedData) as T
    } catch (e) {
      console.error(`Error retrieving data for key ${key}:`, e)
      return null
    }
  }

  // Удаление данных
  static remove(key: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false
    }

    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      console.error(`Error removing data for key ${key}:`, e)
      return false
    }
  }

  // Очистка всех данных
  static clear(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false
    }

    try {
      localStorage.clear()
      return true
    } catch (e) {
      console.error("Error clearing all data:", e)
      return false
    }
  }

  // Методы для работы с данными пользователя
  static saveUser(user: any): boolean {
    return this.set(this.KEYS.USER, user)
  }

  static getUser<T>(): T | null {
    return this.get<T>(this.KEYS.USER)
  }

  static removeUser(): boolean {
    return this.remove(this.KEYS.USER)
  }

  // Методы для работы с корзиной
  static saveCart(cart: any): boolean {
    return this.set(this.KEYS.CART, cart)
  }

  static getCart<T>(): T | null {
    return this.get<T>(this.KEYS.CART)
  }

  // Методы для работы с избранным
  static saveFavorites(favorites: any): boolean {
    return this.set(this.KEYS.FAVORITES, favorites)
  }

  static getFavorites<T>(): T | null {
    return this.get<T>(this.KEYS.FAVORITES)
  }

  // Методы для работы с историей аренды
  static saveRentalHistory(history: any): boolean {
    return this.set(this.KEYS.RENTAL_HISTORY, history)
  }

  static getRentalHistory<T>(): T | null {
    return this.get<T>(this.KEYS.RENTAL_HISTORY)
  }
}

