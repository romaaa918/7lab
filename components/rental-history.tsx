"use client"

import { useState, useEffect } from "react"
import { StorageService } from "@/services/storage.service"
import { Calendar, Package } from "lucide-react"

interface RentalItem {
  id: string
  productName: string
  category: string
  startDate: string
  endDate: string
  price: number
  status: "active" | "completed" | "cancelled"
}

export default function RentalHistory() {
  const [rentalHistory, setRentalHistory] = useState<RentalItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Загрузка истории аренды из локального хранилища
    const loadRentalHistory = () => {
      const savedHistory = StorageService.getRentalHistory<RentalItem[]>()

      if (savedHistory && savedHistory.length > 0) {
        setRentalHistory(savedHistory)
      } else {
        // Если истории нет, создаем демо-данные
        const demoHistory: RentalItem[] = [
          {
            id: "1",
            productName: "Футбольный мяч",
            category: "Футбол",
            startDate: "2023-03-15",
            endDate: "2023-03-22",
            price: 500,
            status: "completed",
          },
          {
            id: "2",
            productName: "Велосипед",
            category: "Велоспорт",
            startDate: "2023-04-01",
            endDate: "2023-04-15",
            price: 3000,
            status: "active",
          },
        ]

        setRentalHistory(demoHistory)
        // Сохраняем демо-данные в хранилище
        StorageService.saveRentalHistory(demoHistory)
      }

      setLoading(false)
    }

    loadRentalHistory()
  }, [])

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU")
  }

  // Форматирование цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Получение цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500"
      case "completed":
        return "text-gray-500"
      case "cancelled":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  // Получение текста статуса
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активна"
      case "completed":
        return "Завершена"
      case "cancelled":
        return "Отменена"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">История аренды</h2>

      {rentalHistory.length === 0 ? (
        <div className="text-center p-4 text-gray-500">
          <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>У вас пока нет истории аренды</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rentalHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.productName}</h3>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <span className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>

              <div className="flex items-center mt-2 text-xs text-gray-600">
                <Calendar className="h-3 w-3 mr-1" />
                <span>
                  {formatDate(item.startDate)} - {formatDate(item.endDate)}
                </span>
              </div>

              <div className="mt-2 font-bold text-right">{formatPrice(item.price)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

