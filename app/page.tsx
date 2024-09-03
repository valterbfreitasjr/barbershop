import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"
import { quicksearchOptions } from "./_constants/searchOptions"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
export default async function Home() {
  const user = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const bookings = user?.user
    ? await db.booking.findMany({
        where: {
          userId: (user?.user as any).id,
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
      })
    : []

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Valter!</h2>
        <p>Sábado, 10 de agosto.</p>

        {/* Busca */}
        <div className="mt-6">
          <Search />
        </div>

        {/* Busca rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-deliveryTimeMinutes-scrollbar]:hidden">
          {quicksearchOptions.map((opt) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={opt.title}
              asChild
            >
              <Link href={`/barbershops?service=${opt.title}`}>
                <Image
                  src={opt.imageUrl}
                  width={16}
                  height={16}
                  alt={opt.title}
                />
                {opt.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* Image banner */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende seu horáro"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamentos */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex gap-x-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-deliveryTimeMinutes-scrollbar]:hidden">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        {/* Recomendados */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-deliveryTimeMinutes-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>

        {/* Populares */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-deliveryTimeMinutes-scrollbar]:hidden">
          {popularBarbershops.map((popularBarbershop) => (
            <BarberShopItem
              barbershop={popularBarbershop}
              key={popularBarbershop.id}
            />
          ))}
        </div>
      </div>
      {/* Footer - criado componente e inserido no layout, pois será utilizado por toda a aplicação. */}
    </div>
  )
}
