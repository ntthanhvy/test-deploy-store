"use client"

import { ProductProvider } from "@lib/context/product-context"
import { getProductsList } from "@lib/data"
import usePreviews from "@lib/hooks/use-previews"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Recommendations from "@modules/common/components/recommendation"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import Heading from "../components/heading"
import ProductInfo from "./product-info"

type Props = {
  product: PricedProduct
  // suggestProducts: PricedProduct[]
}

export default function ProductTemplate({ product }: Props) {
  const { cart } = useCart()

  const { data: infiniteData } = useInfiniteQuery(
    [`get_suggestion_products`, product.id],
    ({ pageParam }) =>
      getProductsList({
        queryParams: { limit: 10 },
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  const suggestProducts = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  })

  return (
    <ProductProvider product={product}>
      <Heading collection={product.collection} />

      <ProductInfo product={product} />

      {/* <Recommendations products={suggestProducts} /> */}
    </ProductProvider>
  )
}
