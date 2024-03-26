"use client"

import { CheckoutFormValues, useCheckout } from "@lib/context/checkout-context"
import ConnectForm from "@modules/common/components/connect-form"
import { useCart } from "medusa-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import DeliveryAddress from "../dedlivery-address"
import DeliveryDate from "../delivery-date"
import PaymentButton from "../payment-button"
import PaymentMethod from "../payment-method"
import YourDetail from "../your-detail"

export default function Delivery() {
  const navigation = useRouter()

  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isEdit, toggle: setEdit },
    setAddresses,
    setValue,
    handleSubmit,
    control,
    initPayment,
  } = useCheckout()
  const { cart } = useCart()

  useEffect(() => {
    if (cart && cart.payment_sessions) {
      initPayment()
    }
  }, [cart])

  return (
    <div className="w-full flex flex-col items-stretch">
      <ConnectForm<CheckoutFormValues>>
        {({}) => (
          <>
            {/* account info */}
            <YourDetail />

            {cart && <DeliveryAddress cart={cart} />}

            <DeliveryDate />

            {cart?.payment_sessions?.length
              ? cart.payment_session && (
                  <>
                    <PaymentMethod paymentSession={cart?.payment_session} />
                  </>
                )
              : null}

            <div className="mt-20 w-2/3">
              <PaymentButton />
              <span className="mt-5 text-primary-700 text-[11px] block">
                By placing your order, you agree to receive updates via email
                and SMS from Cake Box. These may include order confirmations and
                promotions. You can manage preferences in your account settings.
                For privacy details, refer to our policy. Opt-out anytime.
              </span>
            </div>
          </>
        )}
      </ConnectForm>
    </div>
  )
}
