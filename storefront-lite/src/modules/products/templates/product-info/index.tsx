"use client"

import { Disclosure, Transition } from "@headlessui/react"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ChevronDown from "@modules/common/icons/chevron-down"
import ProductActions from "@modules/products/components/product-actions"
import clsx from "clsx"

type Props = {
  product: PricedProduct
}

export default function ProductInfo({ product }: Props) {
  return (
    <>
      {/* description */}
      <ProductActions product={product} />

      <div className="mx-5 lg:max-w-7xl lg:mx-auto mb-20 flex flex-col items-center">
        <Disclosure as="div" className={"w-full"}>
          {({ open }) => (
            <>
              <Disclosure.Button className={"w-full"}>
                <div className="border-b border-primary-700 text-black text-base lg:text-lg font-bold text-left py-4 w-full inline-flex justify-between items-center">
                  Description
                  <ChevronDown
                    className={clsx("transition duration-300", {
                      "rotate-180": open,
                    })}
                    size="25"
                  />
                </div>
              </Disclosure.Button>
              <Transition
                show={open}
                className="transition-all duration-500 overflow-hidden origin-top"
                enterFrom="transform scale-y-95 opacity-0 max-h-0"
                enterTo="transform scale-100 opacity-100 max-h-96"
                leaveFrom="transform scale-100 opacity-100 max-h-96"
                leaveTo="transform scale-y-95 opacity-0 max-h-0"
              >
                <Disclosure.Panel className={"transition duration-300 py-5"}>
                  <p className="text-black font-normal text-sm lg:text-base lg:leading-[30px]">
                    {product.description}
                  </p>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className={"w-full"}>
          {({ open }) => (
            <>
              <Disclosure.Button className={"w-full"}>
                <div className="border-b border-primary-700 text-black text-base lg:text-lg font-bold text-left py-4 w-full inline-flex justify-between items-center">
                  Ingredients & Allergy Advice
                  <ChevronDown
                    className={clsx("transition duration-300", {
                      "rotate-180": open,
                    })}
                    size="25"
                  />
                </div>
              </Disclosure.Button>
              <Transition
                show={open}
                className="transition-all duration-500 overflow-hidden origin-top"
                enterFrom="transform scale-y-95 opacity-0 max-h-0"
                enterTo="transform scale-100 opacity-100 max-h-96"
                leaveFrom="transform scale-100 opacity-100 max-h-96"
                leaveTo="transform scale-y-95 opacity-0 max-h-0"
              >
                <Disclosure.Panel className={"transition duration-300 py-5"}>
                  <p className="text-black font-normal text-sm lg:text-base lg:leading-[30px]">
                    {product.description}
                  </p>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className={"w-full"}>
          {({ open }) => (
            <>
              <Disclosure.Button className={"w-full"}>
                <div className="border-b border-primary-700 text-black text-base lg:text-lg font-bold text-left py-4 w-full inline-flex justify-between items-center">
                  Nutritional Information
                  <ChevronDown
                    className={clsx("transition duration-300", {
                      "rotate-180": open,
                    })}
                    size="25"
                  />
                </div>
              </Disclosure.Button>
              <Transition
                show={open}
                className="transition-all duration-500 overflow-hidden origin-top"
                enterFrom="transform scale-y-95 opacity-0 max-h-0"
                enterTo="transform scale-100 opacity-100 max-h-96"
                leaveFrom="transform scale-100 opacity-100 max-h-96"
                leaveTo="transform scale-y-95 opacity-0 max-h-0"
              >
                <Disclosure.Panel className={"transition duration-300 py-5"}>
                  <p className="text-black font-normal text-sm lg:text-base lg:leading-[30px]">
                    {product.description}
                  </p>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className={"w-full"}>
          {({ open }) => (
            <>
              <Disclosure.Button className={"w-full"}>
                <div className="border-b border-primary-700 text-black text-base lg:text-lg font-bold text-left py-4 w-full inline-flex justify-between items-center">
                  Reviews
                  <ChevronDown
                    className={clsx("transition duration-300", {
                      "rotate-180": open,
                    })}
                    size="25"
                  />
                </div>
              </Disclosure.Button>
              <Transition
                show={open}
                className="transition-all duration-500 overflow-hidden origin-top"
                enterFrom="transform scale-y-95 opacity-0 max-h-0"
                enterTo="transform scale-100 opacity-100 max-h-96"
                leaveFrom="transform scale-100 opacity-100 max-h-96"
                leaveTo="transform scale-y-95 opacity-0 max-h-0"
              >
                <Disclosure.Panel className={"transition duration-300 py-5"}>
                  <p className="text-black font-normal text-sm lg:text-base lg:leading-[30px]">
                    {product.description}
                  </p>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}
