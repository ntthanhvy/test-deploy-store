"use client"

import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { verifyImage } from "@lib/verify-image"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import ProductOptions from "../product-option"
import VariantImageUpload from "../upload-image"

type Props = {
  product: PricedProduct
}

export default function ProductActions({ product }: Props) {
  const {
    updateOptions,
    addToCart,
    options,
    inStock,
    variant,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    personalMessage,
    setPersonalMessage,
    lineImage,
    setLineImage,
  } = useProductActions()

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const [featuredImage, setFeaturedImage] = useState(product.images?.[0])

  // const [checkStore, setCheckStore] = useState(false)

  // const onCheckStore = (postalCode: string) => {
  //   setCheckStore(true)
  // }

  // useEffect(() => {
  //   if (variant?.image_upload) console.log(variant)
  // }, [variant])

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

  return (
    <section id="product-action" className="bg-primary-50 relative">
      <div className="lg:max-w-7xl mx-auto py-10 lg:py-20 px-5 lg:px-0">
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

        <div className="mt-5 w-full flex flex-col lg:flex-row items-start">
          {/* images */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="relative w-full h-auto aspect-square overflow-hidden rounded-default">
              <Image
                alt="featureImage"
                fill
                src={verifyImage(featuredImage?.url || "")}
              />
            </div>

            <div className="flex items-center gap-x-2 mt-5">
              {(product.images || [])
                .filter((i) => i !== featuredImage)
                .map((image, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 aspect-square overflow-hidden rounded-default cursor-pointer"
                    onClick={() => setFeaturedImage(image)}
                  >
                    <Image
                      alt="featureImage"
                      fill
                      src={verifyImage(image.url)}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* infos */}
          <div className="w-full lg:shrink lg:w-1/2 flex-1 lg:pl-12 py-10 lg:py-0">
            <div className="w-full">
              <h1 className="font-bold text-5xl lg:text-[70px] lg:leading-[60px] text-primary-700 ">
                {product.title}
              </h1>
              <p className="text-black text-[13px] font-medium mt-3">
                Product Code: {variant?.nutritic_code}
              </p>
              <div className="inline-flex gap-x-1 items-center">
                {/* {Array.from({ length: 5 }).map((_, index) => (
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
                <span className="ml-2 text-black text-[13px] font-medium ">
                  ({product.review.count})
                </span> */}
              </div>
            </div>

            <div className="mt-4 lg:mt-6">
              <p className="uppercase font-medium text-primary-700 leading-normal text-sm lg:text-base">
                {product.subtitle ||
                  `fresh, mango fruit fusion cake, available in all sizes with free
                personalisation the perfectcake for any occasion`}
              </p>
            </div>

            <div className="mt-5 lg:mt-10 flex items-baseline">
              <p className="text-black text-base font-bold">From</p>
              <span className="text-black text-3xl font-bold ml-2">
                {selectedPrice?.calculated_price}
              </span>
            </div>

            {product.variants.length > 1 && (
              <ProductOptions product={product} />
            )}

            {/* <div className="mt-4">
              <h4 className="font-bold text-black text-subtitle">
                Size & Serving
              </h4>

              <div className="mt-2">
                <Carousel items={sizeAndServes.length}>
                  <SizeChoosing
                    onChoose={onChooseSize}
                    sizes={sizeAndServes}
                    selectedSize={size}
                  />
                </Carousel>
              </div>
            </div> */}

            {(product as any).personalized_message && (
              <div className="mt-9 w-full">
                <h4 className="text-black text-subtitle font-bold">
                  Personalised Message On Cake
                </h4>

                <div className="mt-2 w-full">
                  <input
                    className="bg-white w-full border border-black rounded-md px-3 py-3 bg-transparent text-black"
                    maxLength={variant?.character_limit ?? 25}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                  />
                  <p className="italic text-black text-xs font-medium mt-1.5 leading-2">
                    You can if you want add a personalised message. This can be{" "}
                    {variant?.character_limit ?? 25} characters long including
                    spaces.
                  </p>
                </div>
              </div>
            )}

            {variant && variant.image_upload ? <VariantImageUpload /> : null}

            {/* delivery method */}
            {/* <StoreLocationProvider>
              <div className="mt-8 w-full">
                <h4 className="text-black text-subtitle font-bold">
                  Check store
                </h4>

                <p className=" text-black text-subtitle font-medium">
                  Check stock to see your delivery and collection options:
                </p>

                <div className="mt-1 w-full border border-black rounded-md overflow-hidden flex items-center">
                
                  <SearchPlace />

                  <Button
                    className="uppercase !rounded ml-auto border-2 text-sm py-3 "
                    // onClick={() => onCheckStore("")}
                  >
                    Check
                  </Button>
                </div>

              </div>

              <StoreList />
            </StoreLocationProvider> */}

            <div className="mt-9 w-full">
              <div className="flex items-center gap-x-5">
                <div className="border border-black rounded-full p-1.5 flex items-center justify-between">
                  <button
                    className={clsx(
                      "rounded-full w-7 h-7 bg-primary-800 text-white flex items-center justify-center font-bold text-lg hover:cursor-pointer disabled:bg-zinc-300 disabled:text-black disabled:pointer-events-none"
                    )}
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                  >
                    -
                  </button>

                  <span className="px-5 font-bold">{quantity}</span>

                  <span
                    className="rounded-full w-7 h-7 bg-primary-800 text-white flex items-center justify-center font-bold text-lg hover:cursor-pointer  disabled:bg-zinc-300 disabled:text-black disabled:pointer-events-auto"
                    onClick={increaseQuantity}
                  >
                    +
                  </span>
                </div>

                <Button
                  onClick={addToCart}
                  className="w-full bg-primary-700 !text-white uppercase !px-10 py-3 !rounded-md"
                  disabled={!variant || !inStock}
                >
                  Add to Basket
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
