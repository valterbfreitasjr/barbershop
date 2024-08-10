import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Calendar, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quicksearchOptions } from "../_constants/searchOptions"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.png" height={18} width={120} alt="logo barbershop" />
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex items-center gap-3 py-5">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/97262966?s=96&v=4" />
              </Avatar>
              <div>
                <p className="font-bold">Valter B. Freitas Jr.</p>
                <p className="text-xs">devjuninho.com.br</p>
              </div>
            </div>

            <div className="py5 border-b border-solid" />

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <SheetClose asChild>
                <Button className="justify-start gap-2" variant="ghost" asChild>
                  <Link href="/">
                    <Calendar size={18} /> Início
                  </Link>
                </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant="ghost">
                <Calendar size={18} /> Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              {quicksearchOptions.map((opt) => (
                <Button
                  className="justify-start gap-2"
                  key={opt.title}
                  variant="ghost"
                >
                  <Image
                    src={opt.imageUrl}
                    alt={opt.title}
                    height={18}
                    width={18}
                  />
                  {opt.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
