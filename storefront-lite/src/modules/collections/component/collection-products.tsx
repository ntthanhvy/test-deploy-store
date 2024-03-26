"use client"

import { ProductCollection } from "@medusajs/medusa"
import ProductItem from "@modules/common/components/product-item"
import { useEffect, useState } from "react"
import { ProductPreviewType } from "types/global"

type Props = {
  products: Array<ProductPreviewType>
  collection: ProductCollection
}

function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export default function CollectionProducts({ products, collection }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [views, setViews] = useState<Props["products"]>(products)

  useEffect(() => {
    if (currentPage !== 1) {
      const newProducts = [...products]
      shuffleArray(newProducts)

      setViews(newProducts)
    } else {
      setViews(products)
    }
  }, [currentPage])

  return (
    <>
      <div className="xl:max-w-grid xl:mx-auto xl:px-5 lg:mx-7 mx-5 my-10 flex flex-col items-start lg:mt-10">
        <div className="w-full relative py-5 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-x-7 lg:gap-y-5 lg:py-4 lg:mx-auto lg:max-w-full place-items-center">
            {products.map((product, index) => (
              <ProductItem product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
