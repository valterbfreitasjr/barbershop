import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"

const BookingsPage = async () => {
  const user = await getServerSession(authOptions)
  if (!user) return notFound()

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (user.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (user.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  return (
    <>
      <Header />
      <div className="my-6 px-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Confirmados
        </h2>
        <div>
          {confirmedBookings.map((booking) => (
            <div className="my-3" key={booking.id}>
              <BookingItem key={booking.id} booking={booking} />
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Finalizados
        </h2>
        <div>
          {concludedBookings.map((booking) => (
            <div className="my-3" key={booking.id}>
              <BookingItem key={booking.id} booking={booking} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BookingsPage