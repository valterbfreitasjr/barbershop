"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"

export const getConcludedBookings = async () => {
  const user = await getServerSession(authOptions)

  if (!user?.user) return []

  return await db.booking.findMany({
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
}
