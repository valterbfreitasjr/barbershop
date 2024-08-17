import BarberShopItem from "../_components/barbershop-item"
import { db } from "../_lib/prisma"

interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  })

  return (
    <div>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Resultados para &quot;{searchParams?.search}&quot;
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {barbershops.map((barber) => (
          <BarberShopItem key={barber.id} barbershop={barber} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopsPage
