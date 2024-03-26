import { PaymentSession } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import clsx from "clsx"
import Image from "next/image"
import PaymentStripe from "../payment-stripe"

export default function PaymentMethod({
  paymentSession,
}: {
  paymentSession: PaymentSession
}) {
  return (
    <>
      <div className="mt-20 w-full flex flex-col items-start gap-5">
        <h1 className="font-bold text-primary-700 text-[25px] font-WildMango">
          Your payment method
        </h1>

        <PaymentElenment paymentSession={paymentSession} />
      </div>
    </>
  )
}

function PaymentElenment({
  paymentSession,
}: {
  paymentSession: PaymentSession
}) {
  if (!paymentSession) {
    return null
  }

  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <div className="w-full lg:px-2 ">
          <label htmlFor="card_payment" className="flex items-center gap-x-2">
            <Radio
              checked={true}
              className={({ checked }) => clsx("w-6 h-6")}
            />
            <span className="text-black">Credit Card / Debit Card</span>
          </label>

          <PaymentStripe />
        </div>
      )
    default:
      return (
        <div className="w-full lg:px-2">
          <label htmlFor="card_payment" className="flex items-center gap-x-2">
            <Radio
              checked={true}
              className={({ checked }) => clsx("w-6 h-6")}
            />
            <span className="text-black text-sm font-medium">
              Credit Card / Debit Card
            </span>
          </label>

          <div className="mt-5">
            <div>
              <label
                htmlFor="card_number"
                className="uppercase text-black text-sm font-medium"
              >
                CARD NUMBER
              </label>
              <div className="mt-2 relative lg:w-3/4">
                <input
                  className="
                    w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium
                  "
                  placeholder="1234 5678 9012 3456"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2">
                  <img src="/assets/images/card.svg" alt="visa" />
                </span>
              </div>
              <ul className="flex items-center gap-x-2">
                <li className="">
                  <Image
                    src={"/assets/images/visa.png"}
                    width={50}
                    height={20}
                    alt={"visa"}
                  />
                </li>
                <li className="">
                  <Image
                    src={"/assets/images/master.png"}
                    width={50}
                    height={20}
                    alt={"master"}
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-x-3">
            <div>
              <label
                htmlFor="exp_date"
                className="uppercase text-black text-sm font-medium"
              >
                EXPIRY DATE
              </label>
              <div className="mt-2 relative lg:w-3/4">
                <input
                  className="
                    w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium
                  "
                  placeholder="MM/YY"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="uppercase text-black text-sm font-medium"
              >
                CVC / CVV
              </label>
              <div className="mt-2 relative lg:w-3/4">
                <input
                  className="
                    w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium
                  "
                  placeholder="3 digits"
                />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div>
              <label
                htmlFor="cvv"
                className="uppercase text-black text-sm font-medium"
              >
                NAME ON CARD
              </label>
              <div className="mt-2 relative lg:w-3/4">
                <input
                  className="
                    w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium
                  "
                  placeholder="J Smith"
                />
              </div>
            </div>
          </div>
        </div>
      )
  }
}
