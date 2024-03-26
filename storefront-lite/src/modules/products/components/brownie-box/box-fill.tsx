import { useProductBoxActions } from "@lib/context/product-box-context"
import clsx from "clsx"
import { useMemo } from "react"
import { useFieldArray } from "react-hook-form"
import { BrownieBoxItem } from "./item"

export default function BoxFill() {
  const { watch, control } = useProductBoxActions()

  const [variants, boxType] = watch(["variants", "boxType"])

  const totalBrownies = useMemo(() => {
    return variants.reduce((acc: any, variant: any) => {
      return acc + variant.quantity
    }, 0)
  }, [variants])

  const { update } = useFieldArray({
    name: "variants",
    control,
  })

  return (
    <div className="">
      <div className="flex items-start">
        <div>
          <h3 className="font-bold text-primary-700 text-lg">Your choice</h3>
          <p>
            {totalBrownies < boxType
              ? `Add ${boxType - totalBrownies} more to fill your box`
              : "Your box is full"}
          </p>
        </div>

        <div className="ml-auto py-3">{totalBrownies}</div>

        <div className="flex flex-col items-end">
          <div className="border grid grid-cols-3 p-2 w-32 gap-2 bg-white ml-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={clsx("aspect-square border border-gray-500", {
                  "bg-green-500": idx + 1 <= totalBrownies,
                })}
              ></div>
            ))}
          </div>
          <span
            className={clsx("text-sm underline text-primary-700 text-right", {
              hidden: totalBrownies <= 0,
            })}
          >
            Clear
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {variants.map((variant: any, idx: number) => {
          if (!variant.quantity) return null

          return (
            <BrownieBoxItem
              key={variant.id}
              variant={variant}
              idx={idx}
              update={update}
            />
          )
        })}
      </div>
    </div>
  )
}
