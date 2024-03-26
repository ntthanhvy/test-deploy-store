"use client"

import Button from "@modules/common/components/button"
import ProductItem from "@modules/common/components/product-item"
import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import { useEffect, useState } from "react"

type Props = {
  products: Array<{
    id: number
    name: string
    price: number
    currencyCode: string
    review: {
      rate: number
      count: number
    }
    image: string
  }>
}

function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export default function CategoryProducts({ products }: Props) {
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
      <div className="xl:max-w-grid xl:mx-auto lg:mx-7 mx-5 my-10 lg:my-0 flex flex-col items-start lg:mt-10">
        <div className="flex flex-col lg:flex-row items-start  lg:items-center justify-between w-full gap-3">
          <h1 className="text-3xl font-bold text-primary-700">
            Mango Collection
          </h1>

          <div className="flex items-center gap-x-3">
            <Button
              variant="primary"
              className="text-xs !py-2 !px-2 leading-none"
            >
              10 items per page
              <ChevronDown size={15} className="ml-1 lg:ml-2" />
            </Button>

            <Button className="text-xs !px-2 py-2">
              Serves <ChevronDown size={"15"} className="ml-1 lg:ml-3" />
            </Button>

            <Button className="text-xs !px-2 py-2">
              Sort order
              <ChevronDown size="15" className="ml-1 lg:ml-3" />
            </Button>
          </div>
        </div>

        <div className="w-full relative py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-x-7 lg:gap-y-5 lg:py-4 place-items-center">
            {/* {views.map((product, index) => (
              <ProductItem product={product} key={index} />
            ))} */}
          </div>
        </div>

        <div className="w-full flex items-center justify-between mt-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Button
                className={clsx("roudned-full !w-5 !h-5 !p-3", {
                  "!bg-primary-700 !text-white": index + 1 === currentPage,
                })}
                onClick={() => setCurrentPage(index + 1)}
                key={index}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <Button className="uppercase bg-primary-700 text-white rounded-xl">
            Show me more
          </Button>
        </div>
      </div>
    </>
  )
}
