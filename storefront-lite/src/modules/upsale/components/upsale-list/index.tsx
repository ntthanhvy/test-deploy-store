"use client"

import { useMockBasket } from "@lib/context/mock-basket-context"
import Button from "@modules/common/components/button"
import Image from "next/image"

type PRops = {
  upsales: Array<{
    id: number
    name: string
    price: number
    currencyCode: string
    image: string
  }>
}

export default function UpsaleList({ upsales }: PRops) {
  const { addBasket } = useMockBasket()

  const onAddBasket = (upsale: PRops["upsales"][number]) => {
    addBasket({
      id: upsale.id,
      name: upsale.name,
      variant: {
        id: upsale.id,
        price: upsale.price,
        image: upsale.image,
        slug: "",
        options: {
          size: 0,
          serves: 0,
        },
      },
      quantity: 1,
    })
  }

  return (
    <div className="lg:max-w-grid lg:mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-7 px-5 lg:px-0 my-10 lg:my-20">
      {upsales.map((upsale, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1">
          <div className="text-center uppercase text-primary-700 font-medium leading-normal text-sm md:text-base ">
            <h6 className="">{upsale.name}</h6>
            <span>
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: upsale.currencyCode,
              }).format(upsale.price / 100)}
            </span>
          </div>
          <div className="relative w-full aspect-[14/15] rounded-default overflow-hidden">
            <Image fill src={upsale.image} alt="upsale" />
          </div>

          <Button
            fill
            className="uppercase !bg-primary-700 text-subtitle font-medium w-full !rounded-small py-2 mt-3 lg:py-3"
            onClick={() => onAddBasket(upsale)}
          >
            ADD TO BASKET
          </Button>
        </div>
      ))}
    </div>
  )
}
