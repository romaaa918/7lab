// Сервис для работы с изображениями
export class ImageService {
  // Базовые цвета для категорий
  private static categoryColors: Record<string, string> = {
    Футбол: "4CAF50", // Зеленый
    Баскетбол: "FF9800", // Оранжевый
    Хоккей: "2196F3", // Синий
    Теннис: "FFEB3B", // Желтый
    Плавание: "03A9F4", // Голубой
    Бег: "F44336", // Красный
    Велоспорт: "9C27B0", // Фиолетовый
    Фитнес: "607D8B", // Серо-синий
  }

  // Получение цвета для категории
  static getCategoryColor(category: string): string {
    return this.categoryColors[category] || "9E9E9E" // Серый по умолчанию
  }

  // Генерация URL для изображения категории
  static getCategoryImageUrl(category: string): string {
    const color = this.getCategoryColor(category)
    return `/placeholder.svg?height=120&width=120&text=${encodeURIComponent(category)}&bg=${color}`
  }

  // Генерация URL для изображения продукта
  static getProductImageUrl(productName: string, category: string): string {
    const color = this.getCategoryColor(category)
    return `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(productName)}&bg=${color}`
  }
}

