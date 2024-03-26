import { RadioGroup } from "@headlessui/react"
import clsx from "clsx"
import { useCart } from "medusa-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useStoreLocation } from "../store-location-search"
import Delivery from "./delivery"

export default function MapComponent() {
  const { storesList } = useStoreLocation()
  const [value, setValue] = useState(undefined)
  const { cart } = useCart()

  const [showdeliver, setShowdeliver] = useState(false)

  useEffect(() => {
    if (value) {
      setShowdeliver(true)
    }
  }, [value])

  return (
    <div className="mt-10 flex flex-col border-t border-b border-primary-700 divide-y divide-primary-700">
      <RadioGroup
        value={value}
        onChange={(value) => setValue(value)}
        className={clsx("max-h-[400px] overflow-y-auto overflow-x-visible px-5")}
      >
        {storesList.map((store) => {
          return (
            <RadioGroup.Option className="py-2" key={store.id} value={store}>
              {({ checked }) => (
                <div
                  className={clsx(
                    "p-2 rounded-md flex items-start gap-x-3 hover:cursor-pointer hover:bg-primary-100/50 relative transition duration-300",
                    checked
                      ? "bg-primary-100 hover:bg-primary-100"
                      : "bg-transparent"
                  )}
                >
                  <span
                    className={clsx(
                      "absolute bg-primary-50 left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center p-0.25"
                    )}
                  >
                    {checked && (
                      <span className="relative w-7 h-7">
                        <Image
                          src={"/assets/images/check.svg"}
                          alt="check"
                          fill
                        />
                      </span>
                    )}
                  </span>

                  <div className="ml-5 flex flex-col gap-y-2 lg:gap-y-2">
                    <h5 className="font-bold text-lg leading-normal lg:text-xl text-primary-700">
                      {store.name}
                    </h5>
                    <span className="text-black text-sm lg:text-subtitle">
                      {store.address.address_1}, {store.address.city},{" "}
                      {store.address.province} {store.address.postal_code},{" "}
                      {store.address.country_code.toUpperCase()}
                    </span>
                    <p className="text-sm lg:text-subtitle">
                      {store.distance.text}
                    </p>
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          )
        })}
      </RadioGroup>

      {showdeliver && cart && (
        <Delivery cart={cart} setCheckStore={setShowdeliver} store={value} />
      )}
    </div>
  )
}
