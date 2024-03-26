"use client"

import { Popover, Transition } from "@headlessui/react"
import { Cart } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import { formatAmount } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

const paymentMethods = [
  {
    name: "Visa",
    image: "/assets/images/visa.png",
  },
  {
    name: "Apple Pay",
    image: "/assets/images/apple-pay.png",
  },
  {
    name: "Google Pay",
    image: "/assets/images/gg-pay.png",
  },
  {
    name: "Union Pay",
    image: "/assets/images/union.png",
  },
  {
    name: "Master Card",
    image: "/assets/images/master.png",
  },
]

type SummaryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

export default function Summary({ cart }: SummaryProps) {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
    shipping_methods,
  } = cart

  const getAmount = (amount: number | null | undefined) => {
    if (amount === 0) return "FREE"

    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }

  const deliveryMethod = shipping_methods[0]?.shipping_option.name

  return (
    <>
      <div className="hidden lg:block w-full lg:w-2/5">
        <div className="border border-primary-100 rounded-[10px] overflow-hidden shadow-card divide-y divide-primary-100">
          <h4 className="text-center font-bold leading-[60px] text-primary-700 bg-primary-100 text-xl uppercase">
            Summary
          </h4>
          <div className="py-5 px-7 text-primary-700 flex justify-between uppercase font-semibold">
            <span>Subtotal</span>
            <span>{getAmount(subtotal)}</span>
          </div>
          {deliveryMethod && (
            <div className="py-5 px-7 text-primary-700 flex justify-between uppercase font-semibold">
              {/* {deliveryMethod === "pickup" ? (
              <>
                <span>COLLECT IN STORE</span>
                <span>FREE</span>{" "}
              </>
            ) : (
              <>
                <span>DELIVERY</span>
                <span>
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(995 / 100)}
                </span>{" "}
              </>
            )} */}
              <span className="uppercase">{deliveryMethod}</span>
              <span>{getAmount(shipping_total)}</span>
            </div>
          )}
          <div className="py-10 px-7 text-primary-700 flex justify-between uppercase font-bold">
            <span>TOTAL</span>
            <span>{getAmount(total)}</span>
          </div>
          <div className="p-7">
            <Link href="/checkout">
              <Button
                fill
                className="!bg-primary-700 w-full py-3 rounded-[10px] font-bold !text-base disabled:opacity-50"
                disabled={cart.shipping_methods.length === 0}
              >
                CHECKOUT SECURELY
              </Button>
            </Link>
            <div className="flex flex-col items-center justify-center mt-5">
              <span className="text-[13px] text-black font-medium">
                We accept the following payment methods.
              </span>
              <ul className="inline-flex items-center gap-x-3">
                {paymentMethods.map((method, index) => (
                  <li key={index} className="mt-2 relative">
                    <Image
                      src={method.image}
                      alt={method.name}
                      width={method.name === "Apple Pay" ? 30 : 40}
                      height={method.name === "Apple Pay" ? 20 : 40}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border border-primary-100 rounded-[10px] overflow-hidden shadow-card divide-y divide-primary-100 mt-5 ">
          <div className="p-7">
            <h4 className="uppercase text-primary-700 text-base font-semibold leading-normal">
              Add Discount/ Promo code
            </h4>
            <div className="mt-3 w-full flex items-stretch justify-stretch border border-black text-primary-700 rounded-[10px]">
              <input
                className="h-full flex-1 focus:outline-none focus:ring-0 bg-transparent text-subtitle font-medium text-black px-4 py-3 translate-y-0.5 placeholder:text-black "
                placeholder="Discount code?"
              />
              <Button className="h-full !rounded-[10px] uppercase text-subtitle py-3 font-semibold border-2 translate-x-[1px]">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Popover className="fixed z-[9999] inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
        <div className="relative z-[99999] border-t border-primary-100 bg-primary-100">
          <div className="mx-auto max-w-lg">
            <Popover.Button className="flex w-full items-stretch justify-between focus:outline-none focus:ring-0">
              <div className="flex-1 flex items-center py-6 text-primary-700 justify-between uppercase font-bold text-subtitle  px-4 sm:px-6">
                <span className="mr-auto">Total</span>
                <span className="mr-2">{getAmount(total)}</span>
                <ChevronDown
                  className="h-5 w-5 rotate-180"
                  aria-hidden="true"
                />
              </div>
              <Link
                href={"/checkout"}
                className={clsx("ml-auto", {
                  "pointer-events-none opacity-50":
                    cart.shipping_methods.length === 0,
                })}
              >
                <Button
                  className="ml-auto h-full uppercase rounded-none border-primary-800 disabled:opacity-50"
                  fill
                  disabled={cart.shipping_methods.length === 0}
                >
                  Checkout
                </Button>
              </Link>
            </Popover.Button>
          </div>
        </div>

        <Transition.Root as={Fragment}>
          <div>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Popover.Panel className="relative bg-white divide-y divide-primary-100">
                <div className="py-5 px-4 sm:px-6 text-primary-700 flex justify-between uppercase font-semibold">
                  <span>Subtotal</span>
                  <span>{getAmount(subtotal)}</span>
                </div>
                <div className="py-5 px-4 sm:px-6 text-primary-700 flex justify-between uppercase font-semibold">
                  <span>
                    {deliveryMethod === "delivery"
                      ? "Delivery"
                      : "Collect in store"}
                  </span>
                  <span>
                    {deliveryMethod === "delivery" ? "£9.95" : "FREE"}
                  </span>
                </div>
              </Popover.Panel>
            </Transition.Child>
          </div>
        </Transition.Root>
      </Popover>
    </>
  )
}
