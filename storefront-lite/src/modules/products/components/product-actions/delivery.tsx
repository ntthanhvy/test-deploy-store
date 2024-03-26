import { RadioGroup } from "@headlessui/react"
import { useProductActions } from "@lib/context/product-context"
import { Cart } from "@medusajs/medusa"
import clsx from "clsx"
import { formatAmount, useCart, useShippingOptions } from "medusa-react"
import Image from "next/image"
import { useMemo } from "react"
import { Controller, useForm } from "react-hook-form"

const options = [
  {
    id: 1,
    name: "Click & Collect",
    value: "pickup" as const,
    icon: "/assets/images/delivery/click-collect.png",
    iconSize: { w: 30, h: 30 },
    message: (store: string) => (
      <span className="text-subtitle text-black">
        Order now, collect in store at{" "}
        <span className="font-bold">{store}</span>
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
    message: (postcode: string) => (
      <span className="text-subtitle text-black">
        Next day delivery available to{" "}
        <span className="font-bold">{postcode}</span>
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
  message?: React.ReactNode
  action?: string
  icon?: string
  iconSize?: { w: number; h: number }
}

type DeliveryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  setCheckStore?: (value: boolean) => void
  store: any
}

type ShippingFormProps = {
  soId: string
}

export default function Delivery({
  cart,
  setCheckStore,
  store,
}: DeliveryProps) {
  const { addShippingMethod, setCart } = useCart()
  const { shipping_options } = useShippingOptions(
    {
      region_id: cart.region_id,
      is_return: "false",
    },
    {
      enabled: !!cart.id,
    }
  )

  // const submitShippingOption = (soId: string) => {
  //   addShippingMethod.mutate(
  //     { option_id: soId, data: { store_id: store.id } },
  //     {
  //       onSuccess: ({ cart }) => setCart(cart),
  //       onError: (err) => {
  //         console.log(err)
  //       },
  //     }
  //   )
  // }

  const { setShippingOption } = useProductActions()

  const shippingMethods: ShippingOption[] = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
        message: options
          .find((opt) => option.name === opt.name)
          ?.message(
            option.name !== "Delivery" ? store.name : store.address.postal_code
          ),
        action: options.find((opt) => option.name === opt.name)?.action,
        icon: options.find((opt) => option.name === opt.name)?.icon,
        iconSize: options.find((opt) => option.name === opt.name)?.iconSize,
      }))
    }

    return []
  }, [shipping_options, cart, store])

  const handleChange = (value: string, fn: (value: string) => void) => {
    setShippingOption(value, {
      store_id: store.id,
      store_name: store.name,
      store_postal_code: store.address.postal_code,
    })
    fn(value)
  }

  const {
    control,
    setError,
    formState: { errors },
  } = useForm<ShippingFormProps>({
    defaultValues: {
      soId: cart.shipping_methods?.[0]?.shipping_option_id,
    },
  })

  // console.log(shipping_options)

  return (
    <Controller
      control={control}
      name="soId"
      render={({ field: { value, onChange } }) => (
        <div className="mt-10">
          <div className="flex flex-col border-t border-b border-primary-700 divide-y divide-primary-700">
            <RadioGroup
              value={value}
              onChange={(value) => handleChange(value, onChange)}
            >
              {shippingMethods &&
                shippingMethods.map((delivery, index) => (
                  <RadioGroup.Option
                    className="py-2"
                    key={index}
                    value={delivery.value}
                  >
                    <div
                      className={clsx(
                        "p-2 rounded-md flex items-start gap-x-3 hover:cursor-pointer hover:bg-primary-100/50 relative transition duration-300",
                        delivery.value === value
                          ? "bg-primary-100 hover:bg-primary-100"
                          : "bg-transparent"
                      )}
                    >
                      <span
                        className={clsx(
                          "absolute bg-primary-50 left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center p-0.25"
                        )}
                      >
                        {delivery.value === value && (
                          <span className="relative w-7 h-7">
                            <Image
                              src={"/assets/images/check.svg"}
                              alt="check"
                              fill
                            />
                          </span>
                        )}
                      </span>

                      <div className="relative h-7 lg:w-8 lg:h-8 flex items-center justify-center">
                        <Image
                          alt={`delivery-${delivery.value}`}
                          src={delivery.icon ?? ""}
                          width={delivery.iconSize?.w}
                          height={delivery.iconSize?.h}
                        />
                      </div>

                      <div className="flex flex-col gap-y-2 lg:gap-y-4">
                        <h5 className="font-bold text-lg leading-normal lg:text-xl text-primary-700">
                          {delivery.label}
                        </h5>
                        <p className="text-sm lg:text-subtitle">
                          {delivery.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <a
                            href=""
                            className="underline text-primary-700 text-xs lg:text-subtitle"
                            onClick={(e) => {
                              e.preventDefault()
                              setCheckStore?.(false)
                            }}
                          >
                            {delivery.action}
                          </a>

                          <span className="text-black text-sm lg:text-subtitle">
                            {/* {delivery.distance} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </RadioGroup.Option>
                ))}
            </RadioGroup>
          </div>
        </div>
      )}
    />
  )
}
