"use client"

import { useProfileViewModel } from "@/viewmodels/profile.viewmodel"
import Image from "next/image"
import { Settings, Save, X, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SaveState } from "@/models/user.model"
import RentalHistory from "@/components/rental-history"

export default function ProfilePage() {
  const {
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
    navigateBack,
  } = useProfileViewModel()

  // Отображение статуса сохранения
  const renderSaveStatus = () => {
    switch (saveState) {
      case SaveState.SAVING:
        return (
          <div className="flex items-center justify-center text-primary">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span>Сохранение...</span>
          </div>
        )
      case SaveState.SUCCESS:
        return (
          <div className="flex items-center justify-center text-green-500">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Сохранено успешно</span>
          </div>
        )
      case SaveState.ERROR:
        return (
          <div className="flex items-center justify-center text-red-500">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>Ошибка сохранения</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10">
        <div className="text-xs text-center py-1">9:30</div>
        <AppHeader showBackButton={true} onBackClick={navigateBack} />
      </div>

      <main className="flex-1 p-4">
        <div className="flex justify-center mb-6 relative">
          <Image
            src={user.avatar || "/placeholder.svg?height=120&width=120"}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full bg-secondary"
          />
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-0 right-1/3 h-8 w-8 rounded-full bg-white shadow"
              onClick={enableEditing}
            >
              <Settings size={16} className="text-foreground" />
            </Button>
          )}
        </div>

        {/* Статус сохранения */}
        <div className="h-6 mb-4">{renderSaveStatus()}</div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            saveUserData()
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="firstName" className={`text-sm ${formErrors.firstName ? "text-red-500" : "text-gray-500"}`}>
              Ваше имя
            </Label>
            <div className="relative">
              <Input
                id="firstName"
                value={user.firstName}
                onChange={(e) => updateUserField("firstName", e.target.value)}
                disabled={!isEditing}
                className={formErrors.firstName ? "border-red-500" : ""}
              />
              {formErrors.firstName && <div className="text-xs text-red-500 mt-1">{formErrors.firstName}</div>}
            </div>
          </div>

          <div>
            <Label htmlFor="lastName" className={`text-sm ${formErrors.lastName ? "text-red-500" : "text-gray-500"}`}>
              Ваша фамилия
            </Label>
            <div className="relative">
              <Input
                id="lastName"
                value={user.lastName}
                onChange={(e) => updateUserField("lastName", e.target.value)}
                disabled={!isEditing}
                className={formErrors.lastName ? "border-red-500" : ""}
              />
              {formErrors.lastName && <div className="text-xs text-red-500 mt-1">{formErrors.lastName}</div>}
            </div>
          </div>

          <div>
            <Label htmlFor="middleName" className="text-sm text-gray-500">
              Ваше отчество
            </Label>
            <Input
              id="middleName"
              value={user.middleName}
              onChange={(e) => updateUserField("middleName", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="phone" className={`text-sm ${formErrors.phone ? "text-red-500" : "text-gray-500"}`}>
              Ваш номер телефона
            </Label>
            <div className="relative">
              <Input
                id="phone"
                value={user.phone}
                onChange={(e) => updateUserField("phone", e.target.value)}
                disabled={!isEditing}
                className={formErrors.phone ? "border-red-500" : ""}
                placeholder="89991234567"
              />
              {formErrors.phone && <div className="text-xs text-red-500 mt-1">{formErrors.phone}</div>}
            </div>
          </div>

          <div>
            <Label htmlFor="address" className={`text-sm ${formErrors.address ? "text-red-500" : "text-gray-500"}`}>
              Ваш адрес доставки
            </Label>
            <div className="relative">
              <Input
                id="address"
                value={user.address}
                onChange={(e) => updateUserField("address", e.target.value)}
                disabled={!isEditing}
                className={formErrors.address ? "border-red-500" : ""}
              />
              {formErrors.address && <div className="text-xs text-red-500 mt-1">{formErrors.address}</div>}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary text-white"
                disabled={!hasChanges || saveState === SaveState.SAVING}
              >
                {saveState === SaveState.SAVING ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Сохранить
              </Button>
              <Button type="button" variant="outline" onClick={cancelEditing} disabled={saveState === SaveState.SAVING}>
                <X className="h-4 w-4 mr-2" />
                Отмена
              </Button>
            </div>
          )}
        </form>

        {/* История аренды */}
        <div className="mt-8">
          <RentalHistory />
        </div>
      </main>

      <footer className="mt-auto border-t border-border">
        <div className="flex justify-around py-2">
          <div className="flex flex-col items-center">
            <div className="h-1 w-8 bg-primary rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

