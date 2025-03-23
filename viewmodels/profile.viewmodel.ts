"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { type User, SaveState } from "@/models/user.model"
import { StorageService } from "@/services/storage.service"

// Начальные данные пользователя
const DEFAULT_USER: User = {
  id: "1",
  firstName: "",
  lastName: "",
  middleName: "",
  phone: "",
  address: "",
  avatar: "/placeholder.svg?height=120&width=120&text=Фото",
}

export function useProfileViewModel() {
  const router = useRouter()
  const [user, setUser] = useState<User>(DEFAULT_USER)
  const [saveState, setSaveState] = useState<SaveState>(SaveState.IDLE)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Загрузка данных пользователя при инициализации
  useEffect(() => {
    loadUserData()
  }, [])

  // Загрузка данных пользователя из локального хранилища
  const loadUserData = () => {
    const savedUser = StorageService.getUser<User>()
    if (savedUser) {
      setUser(savedUser)
    }
  }

  // Сохранение данных пользователя в локальное хранилище
  const saveUserData = async () => {
    // Проверка валидности данных
    if (!validateForm()) {
      return
    }

    setSaveState(SaveState.SAVING)

    try {
      // Имитация задержки сетевого запроса
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Сохранение данных в локальное хранилище
      const success = StorageService.saveUser(user)

      if (success) {
        setSaveState(SaveState.SUCCESS)
        setHasChanges(false)
        setIsEditing(false)

        // Сбрасываем статус успешного сохранения через 2 секунды
        setTimeout(() => {
          setSaveState(SaveState.IDLE)
        }, 2000)
      } else {
        setSaveState(SaveState.ERROR)
      }
    } catch (error) {
      console.error("Error saving user data:", error)
      setSaveState(SaveState.ERROR)
    }
  }

  // Валидация формы
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!user.firstName.trim()) {
      errors.firstName = "Имя обязательно для заполнения"
    }

    if (!user.lastName.trim()) {
      errors.lastName = "Фамилия обязательна для заполнения"
    }

    if (!user.phone.trim()) {
      errors.phone = "Телефон обязателен для заполнения"
    } else if (!/^\d{11}$/.test(user.phone.replace(/\D/g, ""))) {
      errors.phone = "Введите корректный номер телефона"
    }

    if (!user.address.trim()) {
      errors.address = "Адрес обязателен для заполнения"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Обновление полей пользователя
  const updateUserField = (field: keyof User, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  // Включение режима редактирования
  const enableEditing = () => {
    setIsEditing(true)
  }

  // Отмена редактирования
  const cancelEditing = () => {
    // Восстанавливаем данные из хранилища
    loadUserData()
    setIsEditing(false)
    setHasChanges(false)
    setFormErrors({})
  }

  // Очистка данных пользователя
  const clearUserData = () => {
    StorageService.removeUser()
    setUser(DEFAULT_USER)
  }

  // Навигация
  const navigateBack = () => {
    router.back()
  }

  const navigateToHome = () => {
    router.push("/")
  }

  return {
    // Состояние
    user,
    saveState,
    isEditing,
    hasChanges,
    formErrors,

    // Методы
    updateUserField,
    saveUserData,
    enableEditing,
    cancelEditing,
    clearUserData,
    navigateBack,
    navigateToHome,
  }
}

