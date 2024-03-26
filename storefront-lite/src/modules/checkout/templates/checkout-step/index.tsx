"use client"

import clsx from "clsx"
import { usePathname } from "next/navigation"

const steps = ["1", "2"]
const stepNames = {
  "1": "YOUR BASKET",
  "2": "DETAILS & PAYMENT",
}

export default function CheckoutStep() {
  const pathname = usePathname()

  const currentStep = () => {
    if (pathname.includes("payment")) return "2"
    return "1"
  }

  return (
    <div className="lg:mx-12 flex items-center py-20">
      {steps.map((step, idx) => (
        <div className="flex-1 flex flex-col items-center" key={idx}>
          <div
            className={clsx(
              "relative border-2 flex-1 w-full",
              currentStep() >= step
                ? "border-primary-700"
                : "border-primary-100"
            )}
            key={idx}
          >
            <span
              className={clsx(
                "w-10 h-10 flex items-center justify-center absolute p-2 rounded-full font-bold text-white -translate-y-1/2 left-1/2 -translate-x-1/2",
                currentStep() >= step ? "bg-primary-700" : "bg-primary-100"
              )}
            >
              {step}
            </span>
          </div>
          <span className="mt-8 text-sm">
            {stepNames[step as keyof typeof stepNames]}
          </span>
        </div>
      ))}
    </div>
  )
}
