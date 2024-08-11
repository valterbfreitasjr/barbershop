import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import SidebarSheet from "./sidebar-sheet"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.png" height={18} width={120} alt="logo barbershop" />

        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <MenuIcon />
              <SidebarSheet />
            </Button>
          </SheetTrigger>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
