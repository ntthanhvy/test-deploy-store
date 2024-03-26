"use client"

import { Transition } from "@headlessui/react"
import { useNotificationContext } from "@lib/context/notification-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { verifyImage } from "@lib/verify-image"
import LineItemPrice from "@modules/common/components/line-item-price"
import { sortBy } from "lodash"
import { formatAmount, useCart } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useMemo } from "react"
import { createPortal } from "react-dom"

export default function Notification() {
  const { state, open, close } = useNotificationContext()

  const { cart } = useCart()
  const items = useEnrichedLineItems()

  const lastItem = useMemo(() => {
    const item = sortBy(items, "updated_at").reverse()[0]

    if (item?.metadata.boxId) {
      return {
        ...item,
        isBox: true,
        title: "Brownie Box",
        thumbnail: item.variant.product.thumbnail,
        quantity: item.metadata.boxQuantity as number,
      }
    }

    return item
  }, [items])

  // if (!document) return null
  const body = useMemo(() => document.body, [])

  return createPortal(
    <Transition appear show={state} as={Fragment}>
      <div className="fixed top-0 right-0 z-[999]">
        <div className="flex items-start justify-end pt-10 pr-10 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex flex-col bg-white w-[calc(100vw-40px)]  md:w-[451px] rounded-default shadow-2xl overflow-hidden">
              <div className="p-4 flex flex-col items-start justify-start divide-y divide-[#EAE8E8] gap-2">
                <h3 className="text-[15px] font-semibold text-black text-left">
                  Added to Basket!
                </h3>

                <div className="w-full flex flex-col items-stretch justify-stretch gap-y-4 pt-2">
                  {cart && lastItem ? (
                    <div className="flex gap-x-3 items-stretch">
                      <div className="relative rounded-default overflow-hidden">
                        <Image
                          src={verifyImage(lastItem.thumbnail ?? "")}
                          alt="new-basket-lastItem"
                          width={92}
                          height={94}
                        />
                      </div>

                      <div className="flex flex-col flex-1 h-[94px] ">
                        <h4 className="text-black text-subtitle font-bold inline-flex justify-between w-full">
                          {lastItem.title}

                          <span className="text-primary-800 ml-auto ">
                            {(lastItem as any).isBox ? (
                              null
                            ) : (
                              <LineItemPrice
                                region={cart.region}
                                item={lastItem as any}
                                style="tight"
                              />
                            )}
                          </span>
                        </h4>

                        <p className="text-left text-black text-subtitle">
                          {!(lastItem as any).isBox && lastItem.variant.options?.length > 1
                            ? lastItem.variant.options.map((option, index) => (
                                <span key={index}>
                                  {option.value}
                                  {index < lastItem.variant.options.length - 1
                                    ? " | "
                                    : null}
                                </span>
                              ))
                            : null}
                        </p>

                        <div className="flex w-full justify-between items-center mt-auto">
                          <span className="text-black text-subtitle">
                            Qty {lastItem.quantity}
                          </span>

                          <Link
                            className="text-sm font-bold text-primary-800 "
                            href={"/checkout"}
                          >
                            View Basket
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>,
    body
  )
}
