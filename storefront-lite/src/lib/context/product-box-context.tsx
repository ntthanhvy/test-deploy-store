"use client"

import { canBuy } from "@lib/util/can-buy"
import { findCheapestPrice } from "@lib/util/prices"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { ProductVariant } from "@medusajs/product"
import isEqual from "lodash/isEqual"
import { formatVariantPrice, useCart } from "medusa-react"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { FormImage } from "types/global"
import { Variant } from "types/medusa"
import { useStore } from "./store-context"

interface ProductBoxContext {
  formattedPrice: string
  quantity: number
  disabled: boolean
  inStock: boolean
  variant?: Variant
  maxQuantityMet: boolean
  options: Record<string, string>
  updateOptions: (options: Record<string, string>) => void
  increaseQuantity: () => void
  decreaseQuantity: () => void
  addToCart: () => void
}

const ProductActionContext = createContext<ProductBoxContext | null>(null)

interface ProductBoxProviderProps {
  children?: React.ReactNode
  product: PricedProduct
}

type VariantFormProps = {
  variants: Array<
    ProductVariant & {
      variant_id: string
      quantity: number
      selected: boolean
    }
  >
  boxType: number
  boxQuantity: number
}

export const ProductBoxProvider = ({
  product,
  children,
}: ProductBoxProviderProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [lineImage, setLineImage] = useState<FormImage>()
  const [personalMessage, setPersonalMessage] = useState<string>()

  const [options, setOptions] = useState<Record<string, string>>({})
  const [maxQuantityMet, setMaxQuantityMet] = useState<boolean>(false)
  const [inStock, setInStock] = useState<boolean>(true)

  const { addItem } = useStore()
  const { cart } = useCart()
  const variants = product.variants as unknown as Variant[]

  useEffect(() => {
    // initialize the option state
    const optionObj: Record<string, string> = {}
    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }
    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      const tmp: Record<string, string> = {}

      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }

      map[variant.id] = tmp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  const disabled = useMemo(() => {
    return !variant
  }, [variant])

  // memoized function to get the price of the current variant
  const formattedPrice = useMemo(() => {
    if (variant && cart?.region) {
      return formatVariantPrice({ variant, region: cart.region })
    } else if (cart?.region) {
      return findCheapestPrice(variants, cart.region)
    } else {
      // if no variant is selected, or we couldn't find a price for the region/currency
      return "N/A"
    }
  }, [variant, variants, cart])

  useEffect(() => {
    if (variant) {
      setInStock(canBuy(variant))
    }
  }, [variant])

  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  const form = useForm<VariantFormProps>({
    defaultValues: {
      variants: product.variants.map((variant) => ({
        ...variant,
        variant_id: variant.id,
        quantity: 0,
        selected: false,
      })),
      boxType: 6,
      boxQuantity: 1,
    },
  })
  const { watch } = form

  const [boxQuantity, boxVariants, boxType] = watch([
    "boxQuantity",
    "variants",
    "boxType",
  ])

  const addToCart = () => {
    // console.log(variant)

    const selected = boxVariants.filter((v) => v.quantity > 0)

    const totalQuantity = selected.reduce((acc, v) => acc + v.quantity, 0)

    if (totalQuantity % boxType !== 0) return

    const boxQuantity = totalQuantity / boxType

    const boxId = `box_${new Date().getTime()}`
    for (let variant of selected) {
      // console.log(variant)
      addItem({
        variantId: variant.variant_id,
        quantity: variant.quantity * (boxQuantity || 1),
        metadata: {
          boxId,
          boxType,
          boxQuantity,
        },
      })
    }

    form.reset()
  }

  const increaseQuantity = () => {
    const maxQuantity = variant?.inventory_quantity || 0

    if (maxQuantity > quantity + 1) {
      setQuantity(quantity + 1)
    } else {
      setMaxQuantityMet(true)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)

      if (maxQuantityMet) {
        setMaxQuantityMet(false)
      }
    }
  }

  return (
    <FormProvider {...form}>
      <ProductActionContext.Provider
        value={{
          quantity,
          maxQuantityMet,
          disabled,
          inStock,
          options,
          variant,
          addToCart,
          updateOptions,
          decreaseQuantity,
          increaseQuantity,
          formattedPrice,
        }}
      >
        {children}
      </ProductActionContext.Provider>
    </FormProvider>
  )
}

export const useProductBoxActions = () => {
  const context = useContext(ProductActionContext)
  const formContext = useFormContext()
  if (context === null) {
    throw new Error(
      "useProductActionContext must be used within a ProductActionProvider"
    )
  }
  return { ...context, ...formContext }
}
