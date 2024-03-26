import {
  useContextTime,
  useContextTimePropGetters,
} from "@rehookify/datepicker"
import clsx from "clsx"

export default function Time() {
  const { time } = useContextTime()
  const { timeButton } = useContextTimePropGetters()
  return (
    <ul className="bg-white rounded-md mt-2 list-none p-0 m-0 max-h-80 overflow-y-auto">
      {time.map((t) => (
        <li
          key={t.$date.toString()}
          className={clsx(
            "px-2 py-1 text-center w-full rounded hover:cursor-pointer hover:bg-primary-75 inline-block",
            timeButton(t).disabled
              ? "hover:pointer-events-none opacity-50"
              : "hover:bg-primary-75"
          )}
          {...timeButton(t)}
        >
          {t.time}
        </li>
      ))}
    </ul>
  )
}
