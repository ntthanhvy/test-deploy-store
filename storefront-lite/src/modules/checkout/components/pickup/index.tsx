import { medusaClient } from "@lib/config"
import { HQ_STORE_CODE } from "@lib/constants"
import { CheckoutFormValues, useCheckout } from "@lib/context/checkout-context"
import Button from "@modules/common/components/button"
import ConnectForm from "@modules/common/components/connect-form"
import { useQuery } from "@tanstack/react-query"
import { isEmpty } from "lodash"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Controller } from "react-hook-form"
import { StoreLocation } from "types/medusa"
import DatePicker from "../date-picker"

export default function Pickup() {
  const navigation = useRouter()
  const [storeAdd, setStoreAdd] = useState<null | string>(null)

  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isEdit, toggle: setEdit },
    setAddresses,
    setValue,
    handleSubmit,
    cart,
    control,
    watch,
    setShippingOption,
  } = useCheckout()

  useEffect(() => {
    // console.log(cart)
    if (cart && cart.shipping_methods && cart.shipping_methods.length) {
      setStoreAdd(cart.shipping_methods[0].data.store_id as string)
    }
  }, [cart])

  const [email] = watch(["email"])

  const canContinue = useMemo(() => {
    return !!email || cart?.shipping_address
  }, [email, cart?.shipping_address])

  const onContinueToPayment = async () => {
    try {
      await handleSubmit(setAddresses)()

      navigation.push("/checkout/payment")
    } catch (err) {
      console.log(err)
    }
  }

  const [store, setStore] = useState("")

  const { data, isLoading, refetch } = useQuery<
    void,
    Error,
    { stores: StoreLocation[] }
  >({
    queryFn: () =>
      medusaClient.client.request(
        "GET",
        `/store/store-locations/search?s=${HQ_STORE_CODE}`
      ),
    queryKey: ["store-location", "search", HQ_STORE_CODE],
  })

  useEffect(() => {
    if (!cart) return
    if (!data || isLoading) return

    if (cart.shipping_methods &&
      cart.shipping_methods.length > 0 &&
      isEmpty(cart.shipping_methods[0]?.data) &&
      data.stores.length > 0
    ) {
      const store = data.stores[0]
      setShippingOption(cart.shipping_methods[0].shipping_option_id, {
        store_id: store.id,
        store_name: store.name,
        store_code: store.code,
        store_postal_code: store.address?.postal_code,
      })
    }
  }, [data, isLoading, cart])

  useEffect(() => {
    let t = setTimeout(() => {
      refetch()
    }, 750)

    return () => {
      clearTimeout(t)
    }
  }, [store])

  const selectedStore = useMemo(() => {
    return data?.stores.find((s) => s.id === storeAdd)
  }, [data, storeAdd])

  useEffect(() => {
    if (!selectedStore) return
    setValue("shipping_address", {
      first_name: selectedStore?.name,
      last_name: "",
      company: "",
      address_1: selectedStore.address?.address_1 || "",
      address_2: selectedStore.address?.address_2 || "",
      city: selectedStore.address?.city || "",
      province: selectedStore.address?.province || "",
      postal_code: selectedStore.address?.postal_code || "",
      country_code: selectedStore.address?.country_code || "",
      phone: selectedStore.address?.phone || "",
    })
  }, [selectedStore])

  return (
    <div className="lg:w-1/2 flex flex-col items-stretch px-5 lg:px-0">
      <div className="flex flex-col items-start w-full">
        <h1 className="font-bold text-primary-700 text-[25px] leading-[60px] ">
          Customer Details
        </h1>

        <ConnectForm<CheckoutFormValues>>
          {({ register }) => (
            <div className="w-full">
              <label
                htmlFor="email"
                className="uppercase px-2 text-black text-sm font-medium"
              >
                Email address
              </label>
              <div className="my-1">
                <input
                  type="email"
                  className="w-3/4 bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
                  {...register("email")}
                  autoComplete="email"
                />
              </div>
              <span className="px-2 text-black text-sm font-medium">
                You can create an account after checkout
              </span>
            </div>
          )}
        </ConnectForm>
      </div>

      <div className="mt-10 flex flex-col items-start">
        <h1 className="font-bold text-primary-700 text-[25px] leading-[60px] ">
          Collection Details
        </h1>

        <div className="w-full">
          {/* <label
            htmlFor="collection_detail"
            className="uppercase px-2 text-black text-sm font-medium"
          >
            SELECT A STORE TO COLLECT YOUR ORDER
          </label>
          <div className="my-1">
            <input
              type="text"
              className="w-3/4 bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              placeholder="Search for a store"
            />
          </div>
          {data && (
            <div>
              Found {data.stores.length} store{data.stores.length > 1 && "s"}
            </div>
          )} */}

          {selectedStore && (
            <div className="mt-5 flex flex-col rounded-lg bg-primary-75 p-3 ">
              <h4 className="text-black text-sm font-semibold">
                {selectedStore.name}
              </h4>

              <div className="mt-2 text-black text-sm font-medium">
                <p>{selectedStore.name}</p>
                <p className="uppercase">{selectedStore.code}</p>
                <p>
                  {selectedStore.address.address_1},{" "}
                  {selectedStore.address.address_2}
                </p>
                <p>{selectedStore.address.city}</p>
                <p>{selectedStore.address.province}</p>
                <p>{selectedStore.address.country?.display_name}</p>
              </div>
            </div>
          )}

          {/* <div className="px-2 mt-5 flex flex-col max-h-80 gap-x-4 overflow-y-auto gap-3 rounded-md border border-primary-700 divide-y divide-primary-100">
            {isLoading ? (
              <>
                <Spinner />
              </>
            ) : data && data.stores.length ? (
              <>
                {data.stores
                  .filter((s) => s.id !== storeAdd)
                  .map((store) => (
                    <div
                      key={store.id}
                      className={clsx(
                        "hover:bg-primary-75/80 p-3 rounded-md hover:cursor-pointer relative",
                        storeAdd === store.id && "bg-primary-75/80"
                      )}
                      onClick={() => {
                        if (!cart) return

                        setValue("shipping_address", {
                          first_name: store.name,
                          last_name: store.code,
                          company: "",
                          address_1: store.address.address_1 ?? "",
                          address_2: store.address.address_2 ?? "",
                          city: store.address.city ?? "",
                          province: store.address.province ?? "",
                          postal_code: store.address.postal_code ?? "",
                          country_code:
                            store.address.country_code ??
                            cart?.region.countries[0].iso_2,
                          phone: store.address.phone ?? "",
                        })
                        setStoreAdd(store.id)
                      }}
                    >
                      <h4 className="text-black text-sm font-semibold">
                        {store.name}
                      </h4>

                      <div className="mt-2 text-black text-sm font-medium">
                        <p>{store.name}</p>
                        <p className="uppercase">{store.code}</p>
                        <p>
                          {store.address.address_1}, {store.address.address_2}
                        </p>
                        <p>{store.address.city}</p>
                        <p>{store.address.province}</p>
                        <p>{store.address.country?.display_name}</p>
                      </div>

                      <span
                        className={clsx(
                          "absolute inset-y-0 right-5 flex items-center justify-center",
                          storeAdd === store.id ? "" : "hidden"
                        )}
                      >
                        <span className="relative w-7 h-7 bg-primary-50 rounded-full flex items-center justify-center">
                          <Image
                            src={"/assets/images/check.svg"}
                            alt="check"
                            fill
                          />
                        </span>
                      </span>
                    </div>
                  ))}
              </>
            ) : (
              <>
                <div>No Store match your seach</div>
              </>
            )}

            <h4 className="text-black text-sm font-semibold">
              Cake Box Luton Mall
            </h4>

            <div className="mt-2 text-black text-sm font-medium">
              <p>Luton Mall</p>
              <p>LU1 2TJ</p>
              <p>Address: Unit 118 The Mall </p>
              <p>Shopping Centre</p>
            </div>
          </div> */}
        </div>

        <div className="mt-5 w-full">
          <Controller
            name="deliver_at"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker value={value} onChange={onChange} isPickup />
            )}
          />
        </div>
      </div>

      <div className="mt-10 flex items-start">
        <div className="w-auto flex flex-col items-center justify-stretch">
          <Button
            fill
            className="font-bold text-subtitle !bg-primary-700 rounded-md py-4 !px-7"
            onClick={onContinueToPayment}
            disabled={!canContinue}
          >
            CONTINUE TO PAYMENT
          </Button>
          <Link
            href="/basket"
            className="mt-3 underline text-black text-sm font-semibold text-center"
          >
            Return to basket
          </Link>
        </div>
      </div>
    </div>
  )
}
