import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"

const BookingsPage = async () => {
  const user = await getServerSession(authOptions)
  if (!user) return notFound()

  const confirmedBookings = getConfirmedBookings()

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
        {confirmedBookings.length < 1 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            <div className="my-12">
              <h3 className="text-center text-xs italic text-gray-400">
                Você não possui agendamentos confirmados.
              </h3>
            </div>
          </>
        )}

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            <div>
              {confirmedBookings.map((booking) => (
                <div className="my-3" key={booking.id}>
                  <BookingItem
                    key={booking.id}
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Finalizados
        </h2>
        <div>
          {concludedBookings.map((booking) => (
            <div className="my-3" key={booking.id}>
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BookingsPage
