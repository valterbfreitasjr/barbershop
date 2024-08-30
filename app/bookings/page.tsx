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
      service: true,
    },
  })

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Agendamentos</h2>
      </div>
      <div>
        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  )
}

export default BookingsPage
