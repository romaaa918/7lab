import Image from "next/image"
import AppHeader from "@/components/app-header"
import CategoriesMenu from "@/components/categories-menu"

export default function CategoriesOverviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10">
        <div className="text-xs text-center py-1">9:30</div>
        <AppHeader showBackButton={true} />
        <div className="px-4 py-2">
          <CategoriesMenu />
        </div>
      </div>

      <main className="flex-1 p-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Hockey */}
          <div className="bg-white rounded-lg p-2 flex flex-col">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Хоккей с шайбой"
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
            <div className="text-xs font-medium text-center mt-1">Хоккей с шайбой</div>
          </div>

          {/* Table tennis */}
          <div className="bg-white rounded-lg p-2 flex flex-col">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Настольный теннис"
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
            <div className="text-xs font-medium text-center mt-1">Настольный теннис</div>
          </div>

          {/* Football */}
          <div className="bg-white rounded-lg p-2 flex flex-col">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Футбол"
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
            <div className="text-xs font-medium text-center mt-1">Футбол</div>
          </div>

          {/* Basketball */}
          <div className="bg-white rounded-lg p-2 flex flex-col">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Баскетбол"
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
            <div className="text-xs font-medium text-center mt-1">Баскетбол</div>
          </div>

          {/* Volleyball */}
          <div className="bg-white rounded-lg p-2 flex flex-col">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Волейбол"
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
            <div className="text-xs font-medium text-center mt-1">Волейбол</div>
          </div>

          {/* Tennis */}
          <div className="bg-white rounded-lg p-2 flex flex-col">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Большой теннис"
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
            <div className="text-xs font-medium text-center mt-1">Большой теннис</div>
          </div>

          {/* Cycling */}
          <div className="bg-white rounded-lg p-2 flex flex-col">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Велоспорт"
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
            <div className="text-xs font-medium text-center mt-1">Велоспорт</div>
          </div>

          {/* Skateboarding */}
          <div className="bg-white rounded-lg p-2 flex flex-col">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Скейтбординг"
              width={120}
              height={120}
              className="object-contain mx-auto"
            />
            <div className="text-xs font-medium text-center mt-1">Скейтбординг</div>
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

