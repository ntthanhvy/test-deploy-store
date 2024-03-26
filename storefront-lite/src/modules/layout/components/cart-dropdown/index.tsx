"use client"

import { Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { verifyImage } from "@lib/verify-image"
import Button from "@modules/common/components/button"
import LineItemPrice from "@modules/common/components/line-item-price"
import { groupBy } from "lodash"
import { formatAmount, useCart } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useEffect, useMemo, useRef } from "react"

export default function CartDropdown() {
  const { state, open, close } = useCartDropdown()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggle = () => {
    state ? close() : open()
  }

  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()

  const boxItems = useMemo(() => {
    if (!items) return []

    const boxItems = items.filter((item) => item.metadata.boxId)

    const boxes = groupBy(boxItems, (item) => item.metadata.boxId)

    return Object.entries(boxes).map(([boxId, items]) => {
      const product = items[0].variant.product as {
        title: string
        thumbnail: string
      }
      const metadata = items[0].metadata as {
        boxQuantity: number
        boxType: number
      }

      return {
        ...product,
        ...metadata,
        boxId,
        items,
        total: items.reduce(
          (acc, item) => acc + item.quantity * item.unit_price,
          0
        ),
      }
    })
  }, [items])

  const normalItems = useMemo(() => {
    return items?.filter((item) => !item.metadata.boxId) || []
  }, [items])

  const removeBox = (boxId: string) => () => {
    if (!items) return

    const boxItems = items.filter((item) => item.metadata.boxId === boxId)

    boxItems.forEach((item) => {
      deleteItem(item.id)
    })
  }

  return (
    <div className="h-full z-[50]" ref={ref}>
      <Popover className="relative h-full">
        <Popover.Button
          className="h-full flex items-center justify-center relative"
          onClick={toggle}
        >
          <span className=" relative ">
            <Image
              alt="basket"
              src="/assets/images/basket.svg"
              width={32}
              height={22}
            />
          </span>
          {totalItems > 0 && (
            <span className="absolute -left-0 top-0 translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center font-medium bg-primary-700  text-primary-50">
              {totalItems}
            </span>
          )}
        </Popover.Button>
        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="absolute top-[calc(100%+1px)] -right-10 md:right-0 bg-white w-[calc(100vw-40px)]  md:w-[451px] rounded-default shadow-2xl overflow-hidden z-[999]"
          >
            <div className="flex flex-col">
              <div className="p-4 flex flex-col items-start justify-start">
                <h3 className="text-[19px] font-semibold text-black text-left">
                  Your Basket
                </h3>

                <div className="mt-4 w-full flex flex-col items-stretch justify-stretch gap-y-4">
                  {totalItems === 0 ? (
                    <>
                      <div className="font-medium text-center text-black text-subtitle">
                        Your basket is empty
                      </div>
                    </>
                  ) : cart && items?.length ? (
                    <>
                      {boxItems.map((box, index) => (
                        <div className="flex gap-x-3 items-stretch" key={index}>
                          <div className="relative rounded-default overflow-hidden">
                            <Image
                              src={verifyImage(box.thumbnail ?? "")}
                              alt="new-box-item"
                              width={92}
                              height={94}
                            />
                          </div>

                          <div className="flex flex-col flex-1 h-[94px] ">
                            <h4 className="text-black text-subtitle font-bold inline-flex justify-between w-full">
                              <span>Brownie Box - box of {box.boxType}</span>

                              <span className="text-primary-800 ml-auto ">
                                {formatAmount({
                                  amount: box.total,
                                  region: cart.region,
                                })}
                              </span>
                            </h4>

                            <div className="flex w-full justify-between items-center mt-auto">
                              <span className="text-black text-subtitle">
                                Qty {box.boxQuantity}
                              </span>

                              <button
                                className="text-sm font-bold text-primary-800 "
                                onClick={removeBox(box.boxId)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {normalItems.map((item, index) => (
                        <div className="flex gap-x-3 items-stretch" key={index}>
                          <div className="relative rounded-default overflow-hidden">
                            <Image
                              src={verifyImage(item.thumbnail ?? "")}
                              alt="new-basket-item"
                              width={92}
                              height={94}
                            />
                          </div>

                          <div className="flex flex-col flex-1 h-[94px] ">
                            <h4 className="text-black text-subtitle font-bold inline-flex justify-between w-full">
                              {item.title}

                              <span className="text-primary-800 ml-auto ">
                                <LineItemPrice
                                  region={cart.region}
                                  item={item}
                                  style="tight"
                                />
                              </span>
                            </h4>

                            <p className="text-black text-subtitle">
                              {item.variant.options[0]?.value}
                              {item.variant.options.length > 1 && (
                                <>
                                  {'"'} serves {item.variant.options[1]?.value}
                                </>
                              )}
                            </p>

                            <div className="flex w-full justify-between items-center mt-auto">
                              <span className="text-black text-subtitle">
                                Qty {item.quantity}
                              </span>

                              <button
                                className="text-sm font-bold text-primary-800 "
                                onClick={() => deleteItem(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>

              <div className="p-4 bg-[#F5F5F5] ">
                <div className="flex justify-between text-black font-semibold ">
                  <h3>Sub Total</h3>
                  {cart && cart.region && (
                    <span>
                      {formatAmount({
                        amount: cart.subtotal || 0,
                        region: cart.region,
                        includeTaxes: false,
                      })}
                    </span>
                  )}
                </div>

                <div className="mt-4 w-full flex items-center justify-between gap-x-4">
                  <Button className="text-base font-bold py-2" onClick={close}>
                    Continue Shopping
                  </Button>
                  <Link href="/checkout">
                    <Button className="text-base font-bold px-12 py-2" fill>
                      Go To Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
