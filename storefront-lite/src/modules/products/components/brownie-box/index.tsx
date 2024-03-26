"use client"

import { useProductBoxActions } from "@lib/context/product-box-context"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import clsx from "clsx"
import { useMemo } from "react"
import { useFieldArray } from "react-hook-form"
import AutoFillBox from "./auto-fill"
import BoxFill from "./box-fill"
import { BrownieBoxItem } from "./item"
import BoxTotal from "./total"

type Props = {
  product: PricedProduct
}

export default function BrownieBox({ product }: Props) {
  const { addToCart, inStock, variant, control } = useProductBoxActions()

  const { fields, update } = useFieldArray({
    name: "variants",
    control,
  })

  const breadcrumbs = useMemo(() => {
    return [
      {
        name: "Home",
        href: "/",
        current: false,
      },
      {
        name: product.collection?.title,
        href: `/collections/${product.collection?.handle}`,
        current: true,
      },
    ]
  }, [product])

  console.log(fields)

  return (
    <section id="product-action" className="bg-primary-50 relative">
      <div className="lg:max-w-7xl mx-auto py-10 lg:py-20 px-5 lg:px-0">
        {/* breadcrumb */}
        <div className="text-xs lg:text-subtitle text-black">
          <nav className="flex flex-wrap itens-center gap-x-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <a
                  href={breadcrumb.href}
                  className={clsx(
                    "transition duration-300 whitespace-nowrap lg:whitespace-normal",
                    {
                      "font-medium text-primary-800": breadcrumb.current,
                    }
                  )}
                >
                  {breadcrumb.name}
                </a>
                {index < breadcrumbs.length - 1 && <span>{">"}</span>}
              </div>
            ))}
          </nav>
        </div>

        {/* product */}
        <div className="mt-5 w-full flex flex-col lg:flex-row items-start">
          {/* variant select */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="text-center">
              <h1 className="text-3xl text-primary-700 font-bold mb-3">
                {product.title}
              </h1>
              <p className="text-primary-700 text-sm">{product.description}</p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-4 gap-4">
                {fields.map((variant: any, idx) => (
                  <BrownieBoxItem
                    key={variant.id}
                    variant={variant}
                    idx={idx}
                    update={update}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* box options */}
          <div className="w-full lg:shrink lg:w-1/2 flex-1 lg:pl-12 py-10 lg:py-0">
            <div className="divide-y-2 divide-gray-400 space-y-2">
              <BoxFill />

              <AutoFillBox />

              <BoxTotal />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
