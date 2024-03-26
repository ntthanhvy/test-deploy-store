"use client"

import Carousel, {
  useCarouselContext,
} from "@modules/common/components/carousel"
import ProductItem from "@modules/common/components/product-item"
import ChevronDown from "@modules/common/icons/chevron-down"
import { ProductPreviewType } from "types/global"

type Props = {
  products: Array<ProductPreviewType>
}

function Recommendations({ products }: Props) {
  return (
    <div className="relative bg-primary-75">
      <div className="bg-policy-pattern h-[74px] lg:h-[150px] bg-bottom bg-cover lg:bg-curve bg-no-repeat relative">
        <div className="hidden lg:block absolute inset-x-0 h-[calc(25%+7px)] bg-primary-50"></div>
      </div>

      <div className="xl:max-w-grid xl:mx-auto xl:px-5 lg:mx-7 mx-5 flex lg:px-5 justify-center items-center">
        <div className="w-full flex flex-col items-start mt-3 lg:mt-4">
          <h1 className="text-3xl lg:text-5xl lg:text-[40px] font-bold text-primary-900">
            Sweet Collection Continues...
          </h1>

          <Carousel items={2}>
            <ProductList products={products} />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
export default Recommendations

function ProductList({ products }: Props) {
  const { moveNext, movePrev, isDisabled, carousel } = useCarouselContext()

  return (
    <div className="relative w-full">
      <div className="hidden md:block absolute -top-10 right-0">
        <div className="flex items-center gap-x-2">
          <button
            className="rounded-full w-10 h-10 bg-primary-700 disabled:bg-zinc-300 text-white flex items-center justify-center"
            disabled={isDisabled("prev")}
            onClick={movePrev}
          >
            <ChevronDown className="rotate-90" size="30" />
          </button>
          <button
            className="rounded-full w-10 h-10 bg-primary-700 disabled:bg-zinc-300 text-white flex items-center justify-center"
            disabled={isDisabled("next")}
            onClick={moveNext}
          >
            <ChevronDown className="-rotate-90" size="30" />
          </button>
        </div>
      </div>

      <div
        className="mt-4 relative w-full flex items-center justify-stretch gap-1 overflow-x-auto lg:overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 lg:gap-x-6 gap-x-3.5"
        ref={carousel}
      >
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  )
}
