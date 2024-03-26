"use client"

import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import BasketItem from "@modules/basket/components/basket-items"

import Button from "@modules/common/components/button"
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page"
import { useCart, useMeCustomer } from "medusa-react"
import Link from "next/link"
import Summary from "../components/summary"

export default function BasketTemplate() {
  const { cart } = useCart()
  const { isLoading } = useMeCustomer()
  const items = useEnrichedLineItems()

  if (!cart || !cart?.id?.length || isLoading) {
    return <SkeletonCartPage />
  }

  return (
    <div className="px-5 lg:max-w-7xl lg:mx-auto w-full flex flex-col items-center justify-center py-10 ">
      <h1 className="w-full text-left text-primary-700 text-2xl lg:text-[24px] font-bold font-WildMango">
        Your Basket
      </h1>

      <div className="w-full flex flex-col md:flex-row gap-x-10 items-stretch justify-stretch">
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-end gap-y-8">
            <div className="w-full grid grid-cols-1 gap-5">
              <BasketItem items={items} region={cart?.region} />
            </div>

            <Link href="/">
              <Button className="ml-auto uppercase rounded-small whitespace-nowrap py-3 px-5 font-medium text-subtitle border-2 !text-primary-700 !border-primary-700 hover:!bg-primary-700 hover:!text-white">
                Continue shopping
              </Button>
            </Link>
          </div>
        </div>

        <Summary cart={cart} step={1} />
      </div>
    </div>
  )
}
