import Image from "next/image"
import { Button } from "@/components/ui/button"
import AppHeader from "@/components/app-header"

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10">
        <div className="text-xs text-center py-1">9:30</div>
        <AppHeader showBackButton={true} />
      </div>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg overflow-hidden mb-4">
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Кроссовки"
            width={400}
            height={300}
            className="w-full object-cover"
          />
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-bold mb-1">Кроссовки</h1>
          <div className="text-sm text-gray-500 mb-2">для бега</div>
          <div className="text-sm mb-2">Описание: 35 размер, цвет: черные, бренд: популярный</div>
          <div className="font-bold">Цена: 500р.</div>
        </div>

        <Button className="w-full bg-primary text-white rounded-full py-2">Добавить в корзину</Button>

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Интересное</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-2">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="Футбол"
                width={120}
                height={120}
                className="object-contain mx-auto"
              />
              <div className="text-xs font-bold mt-1">Футбол, 1000р.</div>
              <div className="text-xs text-gray-500">Футбол</div>
            </div>

            <div className="bg-white rounded-lg p-2">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="Клюшка"
                width={120}
                height={120}
                className="object-contain mx-auto"
              />
              <div className="text-xs font-bold mt-1">Клюшка, 1000р.</div>
              <div className="text-xs text-gray-500">Хоккей с шайбой</div>
            </div>
          </div>
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

