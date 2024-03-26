"use client"

import { getProductsByCollectionHandle } from "@lib/data"
import usePreviews from "@lib/hooks/use-previews"
import { ProductCollection } from "@medusajs/medusa"
import Reviews from "@modules/home/components/reviews"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import CollectionProducts from "../component/collection-products"
import CollectionHeading from "../component/heading"

const CollectionTemplate: React.FC<{
  collection: ProductCollection
  store: any
}> = ({ collection, store }) => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [`get_collection_products`, collection.handle, cart?.id],
    ({ pageParam }) =>
      getProductsByCollectionHandle({
        pageParam,
        handle: collection.handle!,
        cartId: cart?.id,
        currencyCode: cart?.region.currency_code,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  useEffect(() => {
    if (cart?.region_id) {
      refetch()
    }
  }, [cart?.region_id, refetch])

  const previews = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  return (
    <>
      <CollectionHeading collection={collection} store={store} />
      <CollectionProducts products={previews} collection={collection} />

      {/* <div className="w-full relative bg-primary-75">
        <div className="absolute top-0 inset-x-0 bg-policy-pattern bg-bottom bg-cover bg-no-repeat lg:h-[150px] "></div>

        <div className="pt-20">
          <Reviews />
        </div>
      </div> */}
    </>
  )
}

export default CollectionTemplate
