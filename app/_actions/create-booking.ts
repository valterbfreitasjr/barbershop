"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { revalidatePath } from "next/cache"

interface createBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: createBookingParams) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado")
  }
  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}
