import { useCheckout } from "@lib/context/checkout-context"
import { Controller } from "react-hook-form"
import DatePicker from "../date-picker"

export default function DeliveryDate() {
  const { control } = useCheckout()

  return (
    <>
      <div className="mt-20 w-full flex flex-col items-start gap-5">
        <h1 className="font-bold text-primary-700 text-[25px] font-WildMango">
          Your delivery date and time
        </h1>

        <Controller
          control={control}
          name="deliver_at"
          render={({ field: { value, onChange } }) => (
            <DatePicker value={value} onChange={onChange} withTime />
          )}
        />
      </div>
    </>
  )
}
