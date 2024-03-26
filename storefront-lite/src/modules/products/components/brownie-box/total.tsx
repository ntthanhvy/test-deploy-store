"use client"

import { useProductBoxActions } from "@lib/context/product-box-context"
import { PricedVariant } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import { formatAmount, useCart } from "medusa-react"
import { useMemo } from "react"

export default function BoxTotal() {
  const { addToCart, watch, register } = useProductBoxActions()

  const [variants, boxType] = watch(["variants", "boxType"])

  const total = useMemo(() => {
    return variants.reduce((acc: number, v: any) => {
      if (v.selected) {
        return acc + v.quantity
      }
      return acc
    }, 0)
  }, [variants])

  const disabled = useMemo(() => {
    if (!variants.filter((v: any) => v.selected).length) return true

    const boxes = total % boxType

    if (boxes !== 0) return true

    return false
  }, [variants, boxType, total])

  const { cart } = useCart()

  const totalAmount = useMemo(() => {
    if (!cart || !cart.region) return 0

    return variants.reduce(
      (acc: number, v: PricedVariant & { quantity: number }) => {
        const price = v.prices.find(
          (p) => p.currency_code === cart.region.currency_code
        )

        if (v.quantity > 0 && price) {
          return acc + v.quantity * price.amount
        }
        return acc
      },
      0
    )
  }, [variants, total])

  // console.log(totalAmount)

  if (!cart?.id) return <></>

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="font-bold text-black">
          Total <span className="text-primary-700">{total}</span>
        </h3>
        <p className="text-2xl font-semibold">
          {formatAmount({ amount: totalAmount, region: cart.region })}
        </p>
      </div>

      <div className="flex gap-x-3 items-center">
        <input
          className="w-12 h-12 bg-white border border-primary-700 rounded-md text-center disabled:opacity-50"
          {...register("boxQuantity", {
            disabled,
            valueAsNumber: true,
          })}
        />
        <Button
          onClick={addToCart}
          className="uppercase !px-10 py-3 rounded-md"
          variant="primary"
          fill
          disabled={disabled}
        >
          Add to Basket
        </Button>
      </div>
    </div>
  )
}
