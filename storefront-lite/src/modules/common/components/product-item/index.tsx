"use client"

import { verifyImage } from "@lib/verify-image"
import Heart from "@modules/common/icons/heart"
import HeartFill from "@modules/common/icons/heart_fill"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ProductPreviewType } from "types/global"

type Props = {
  product: ProductPreviewType
}
function ProductItem({ product }: Props) {
  const [favorite, setFavorite] = useState(false)

  const onFavorite = () => {
    setFavorite(!favorite)
  }

  return (
    <div className="snap-start relative h-full flex flex-col flex-[124px_1_0] lg:flex-[100%_1_0]  w-full min-w-[124px] md:max-w-[300px] lg:max-w-[248px] lg:w-full ">
      <Link href={`/products/${product.handle}`} className="mb-auto">
        <div className="relative flex items-center justify-center w-[124px] xl:w-auto xl:h-[265px] aspect-[248/265] rounded-[20px] overflow-hidden">
          <span className="absolute z-[100] right-3 top-3">
            <span
              className="w-5 h-5 p-1 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-white hover:cursor-pointer"
              onClick={onFavorite}
            >
              {favorite ? (
                <HeartFill className="text-primary-800" size={20} />
              ) : (
                <Heart className="text-primary-100" size={20} />
              )}
            </span>
          </span>
          <Image
            src={verifyImage(product.thumbnail ?? "")}
            alt={product.title}
            fill
          />
        </div>
      </Link>
      <div className="mt-2 flex items-start justify-between lg:gap-5 w-full md:max-w-[300px] ">
        <Link href={`/products/${product.handle}`}>
          <h4 className="text-2xs lg:text-sm font-medium text-primary-700">
            {product.title}
          </h4>
        </Link>
        <p className="text-right text-2xs lg:text-subtitle font-medium text-primary-700 flex flex-col items-end justify-between h-full">
          {product.price?.calculated_price}

          {/* <span className="rating ml-auto lg:hidden">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={`${
                  product.review.rate > index + 1
                    ? "text-primary-700"
                    : "text-primary-100"
                }`}
              >
                ★
              </span>
            ))}
          </span> */}
        </p>
      </div>
      <div className="hidden mt-1 lg:flex items-stretch text-review text-primary-700 font-medium">
        {/* <div className="rating mr-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`${
                product.review.rate > index + 1
                  ? "text-primary-700"
                  : "text-primary-100"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span>
          {product.review.rate} ({product.review.count} reviews)
        </span> */}
      </div>
    </div>
  )
}
export default ProductItem
