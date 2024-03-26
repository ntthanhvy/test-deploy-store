"use client"

import { RadioGroup } from "@headlessui/react"
import { medusaClient } from "@lib/config"
import { HQ_STORE_CODE } from "@lib/constants"
import { Cart } from "@medusajs/medusa"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { isEmpty } from "lodash"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import Image from "next/image"
import React, { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
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

type DeliveryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

type ShippingFormProps = {
  soId: string
  data: any
}

export default function DeliverOptions({ cart }: DeliveryProps) {
  const { addShippingMethod, setCart } = useCart()
  const { shipping_options, refetch } = useCartShippingOptions(cart?.id, {
    enabled: !!cart?.id,
  })

  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ShippingFormProps>({
    defaultValues: {
      soId: cart.shipping_methods?.[0]?.shipping_option_id,
      data: {},
    },
  })

  const [data, soId] = watch(["data", "soId"])

  useEffect(() => {
    console.log({ soId })
  }, [data, soId])

  useEffect(() => {
    console.log({ methods: cart.shipping_methods })
    if (cart && cart.shipping_methods.length > 0) {
      const shippingOption = cart.shipping_methods[0]
      if (shippingOption.shipping_option_id) {
        console.log({ shipping_option: shippingOption.shipping_option_id })
        setValue("soId", shippingOption.shipping_option_id)
        setValue("data", shippingOption.data)
      }
    }
  }, [cart])

  useEffect(() => {
    if (
      cart &&
      cart.shipping_methods.length > 0 &&
      isEmpty(cart.shipping_methods[0]?.data) &&
      !isEmpty(data)
    ) {
      submitShippingOption(cart.shipping_methods[0].shipping_option_id)
    }
  }, [cart, data])

  const submitShippingOption = (soId: string) => {
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

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value)
    fn(value)
  }

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
    if (isLoading || !stores) return

    const store = stores.stores[0]
    setValue("data", {
      store_id: store.id,
      store_name: store.name,
      store_code: store.code,
      store_postal_code: store.address?.postal_code,
    })
  }, [stores, isLoading])

  useEffect(() => {
    if (!cart) return
    if (!shippingMethods || shippingMethods.length === 0) return
    if (!cart.shipping_methods || cart.shipping_methods.length === 0) {
      console.log("update shipping methods")
      submitShippingOption(shippingMethods[0].value as string)
    }
  }, [shippingMethods, cart])

  return (
    <div className="flex flex-col gap-y-5 items-stretch justify-stretch mt-10 lg:mt-0">
      <h4 className="font-bold text-xl lg:text-2xl text-primary-700 lg:leading-[60px] ">
        Your delivery options
      </h4>

      <Controller
        control={control}
        name="soId"
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            value={value}
            onChange={(value) => handleChange(value, onChange)}
            className={"space-y-5"}
          >
            {shippingMethods &&
              shippingMethods.map((delivery, index) => (
                <RadioGroup.Option
                  className=""
                  key={index}
                  value={delivery.value}
                >
                  <div
                    className={clsx(
                      "border border-primary-100 rounded-small shadow-card px-6 lg:px-10 py-4 w-full hover:cursor-pointer hover:bg-primary-100/50 relative transition duration-300",
                      value === delivery.value
                        ? "bg-primary-100 hover:bg-primary-100"
                        : "bg-transparent"
                    )}
                  >
                    <span
                      className={clsx(
                        "absolute bg-white left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center p-0.25",
                        value === delivery.value
                          ? "outline outline-white outline-offset-0"
                          : "invisible"
                      )}
                    >
                      {value === delivery.value && (
                        <span className="relative w-7 h-7">
                          <Image
                            src={"/assets/images/check.svg"}
                            alt="check"
                            fill
                          />
                        </span>
                      )}
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
                        <p>{delivery.message?.(data.store_postal_code)}</p>
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
                </RadioGroup.Option>
              ))}
          </RadioGroup>
        )}
      />
    </div>
  )
}
