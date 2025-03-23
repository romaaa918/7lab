import Image from "next/image"
import { Button } from "@/components/ui/button"
import AppHeader from "@/components/app-header"
import { Calendar } from "lucide-react"
import { ProductService } from "@/services/product.service"

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10">
        <div className="text-xs text-center py-1">9:30</div>
        <AppHeader showBackButton={true} />
        <div className="py-2 px-4">
          <h1 className="text-center font-medium">Ваша корзина аренды</h1>
        </div>
      </div>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg p-4 mb-6 flex items-center">
          <Image
            src="/placeholder.svg?height=80&width=80&text=Футбольный+мяч&bg=4CAF50"
            alt="Футбольный мяч"
            width={80}
            height={80}
            className="object-contain mr-4"
          />
          <div className="flex-1">
            <h2 className="font-bold">Футбольный мяч</h2>
            <div className="text-xs text-gray-500">Футбол</div>
            <div className="text-xs text-gray-500">Период аренды: 1 неделя</div>
            <div className="font-bold mt-1">{ProductService.formatRentalPrice(500)}/неделя</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-sm">Стоимость аренды:</div>
            <div className="font-bold">{ProductService.formatRentalPrice(500)}</div>
          </div>

          <div className="flex justify-between mb-2">
            <div className="text-sm">Залог:</div>
            <div className="font-bold">{ProductService.formatRentalPrice(1000)}</div>
          </div>

          <div className="flex justify-between mb-2 pt-2 border-t">
            <div className="text-sm font-medium">Итого к оплате:</div>
            <div className="font-bold">{ProductService.formatRentalPrice(1500)}</div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">Ваш адрес доставки</div>
            <div className="font-medium">г. Томск, ул. Ленина 329</div>
          </div>

          <Button className="w-full bg-primary text-white rounded-full py-2 flex items-center justify-center">
            <Calendar className="w-4 h-4 mr-2" />
            Оформить аренду
          </Button>
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

