"use client"

import Carousel, {
  useCarouselContext,
} from "@modules/common/components/carousel"
import ProductItem from "@modules/common/components/product-item"
import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"

export default function FeatureList({ baseFeatures }: { baseFeatures: any[] }) {
  return (
    <div className="w-full flex justify-center lg:justify-start items-center relative gap-x-7 transition-all duration-500 ">
      <Carousel items={baseFeatures.length}>
        <FeatureDetail features={baseFeatures} />
      </Carousel>
    </div>
  )
}

function FeatureDetail({ features }: { features: any[] }) {
  const { moveNext, movePrev, isDisabled, carousel } = useCarouselContext()

  return (
    <>
      <div className="absolute right-0 -top-14">
        <div className="hidden md:flex items-center gap-3">
          <button
            className={clsx(
              "rounded-full w-10 h-10 flex items-center justify-center text-white transition-all duration-300 bg-primary-800 hover:cursor-pointer disabled:bg-primary-100 disabled:hover:cursor-default"
            )}
            onClick={movePrev}
            disabled={isDisabled("prev")}
          >
            <ChevronDown className="rotate-90" size={30} />
          </button>
          <button
            className={clsx(
              "rounded-full w-10 h-10 flex items-center justify-center text-white transition-all duration-300 bg-primary-800 hover:cursor-pointer disabled:bg-primary-100 disabled:hover:cursor-default"
            )}
            onClick={moveNext}
            disabled={isDisabled("next")}
          >
            <ChevronDown className="-rotate-90" size={30} />
          </button>
        </div>
      </div>

      <div
        className="mt-4 relative w-full flex items-center gap-1 overflow-x-auto md:overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 lg:gap-x-6 gap-x-3.5"
        ref={carousel}
      >
        {features.map((item, index) => (
          <ProductItem key={index} product={item} />
        ))}
        {/* {features.map((item, index) => (
          <ProductItem key={index} product={item} />
        ))} */}

        {/* <div className="mt-2 md:mt-5 min-w-full flex-none grid grid-cols-5 gap-x-3.5 lg:gap-x-7 gap-y-10 transition-all duration-500">
          {features.map((item, index) => (
            <div
              className="relative flex flex-col w-[124px] md:max-w-[300px] lg:w-[248px] "
              key={index}
            >
              <div className="relative flex items-center justify-center w-[124px] lg:w-[248px] lg:h-[265px] aspect-[248/265]">
                <span className="absolute z-[100] right-3 top-3">
                  <span
                    className="w-5 h-5 p-1 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-white hover:cursor-pointer"
                    onClick={setFavorite(index)}
                  >
                    {item.favorite ? (
                      <HeartFill className="text-primary-800" size={20} />
                    ) : (
                      <Heart className="text-primary-100" size={20} />
                    )}
                  </span>
                </span>
                <Image src={item.image} alt={item.name} fill />
              </div>
              <div className="mt-2 flex items-start justify-between lg:gap-14 w-full md:max-w-[300px] ">
                <h4 className="text-2xs lg:text-sm font-medium text-primary-700">
                  {item.name}
                </h4>
                <p className="text-right text-2xs lg:text-subtitle font-medium text-primary-700 flex flex-col items-end justify-between h-full">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: item.currency,
                  }).format(item.price / 100)}

                  <span className="rating ml-auto lg:hidden">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`${
                          item.rating > index + 1
                            ? "text-primary-700"
                            : "text-primary-100"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                </p>
              </div>
              <div className="hidden mt-1 lg:flex items-stretch text-review text-primary-700 font-medium">
                <div className="rating mr-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`${
                        item.rating > index + 1
                          ? "text-primary-700"
                          : "text-primary-100"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span>
                  {item.rating} ({item.reviews} reviews)
                </span>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  )
}
