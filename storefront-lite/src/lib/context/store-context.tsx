"use client"

import { medusaClient } from "@lib/config"
import { handleError } from "@lib/util/handle-error"
import { Region, StoreCartsRes } from "@medusajs/medusa"
import { useMutation } from "@tanstack/react-query"
import {
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem,
} from "medusa-react"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useNotificationContext } from "./notification-context"

interface VariantInfoProps {
  variantId: string
  quantity: number
  personalMessage?: string
  lineImage?: string
  metadata?: any
}

interface LineInfoProps {
  lineId: string
  quantity: number
}

interface StoreContext {
  countryCode: string | undefined
  setRegion: (regionId: string, countryCode: string) => void
  addItem: (item: VariantInfoProps) => Promise<void>
  updateItem: (item: LineInfoProps) => void
  deleteItem: (lineId: string) => void
  resetCart: () => void
}

const StoreContext = React.createContext<StoreContext | null>(null)

export const useStore = () => {
  const context = React.useContext(StoreContext)
  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

interface StoreProps {
  children: React.ReactNode
}

const IS_SERVER = typeof window === "undefined"
const CART_KEY = "medusa_cart_id"
const REGION_KEY = "medusa_region"

export const StoreProvider = ({ children }: StoreProps) => {
  const { cart, setCart, createCart, updateCart } = useCart()
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined)
  const { timedOpen } = useNotificationContext()
  const addLineItem = useCreateLineItem(cart?.id!)
  const removeLineItem = useDeleteLineItem(cart?.id!)
  const adjustLineItem = useUpdateLineItem(cart?.id!)

  const updateLineCustom = useMutation<StoreCartsRes, Error, any>({
    mutationFn: async (payload: any) =>
      medusaClient.client.request(
        "POST",
        `/store/custom-cart/${cart?.id}/line-items`,
        payload
      ),
  })

  // check if the user is onboarding and sets the onboarding session storage
  const searchParams = useSearchParams()
  const onboardingCartId = searchParams.get("cart_id")
  const isOnboarding = searchParams.get("onboarding")

  useEffect(() => {
    if (isOnboarding === "true") {
      sessionStorage.setItem("onboarding", "true")
    }
  }, [isOnboarding])

  const storeRegion = (regionId: string, countryCode: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(
        REGION_KEY,
        JSON.stringify({ regionId, countryCode })
      )

      setCountryCode(countryCode)
    }
  }

  useEffect(() => {
    if (!IS_SERVER) {
      const storedRegion = localStorage.getItem(REGION_KEY)
      if (storedRegion) {
        const { countryCode } = JSON.parse(storedRegion)
        setCountryCode(countryCode)
      }
    }
  }, [])

  const getRegion = () => {
    if (!IS_SERVER) {
      const region = localStorage.getItem(REGION_KEY)
      if (region) {
        return JSON.parse(region) as { regionId: string; countryCode: string }
      }
    }
    return null
  }

  const setRegion = async (regionId: string, countryCode: string) => {
    await updateCart.mutateAsync(
      {
        region_id: regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          storeRegion(regionId, countryCode)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const ensureRegion = (region: Region, countryCode?: string | null) => {
    if (!IS_SERVER) {
      const { regionId, countryCode: defaultCountryCode } = getRegion() || {
        regionId: region.id,
        countryCode: region.countries[0].iso_2,
      }

      const finalCountryCode = countryCode || defaultCountryCode

      if (regionId !== region.id) {
        setRegion(region.id, finalCountryCode)
      }

      storeRegion(region.id, finalCountryCode)
      setCountryCode(finalCountryCode)
    }
  }

  const storeCart = (id: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(CART_KEY, id)
    }
  }

  const getCart = () => {
    if (!IS_SERVER) {
      return localStorage.getItem(CART_KEY)
    }
    return null
  }

  const deleteCart = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(CART_KEY)
    }
  }

  const deleteRegion = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(REGION_KEY)
    }
  }

  const createNewCart = async (regionId?: string) => {
    await createCart.mutateAsync(
      { region_id: regionId },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region, cart.shipping_address?.country_code)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const resetCart = () => {
    deleteCart()

    const savedRegion = getRegion()

    createCart.mutate(
      {
        region_id: savedRegion?.regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region, cart.shipping_address?.country_code)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  useEffect(() => {
    const ensureCart = async () => {
      const cartId = onboardingCartId || getCart()
      const region = getRegion()

      if (cartId) {
        const cartRes = await medusaClient.carts
          .retrieve(cartId)
          .then(({ cart }) => {
            return cart
          })
          .catch(async (_) => {
            return null
          })

        if (!cartRes || cartRes.completed_at) {
          deleteCart()
          deleteRegion()
          await createNewCart()
          return
        }

        setCart(cartRes)
        ensureRegion(cartRes.region)
      } else {
        await createNewCart(region?.regionId)
      }
    }

    if (!IS_SERVER && !cart?.id) {
      ensureCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addItem = async ({
    variantId,
    quantity,
    personalMessage = "",
    lineImage,
    metadata,
  }: VariantInfoProps) => {
    await addLineItem.mutateAsync(
      {
        variant_id: variantId,
        quantity: quantity,
        metadata,
      } as any,
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          timedOpen()
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )

    if (personalMessage.length || lineImage)
      updateLineCustom.mutate(
        {
          variant_id: variantId,
          quantity: quantity,
          personal_message: personalMessage,
          image: lineImage,
        } as any,
        {
          onSuccess: ({ cart }) => {
            setCart(cart)
            storeCart(cart.id)
            timedOpen()
          },
          onError: (error: Error) => {
            handleError(error)
          },
        }
      )
  }

  const deleteItem = (lineId: string) => {
    removeLineItem.mutate(
      {
        lineId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  const updateItem = ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    adjustLineItem.mutate(
      {
        lineId,
        quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  return (
    <StoreContext.Provider
      value={{
        countryCode,
        setRegion,
        addItem,
        deleteItem,
        updateItem,
        resetCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
