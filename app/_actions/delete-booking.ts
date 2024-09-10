"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { revalidatePath } from "next/cache"

export const deleteBooking = async (bookingId: string) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado")
  }
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath("/bookings")
}
