import { useProductActions } from "@lib/context/product-context"
import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption, ProductOptionValue } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import Carousel, {
  useCarouselContext,
} from "@modules/common/components/carousel"
import ArrowRight from "@modules/common/icons/arrow-right"
import clsx from "clsx"
import { map, omit } from "lodash"
import Image from "next/image"
import { useMemo } from "react"
import { Variant } from "types/medusa"

export default function ProductOptions({
  product,
}: {
  product: PricedProduct
}) {
  const { updateOptions, options } = useProductActions()

  const productOptions = useMemo<Record<string, ProductOption>>(() => {
    if (!product.options) {
      return {}
    }

    return product.options.reduce(
      (acc, next) => ({
        ...acc,
        [next.title.toLowerCase()]: next,
      }),
      {}
    )
  }, [product])

  return (
    <>
      <div className="mt-5">
        <h4 className="text-black text-subtitle font-bold">Choose Sponge</h4>
        <SpongeOptions
          option={productOptions.sponge}
          options={options}
          updateOption={updateOptions}
        />
      </div>

      <div className="mt-4">
        <h4 className="text-black text-subtitle font-bold">Size & Servings</h4>
        <SizeOptions
          option={{
            ...productOptions["size & servings"],
            values: productOptions["size & servings"]?.values.map((val) => ({
              ...val,
              variant: product.variants.find(
                (v) => v.id === val.variant_id
              ) as unknown as Variant,
            })),
          }}
          options={options}
          updateOption={updateOptions}
        />
      </div>

      {map(omit(productOptions, ["sponge", "size & servings"]), (option) => {
        console.log(option)
        return (
          <div className="mt-4">
            <h4 className="text-black text-subtitle font-bold">
              {option.title}
            </h4>
            <OtherOptions
              option={option}
              options={options}
              updateOption={updateOptions}
            />
          </div>
        )
      })}
    </>
  )
}

function SpongeOptions({
  option,
  options,
  updateOption,
}: {
  option: ProductOption
  options: Record<string, string>
  updateOption: (option: Record<string, string>) => void
}) {
  const values = option?.values.map((v) => v.value).filter(onlyUnique) || []

  return (
    <div className="mt-2 flex items-center gap-2">
      {values.map((val) => (
        <Button
          key={val}
          onClick={() => updateOption({ [option.id]: val })}
          className={clsx(
            "text-black rounded-md text-subtitle font-medium !px-4.5 py-3",
            { "!bg-primary-800 text-white": options[option.id] === val }
          )}
        >
          {val}
        </Button>
      ))}
    </div>
  )
}

function SizeOptions({
  option,
  options,
  updateOption,
}: {
  option: Omit<ProductOption, "values"> & {
    values: Array<
      | Omit<ProductOptionValue, "variant"> & {
          variant: Omit<Variant, "beforeInsert">
        }
    >
  }
  options: Record<string, string>
  updateOption: (option: Record<string, string>) => void
}) {
  const values =
    option?.values?.filter(
      (val, idx, self) => self.findIndex((v) => v.value === val.value) === idx
    ) || []

  return (
    <div className="mt-2 flex items-center gap-2">
      <Carousel items={values.length}>
        <SizeChoosing
          onChoose={(value) => updateOption({ [option.id]: value })}
          sizes={values}
          selectedSize={options[option.id]}
        />
      </Carousel>
    </div>
  )
}

function SizeChoosing({
  onChoose,
  sizes,
  selectedSize,
}: {
  onChoose: (value: string) => void
  sizes: Array<
    | Omit<ProductOptionValue, "variant"> & {
        variant: Omit<Variant, "beforeInsert">
      }
  >
  selectedSize: string
}) {
  const { moveNext, movePrev, carousel, isDisabled } = useCarouselContext()

  return (
    <div className="relative w-full">
      <span
        className="hidden lg:block absolute -top-10 right-0 text-primary-700 font-medium hover:cursor-pointer"
        onClick={isDisabled("next") ? movePrev : moveNext}
      >
        {isDisabled("next") ? (
          <ArrowRight className="rotate-180" />
        ) : (
          <ArrowRight />
        )}
      </span>
      <div
        className="mt-4 relative w-full flex items-center gap-1 overflow-x-auto lg:overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 lg:gap-x-2 gap-x-1"
        ref={carousel}
      >
        {sizes.map((product, index) => {
          const size = product.value.split(" ")[0]
          const serve = product.value.split(" ").slice(1).join(" ")
          return (
            <div
              className={clsx(
                "shrink-0 w-[81px] h-auto aspect-[81/90] snap-start p-1 border border-black rounded-md hover:cursor-pointer",
                selectedSize === product.value
                  ? "bg-primary-800 text-white"
                  : "text-black bg-white"
              )}
              key={index}
              onClick={() => onChoose(product.value)}
            >
              <div className="flex flex-col items-center">
                <h1 className="font-bold">{size}</h1>
                <span className="text-[8px] font-semibold">{serve}</span>

                <span className="relative mt-1.5 w-6 h-6 aspect-square">
                  <Image
                    src={
                      selectedSize === product.value
                        ? "/assets/images/cake/cake-white.png"
                        : "/assets/images/cake/cake-icon.png"
                    }
                    alt="cake"
                    fill
                  />
                </span>

                <span
                  className={clsx(
                    "mt-3 capitalize text-[8px] font-bold",
                    selectedSize === product.value
                      ? "text-white"
                      : "text-zinc-500 "
                  )}
                >
                  {(product.variant as any)?.shape}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function OtherOptions({
  option,
  options,
  updateOption,
}: {
  option: ProductOption
  options: Record<string, string>
  updateOption: (option: Record<string, string>) => void
}) {
  const values = option?.values.map((v) => v.value).filter(onlyUnique) || []

  return (
    <div className="mt-2 flex items-center gap-2">
      {values.map((val) => (
        <Button
          key={val}
          onClick={() => updateOption({ [option.id]: val })}
          className={clsx(
            "text-black rounded-md text-subtitle font-medium !px-4.5 py-3",
            { "!bg-primary-800 text-white": options[option.id] === val }
          )}
        >
          {val}
        </Button>
      ))}
    </div>
  )
}
