"use client"

import { useCheckout } from "@lib/context/checkout-context"
import Footer from "@modules/layout/templates/footer"
import { useCart } from "medusa-react"
import { useEffect } from "react"
import BasketTemplate from "./basket"

export default function CheckoutTemplate() {
  // const { deliveryMethod } = useMockBasket()
  const { cart } = useCart()
  const { initPayment } = useCheckout()

  useEffect(() => {
    // console.log(cart?.payment_sessions)
    // console.log(cart?.shipping_address)
    if (cart?.shipping_address && cart?.payment_sessions) {
      console.log("initPayment")
      initPayment()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  return (
    <>
      <div className="py-10">
        <div className="max-w-7xl mx-auto flex items-center">
          {/* <Delivery /> */}
          <BasketTemplate />
        </div>
      </div>
      <Footer />
    </>
  )
}
