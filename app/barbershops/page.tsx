import BarberShopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams?.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  console.log(
    `Title: ${searchParams?.title} -- Service: ${searchParams?.service}`,
  )

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="mb-6 px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams?.title ?? searchParams?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4 transition md:grid-cols-3 lg:grid-cols-4">
          {barbershops.map((barber) => (
            <BarberShopItem key={barber.id} barbershop={barber} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage