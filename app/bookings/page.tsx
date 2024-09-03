import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"

const BookingsPage = async () => {
  const user = await getServerSession(authOptions)
  if (!user) return notFound()
  const bookings = await db.booking.findMany({
    where: {
      userId: (user.user as any).id,
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  return (
    <>
      <Header />
      <div className="my-6 px-5">
        <div>
          <h2 className="text-xl font-bold">Agendamentos</h2>
        </div>
        <div>
          {bookings.map((booking) => (
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
