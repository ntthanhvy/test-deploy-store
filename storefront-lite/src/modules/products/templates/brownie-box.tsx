"use client"

import { ProductBoxProvider } from "@lib/context/product-box-context"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import BrownieBox from "../components/brownie-box"
import Heading from "../components/heading"

type Props = {
  product: PricedProduct
  // suggestProducts: PricedProduct[]
}

export default function BrownieBoxTemplate({ product }: Props) {
  return (
    <ProductBoxProvider product={product}>
      <Heading collection={product.collection} />

      <BrownieBox product={product} />
    </ProductBoxProvider>
  )
}
