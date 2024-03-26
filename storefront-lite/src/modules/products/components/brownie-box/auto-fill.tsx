import { useProductBoxActions } from "@lib/context/product-box-context"
import Button from "@modules/common/components/button"

const boxTypes = [6, 12, 18, 24, 30]

export default function AutoFillBox() {
  const { register, watch, setValue } = useProductBoxActions()

  const [variants, boxType] = watch(["variants", "boxType"])

  // random select item in variants not in box yet, and add to box to make it full box
  // repeat item to box full
  const randomBox = () => {
    const notInBox = variants.filter((variant: any) => variant.quantity <= 0)
    const inBox = variants.filter((variant: any) => variant.quantity > 0)

    console.log({ boxType })

    const randomItems = notInBox
      .sort(() => 0.5 - Math.random())
      .slice(0, boxType - inBox.length)
      .map((item: any) => ({ ...item, quantity: 1, selected: true }))

    let newBox = [...inBox, ...randomItems]
    let totalQuantity = newBox.reduce((acc, item) => acc + item.quantity, 0)

    // increases item quantity to box full
    while (totalQuantity < boxType) {
      const randomIndex = Math.floor(Math.random() * newBox.length)
      newBox[randomIndex].quantity += 1

      totalQuantity = newBox.reduce((acc, item) => acc + item.quantity, 0)
    }

    setValue("variants", newBox)
  }

  return (
    <div className="py-5">
      <h5 className="text-lg font-bold text-primary-700">Auto fill your box</h5>

      <div className="mt-3">
        <div className="flex items-center gap-x-3">
          <select
            id="autoFill"
            {...register("boxType", {
              valueAsNumber: true,
            })}
            className="w-1/3 p-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {boxTypes.map((box) => (
              <option key={box} value={+box}>
                {box}
              </option>
            ))}
          </select>

          <Button
            fill
            className="rounded-md w-full text-base py-2 uppercase"
            onClick={randomBox}
          >
            Auto fill
          </Button>
        </div>
      </div>
    </div>
  )
}
