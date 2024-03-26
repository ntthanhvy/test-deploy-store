import { Popover, Transition } from "@headlessui/react"
import Button from "@modules/common/components/button"
import ChevronDown from "@modules/common/icons/chevron-down"
import {
  DatePickerStateProvider,
  useContextCalendars,
  useContextDatePickerOffsetPropGetters,
  useContextDays,
} from "@rehookify/datepicker"
import { Fragment, useMemo } from "react"
import Calendar from "./calendar"
import Time from "./time"

export default function DatePicker({
  value,
  onChange,
  withTime = false,
  isPickup = false,
}: {
  value: Date
  onChange: (date: Date) => void
  withTime?: boolean
  isPickup?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <DatePickerStateProvider
      config={{
        selectedDates: [value],
        onDatesChange: (d) => onChange(d[0]),
        dates: {
          mode: "single",
        },
        locale: {
          options: {
            day: "2-digit",
            month: "long",
            year: "numeric",
          },
        },
      }}
    >
      <Picker withTime={withTime} isPickup={isPickup} />
    </DatePickerStateProvider>
  )
}

function Picker({
  withTime = false,
  isPickup = false,
}: {
  withTime?: boolean
  isPickup?: boolean
}) {
  const { calendars } = useContextCalendars()
  const { formattedDates, selectedDates } = useContextDays()
  const { subtractOffset, addOffset } = useContextDatePickerOffsetPropGetters()

  const formattedTime = useMemo(() => {
    // console.log(selectedDates[0])
    const time = selectedDates[0]?.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })

    return time
  }, [selectedDates])

  return (
    <div className="flex-1 flex items-start gap-x-5 w-full">
      <div className="w-full">
        <div className="flex flex-col gap-2 w-full items-start">
          <Popover className="w-full relative">
            <Popover.Button as="div" className={"w-full"}>
              <input
                readOnly
                className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
                value={formattedDates[0]}
                placeholder="Choose a delivery date"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 z-10 mt-3 transform px-4 sm:px-0 w-full">
                <div className="bg-white rounded-md p-3">
                  <Calendar
                    calendar={calendars[0]}
                    prevButton={
                      <Button {...subtractOffset({ months: 1 })}>
                        <ChevronDown className="rotate-90" />
                      </Button>
                    }
                    nextButton={
                      <Button {...addOffset({ months: 1 })}>
                        <ChevronDown className="-rotate-90" />
                      </Button>
                    }
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
      {withTime || !isPickup ? (
        <div className="w-full">
          <Popover className="relative">
            <Popover.Button as="div">
              <input
                type="deliveryTime"
                className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
                readOnly
                value={formattedTime}
                placeholder="Choose a delivery time"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 z-10 mt-1 transform px-4 sm:px-0 w-full max-w-sm">
                <Time />
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      ) : null}
    </div>
  )
}
