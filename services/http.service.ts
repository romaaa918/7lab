import type { ApiError } from "@/models/product.model"

export class HttpService {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        message: `HTTP Error: ${response.statusText}`,
        status: response.status,
      }

      try {
        const errorData = await response.json()
        if (errorData.message) {
          error.message = errorData.message
        }
      } catch (e) {
        // Если не удалось распарсить JSON, используем стандартное сообщение
      }

      throw error
    }

    return (await response.json()) as T
  }

  static async get<T>(url: string, headers?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      })

      return await this.handleResponse<T>(response)
    } catch (error) {
      console.error("GET request failed:", error)
      throw error
    }
  }

  static async post<T>(url: string, data: any, headers?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(data),
      })

      return await this.handleResponse<T>(response)
    } catch (error) {
      console.error("POST request failed:", error)
      throw error
    }
  }

  // Можно добавить методы PUT, DELETE и т.д. по аналогии
}

