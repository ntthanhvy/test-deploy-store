"use client"

import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image"
import Link from "next/link"
import {
  Fragment,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

export type Basket = {
  id: number
  quantity: number
  name: string
  variant: {
    id: number
    price: number
    image: string
    slug: string
    options: {
      size: number
      serves: number
    }
  }
}

const BasketContext = createContext<null | {
  baskets: Basket[]
  deliveryMethod: "pickup" | "delivery"

  addBasket: (basket: Basket) => void
  deleteBasket: (id: number) => void
  setDeliveryMethod: (method: "pickup" | "delivery") => void
}>(null)

export const useMockBasket = () => {
  let context = useContext(BasketContext)

  if (!context) {
    throw new Error("useMockBasket must be used within a BasketProvider")
  }

  return context
}

export default function BasketProvider({ children }: PropsWithChildren<{}>) {
  const [baskets, setBaskets] = useState<Basket[]>([])
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  )

  const [showNoti, setShowNoti] = useState(false)

  const onAddBasket = (basket: Basket) => {
    setBaskets((prev) => [...prev, basket])
    setShowNoti(true)
  }

  useEffect(() => {
    let t = setTimeout(() => {
      setShowNoti(false)
    }, 3000)

    return () => {
      clearTimeout(t)
    }
  }, [showNoti])

  const onDeleteBasket = (id: number) => {
    setBaskets((prev) => prev.filter((basket) => basket.id !== id))
  }

  return (
    <BasketContext.Provider
      value={{
        baskets,
        deliveryMethod,
        addBasket: onAddBasket,
        deleteBasket: onDeleteBasket,
        setDeliveryMethod,
      }}
    >
      {children}
      {showNoti && (
        <Notification
          show={showNoti}
          onClose={() => setShowNoti(false)}
          item={baskets.slice(-1)[0]}
        />
      )}
    </BasketContext.Provider>
  )
}

function Notification({
  show,
  onClose,
  item,
}: {
  show: boolean
  onClose: () => void
  item?: Basket
}) {
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}

      {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <div className="fixed inset-0 overflow-y-auto top-[98px] right-[28px] ">
            <div className="flex min-h-full items-start justify-end text-center p-5 md:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-default bg-white text-left align-middle shadow-xl transition-all divide-y divide-zinc-300 px-5 py-3">
                  <Dialog.Title
                    as="h3"
                    className="text-subtitle font-semibold text-primary-800 leading-3"
                  >
                    Added to Basket!
                  </Dialog.Title>
                  <div className="mt-2 py-3">
                    {item && (
                      <div className="flex gap-x-3 items-stretch">
                        <div className="relative rounded-default overflow-hidden">
                          <Image
                            src={item.variant.image}
                            alt="new-basket-item"
                            width={92}
                            height={94}
                          />
                        </div>

                        <div className="flex flex-col flex-1 h-[94px] ">
                          <h4 className="text-black text-subtitle font-bold inline-flex justify-between w-full">
                            {item.name}

                            <span className="text-primary-800 ml-auto ">
                              {new Intl.NumberFormat("en-GB", {
                                style: "currency",
                                currency: "GBP",
                              }).format(item.variant.price / 100)}
                            </span>
                          </h4>

                          <p className="text-black text-subtitle">
                            {item.variant.options.size}
                            {'"'} serves {item.variant.options.serves}
                          </p>

                          <div className="flex w-full justify-between items-center mt-auto">
                            <span className="text-black text-subtitle">
                              Qty {item.quantity}
                            </span>

                            <Link
                              className="text-sm font-bold text-primary-800 "
                              href={"/basket"}
                            >
                              View Basket
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
