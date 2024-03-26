import { medusaClient } from "@lib/config"
import { HQ_STORE_CODE } from "@lib/constants"
import { useCheckout } from "@lib/context/checkout-context"
import { Cart } from "@medusajs/medusa"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { isEmpty } from "lodash"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import Image from "next/image"
import { Fragment, useEffect, useMemo } from "react"
import { StoreLocation } from "types/medusa"

const options = [
  {
    id: 1,
    name: "Click & Collect",
    value: "pickup" as const,
    icon: "/assets/images/delivery/click-collect.png",
    iconSize: { w: 30, h: 30 },
    message: (storeName: string) => (
      <span className="text-subtitle text-black">
        Order now, collect in store at{" "}
        <span className="font-bold">{storeName || "CakeBox Stevenage"}</span>
      </span>
    ),
    distance: "0.5 miles",
    action: "Change store",
    price: 0,
  },
  {
    id: 2,
    name: "Delivery",
    value: "delivery" as const,
    icon: "/assets/images/delivery/delivery.png",
    iconSize: { w: 28, h: 28 },
    message: (postal_code: string) => (
      <span className="text-subtitle text-black">
        Next day delivery available to{" "}
        <span className="font-bold">{postal_code || "SG5 3XP"}</span>
      </span>
    ),
    action: "Change postcode",
    price: 995,
  },
]

type ShippingOption = {
  value?: string
  label?: string
  price: string
  message?: (value: string) => React.ReactNode
  action?: string
  icon?: string
  iconSize?: { w: number; h: number }
}

export default function DeliveryAddress({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) {
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    register,
  } = useCheckout()
  const { shipping_options, refetch } = useCartShippingOptions(cart?.id, {
    enabled: !!cart?.id,
  })
  const { addShippingMethod, setCart } = useCart()

  const shippingMethods: ShippingOption[] = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options
        ?.filter((opt) => opt.metadata?.code === "delivery")
        .map((option) => ({
          value: option.id,
          label: option.name,
          price: formatAmount({
            amount: option.amount || 0,
            region: cart.region,
          }),
          message: options.find((opt) => option.metadata?.code === opt.value)
            ?.message,
          action: options.find((opt) => option.metadata?.code === opt.value)
            ?.action,
          icon: options.find((opt) => option.metadata?.code === opt.value)
            ?.icon,
          iconSize: options.find((opt) => option.metadata?.code === opt.value)
            ?.iconSize,
        }))
    }

    return []
  }, [shipping_options, cart])

  const data = useMemo<any>(() => {
    if (!cart || !cart.shipping_methods) return undefined

    const shippingOption = cart.shipping_methods?.[0]
    return shippingOption?.data || undefined
  }, [cart])

  const submitShippingOption = (soId: string, data?: any) => {
    addShippingMethod.mutate(
      { option_id: soId, data },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: (err) => {
          console.log(err)
        },
      }
    )
  }

  useEffect(() => {
    if (
      cart &&
      cart.shipping_methods?.length > 0 &&
      isEmpty(cart.shipping_methods[0]?.data) &&
      !isEmpty(data)
    ) {
      submitShippingOption(cart.shipping_methods[0].shipping_option_id, data)
    }
  }, [cart, data])

  const {
    data: stores,
    isLoading,
    refetch: refetchStore,
  } = useQuery<void, Error, { stores: StoreLocation[] }>({
    queryFn: () =>
      medusaClient.client.request(
        "GET",
        `/store/store-locations/search?s=${HQ_STORE_CODE}`
      ),
    queryKey: ["store-location", "search", HQ_STORE_CODE],
  })

  useEffect(() => {
    if (isLoading || !stores || !shippingMethods || !shippingMethods.length)
      return

    const store = stores.stores[0]
    const data = {
      store_id: store.id,
      store_name: store.name,
      store_code: store.code,
      store_postal_code: store.address?.postal_code,
    }
    submitShippingOption(shippingMethods[0].value as string, data)
  }, [stores, isLoading])

  return (
    <>
      <div className="mt-20 w-full flex flex-col items-start gap-5">
        <h1 className="font-bold text-primary-700 text-[25px] font-WildMango">
          Your delivery details
        </h1>

        {shippingMethods &&
          shippingMethods.map((delivery, index) => (
            <Fragment key={index}>
              <div
                className={clsx(
                  "border border-primary-100 rounded-small shadow-card px-6 lg:px-10 py-4 w-full hover:cursor-pointer hover:bg-primary-100/50 relative transition duration-300",
                  "bg-primary-100 hover:bg-primary-100"
                )}
              >
                <span
                  className={clsx(
                    "absolute bg-white left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center p-0.25",
                    "outline outline-white outline-offset-0"
                  )}
                >
                  <span className="relative w-7 h-7">
                    <Image src={"/assets/images/check.svg"} alt="check" fill />
                  </span>
                </span>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center w-full">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <Image
                        alt={`delivery-${delivery.value}`}
                        src={delivery.icon || ""}
                        width={delivery.iconSize?.w}
                        height={delivery.iconSize?.h}
                      />
                    </div>
                    <h5 className="font-bold text-xl text-primary-700">
                      {delivery.label}
                    </h5>

                    <span className="ml-auto uppercase font-semibold leading-normal text-primary-700">
                      {delivery.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p>{delivery.message?.(data?.store_postal_code)}</p>
                    <span
                      // href=""
                      className="ml-auto underline text-primary-700 text-xs lg:text-subtitle"
                      onClick={(e) => {
                        e.preventDefault()
                        // setCheckStore(false)
                      }}
                    >
                      {delivery.action}
                    </span>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}

        <div className="mt-10 w-full">
          <div className="w-full flex items-start gap-3">
            <label
              htmlFor="diverly_address"
              className="w-[27%] uppercase text-primary-700 text-base font-bold "
            >
              DELIVERY ADDRESS
            </label>

            <div className="flex-1 pl-8">
              <div>
                <p className="underline text-primary-700 text-sm">
                  Similar to Billing Address
                </p>
              </div>
              <div className="mt-2 relative">
                <span className="absolute top-1/2 -translate-y-1/2 -left-8">
                  Or
                </span>
                <input
                  type="text"
                  className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
                  placeholder="Start Typing Your Address Or Postcode"
                  {...register("shipping_address.address_1")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
