"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
  }

  return (
    <div className="flex justify-between" key={phone}>
      {/* Direita */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon className="text-primary" size={18} />
        <p className="text-sm">{phone}</p>
      </div>

      {/* Esquerda */}
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopyPhoneClick(phone)}
        >
          Copiar
        </Button>
      </div>
    </div>
  )
}

export default PhoneItem
