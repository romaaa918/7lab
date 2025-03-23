// Простой сервис для кэширования данных
export class CacheService {
  private static cache: Map<string, { data: any; timestamp: number }> = new Map()
  private static DEFAULT_TTL = 5 * 60 * 1000 // 5 минут в миллисекундах

  static set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    })
  }

  static get<T>(key: string): T | null {
    const cached = this.cache.get(key)

    if (!cached) {
      return null
    }

    // Проверяем, не истек ли срок действия кэша
    if (Date.now() > cached.timestamp) {
      this.cache.delete(key)
      return null
    }

    return cached.data as T
  }

  static clear(key?: string): void {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
    }
  }
}

