"use client"

import { Button } from "./ui/button"
import { Calendar, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quicksearchOptions } from "../_constants/searchOptions"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"

const SidebarSheet = () => {
  const {data} = useSession();
  const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 py-5">
        

        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>
            <div>
              <p className="font-bold">{data.user?.name}</p>
              <p className="text-xs">{data.user?.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"icon"} onClick={handleLoginWithGoogleClick}>
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se utilizando sua conta do Google.
                  </DialogDescription>
                </DialogHeader>
                <Button variant="outline" className="gap-1 font-bold">
                  <Image
                    src="/google.svg"
                    width={18}
                    height={18}
                    alt="Fazer login com o Google"
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
        
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
            <Image src={opt.imageUrl} alt={opt.title} height={18} width={18} />
            {opt.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <Button className="justify-start gap-2" variant="ghost" onClick={handleLogoutClick}>
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
