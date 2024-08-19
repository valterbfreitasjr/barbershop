import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarberShopItemProps {
  barbershop: Barbershop
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* IMAGE */}
        <div className="relative h-[159px] w-full">
          <Image
            src={barbershop.imageUrl}
            fill
            className="rounded-2xl object-cover"
            alt={barbershop.name}
          />
          <Badge className="absolute left-2 top-2 gap-2" variant="secondary">
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs">5,0</p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button
            variant="secondary"
            className="mt-3 w-full hover:bg-gray-800"
            asChild
          >
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberShopItem
