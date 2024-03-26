"use client"

import Minus from "@modules/common/icons/minus"
import Plus from "@modules/common/icons/plus"

import Image from "next/image"

export const BrownieBoxItem = ({ update, variant, idx }: any) => {
  return (
    <div className="min-h-44 flex flex-col">
      <div className="flex aspect-square w-full items-center justify-center relative">
        <Image src={variant.thumbnail} alt={variant.sku} fill />
      </div>
      <h6 className="mt-2 mb-4 text-sm text-primary-700 font-bold">
        {variant.title}
      </h6>

      <div className="mt-auto flex items-center justify-center">
        <button
          className="w-5 border border-primary-700"
          onClick={() => {
            const quan = variant.quantity - 1
            if (quan < 0) {
              update(idx, {
                ...variant,
                quantity: 0,
                selected: false,
              })
            } else {
              update(idx, {
                ...variant,
                quantity: quan,
              })
            }
          }}
        >
          <Minus />
        </button>
        <span className="w-6 text-center">{variant.quantity || 0}</span>
        <button
          className="w-5 border border-primary-700"
          onClick={() => {
            update(idx, {
              ...variant,
              quantity: variant.quantity + 1,
              selected: true,
            })
          }}
        >
          <Plus />
        </button>
      </div>
    </div>
  )
}
