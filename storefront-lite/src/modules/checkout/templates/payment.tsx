"use client"

import { useCheckout } from "@lib/context/checkout-context"
import { useCart } from "medusa-react"
import Delivery from "../components/delivery"
import Summary from "../components/summary"

export default function Payment() {
  const {
    sameAsBilling: { state: isSame, toggle: sameShipping },
    watch,
  } = useCheckout()
  const { cart } = useCart()

  const [shippingAddress] = watch(["shipping_address"])

  if (!cart) return null

  return (
    <div className="px-5 lg:max-w-7xl w-full flex flex-col items-center justify-center py-10 lg:py-28 lg:mx-auto">
      <div className="w-full flex flex-col md:flex-row gap-x-20 items-stretch justify-stretch">
        <div className="flex-1 flex flex-col justify-between">
          <Delivery />
        </div>

        <Summary cart={cart} step={2} />
      </div>
    </div>
  )
}
