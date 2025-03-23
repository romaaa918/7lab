// Модель пользователя
export interface User {
  id: string
  firstName: string
  lastName: string
  middleName: string
  phone: string
  address: string
  email?: string
  avatar?: string
}

// Состояние сохранения данных
export enum SaveState {
  IDLE = "idle",
  SAVING = "saving",
  SUCCESS = "success",
  ERROR = "error",
}

