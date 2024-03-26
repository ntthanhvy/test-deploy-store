import Button from "@modules/common/components/button"
import {
  useContextCalendars,
  useContextDaysPropGetters,
  type DPCalendar,
} from "@rehookify/datepicker"
import clsx from "clsx"

export default function Calendar({
  calendar,
  prevButton,
  nextButton,
}: {
  calendar: DPCalendar
  prevButton: React.ReactNode
  nextButton: React.ReactNode
}) {
  const { weekDays } = useContextCalendars()
  const { dayButton } = useContextDaysPropGetters()

  const { days, month } = calendar ?? {}
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex items-center gap-x-10">
        {prevButton}
        <span>{month}</span>
        {nextButton}
      </div>

      <div className="max-w-[17rem] w-full mt-5 grid grid-cols-7 gap-2 mb-2 items-center h-4">
        {weekDays.map((d, idx) => (
          <p key={idx} className="w-8 text-xs text-center">
            {d}
          </p>
        ))}
      </div>
      <div className="max-w-[17rem] grid grid-cols-7 place-items-center gap-2">
        {days.map((d) => (
          <Button
            key={d.$date.toString()}
            className={clsx(
              "w-8 h-8 text-center text-xs !p-1 roudned-full",
              d.now ? "text-primary-700" : "text-black"
            )}
            {...dayButton(d)}
            fill={d.selected}
            disabled={d.disabled}
          >
            {d.day}
          </Button>
        ))}
      </div>
    </div>
  )
}
