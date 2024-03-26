import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js"
import {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
} from "@stripe/stripe-js"
import Image from "next/image"
import React, { useMemo } from "react"

const PaymentStripe: React.FC = () => {
  const useOptions:
    | StripeCardNumberElementOptions
    | StripeCardExpiryElementOptions
    | StripeCardCvcElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          padding: "10px 12px",
          "::placeholder": {
            color: "#CFD7E0",
          },
        },
      },
    }
  }, [])

  return (
    <>
      <div className="mt-3">
        <div className="flex items-center">
          <label
            htmlFor="cvv"
            className="uppercase text-primary-700 text-sm font-bold w-1/4"
          >
            NAME ON CARD
          </label>
          <div className="mt-2 relative lg:w-3/4">
            <input
              className="
                    w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium placeholder:text-black/20
                  "
              placeholder="J Smith"
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <CardNumber options={useOptions as StripeCardNumberElementOptions} />
      </div>

      <div className="mt-3 flex items-center">
        <CardExpiry options={useOptions as StripeCardExpiryElementOptions} />
        <CardCVC options={useOptions as StripeCardCvcElementOptions} />
      </div>
    </>
  )
}

const CardNumber = ({
  options,
}: {
  options: StripeCardNumberElementOptions
}) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor="card_number"
        className="uppercase text-primary-700 text-sm font-bold w-1/4"
      >
        CARD NUMBER
      </label>
      <div className="mt-2 relative lg:w-3/4">
        <div className="w-full bg-white  px-2 py-3 border border-primary-700 text-primary-700 text-sm rounded-md font-medium">
          <CardNumberElement options={options} />
        </div>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex gap-2 items-center">
          <span className="">
            <Image
              src={"/assets/images/visa.png"}
              width={50}
              height={20}
              alt={"visa"}
            />
          </span>
          <span className="">
            <Image
              src={"/assets/images/master.png"}
              width={50}
              height={20}
              alt={"master"}
            />
          </span>
          <img src="/assets/images/card.svg" alt="visa" />
        </span>
      </div>
      <ul className="flex items-center gap-x-2"></ul>
    </div>
  )
}

const CardExpiry = ({
  options,
}: {
  options: StripeCardExpiryElementOptions
}) => {
  return (
    <div className="contents flex-1 items-center">
      <label
        htmlFor="exp_date"
        className="uppercase text-primary-700 text-sm font-bold w-1/4"
      >
        EXPIRY DATE
      </label>
      <div className="relative flex-1">
        <div className="w-full bg-white px-2 py-3 border border-primary-700 text-primary-700 text-sm rounded-md font-bold">
          <CardExpiryElement options={options} />
        </div>
      </div>
    </div>
  )
}

const CardCVC = ({ options }: { options: StripeCardCvcElementOptions }) => {
  return (
    <div className="flex-1 items-center contents">
      <label
        htmlFor="cvv"
        className="ml-5 uppercase text-primary-700 text-sm font-bold w-1/4"
      >
        CVC / CVV
      </label>
      <div className="relative flex-1">
        <div className="w-full bg-white px-2 py-3 border border-primary-700 text-primary-700 text-sm rounded-md font-bold">
          <CardCvcElement options={{ ...options, placeholder: "3 digits" }} />
        </div>
      </div>
    </div>
  )
}

export default PaymentStripe
