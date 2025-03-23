"use client"

import { Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ApiError } from "@/models/product.model"

interface LoadingErrorStateProps {
  loading: boolean
  error: ApiError | null
  onRetry: () => void
}

export default function LoadingErrorState({ loading, error, onRetry }: LoadingErrorStateProps) {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-sm text-gray-500">Загрузка данных...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-40 p-4">
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <p className="text-sm text-red-500 text-center mb-4">{error.message}</p>
        <Button onClick={onRetry} variant="outline" size="sm" className="flex items-center">
          <RefreshCw className="h-4 w-4 mr-2" />
          Повторить
        </Button>
      </div>
    )
  }

  return null
}

