import { Order } from "@medusajs/medusa"
import { useMemo } from "react"

type Props = {
  order: Order
}

const message = `Thank you for\n your order!`

const OrderCompletedTemplate = ({ order }: Props) => {
  const isDeliver = useMemo(
    () =>
      order.shipping_methods[0].shipping_option.name
        .toLowerCase()
        .includes("deliver"),
    [order]
  )

  return (
    <section id="order-confirm" className="relative w-screen">
      <div className="bg-order bg-cover bg-center min-h-[400px] lg:min-h-[809px] flex items-center justify-center">
        <div className="max-w-3xl mx-auto h-full flex flex-col items-center justify-center text-center px-5 lg:px-0">
          <h1 className="my-10 text-5xl lg:my-0 lg:mb-10 lg:text-[70px] lg:leading-[60px] font-bold text-primary-700 whitespace-pre-wrap">
            {message}
          </h1>
          <div className="my-5 lg:my-0">
            {!isDeliver ? (
              <>
                <p className="text-black lg:text-[25px] font-medium">
                  Your order number is{" "}
                  <span className="font-semibold">{order.id}</span>
                </p>
                <p className="mt-3 text-black lg:text-[25px] font-medium">
                  You will receive a text message reminder on the mobile number
                  you provided with order updates and delivery tracking
                  information
                </p>
                <div className="mt-8 text-left max-w-[80%] mx-auto w-full flex flex-col items-center justify-center">
                  <h4 className="text-black lg:text-[25px] font-medium">
                    If you would like to create an account please enter a
                    password below
                  </h4>
                  <div className="mt-3 w-full flex items-stretch justify-stretch gap-x-5">
                    <div className="flex-1">
                      <label
                        htmlFor="password"
                        className="uppercase text-black text-sm font-medium"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <input className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="confirm_password"
                        className="uppercase text-black text-sm font-medium"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2">
                        <input className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-black lg:text-[25px] font-medium">
                  Your order number is{" "}
                  <span className="font-semibold">{order.id}</span> and you
                  have chosen Collect in Store - Cake Box Stevenage.
                </p>
                <p className="mt-5 text-black lg:text-[25px] font-medium">
                  You will receive a text message reminder on the mobile number
                  you provided.
                </p>
                <p className="mt-5 text-black lg:text-[25px] font-medium">
                  Thank you for choosing Cake Box to satisfy your cake cravings.
                  We can&apos;t wait to be a part of your cake-filled moments!
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderCompletedTemplate
