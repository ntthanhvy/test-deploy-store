import { ChangeEvent } from "react"

type Props = {
  step?: number
  min: number
  max: number
  onChange: (values: [number, number]) => void
  value: [number, number]
}

export default function RangeSlider(props: Props) {
  const {
    step = 1,
    min,
    max,
    onChange,
    value: [minValue, maxValue],
  } = props

  const handleMinChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    const value = parseFloat(ev.target.value)
    // the new min value is the value from the event.
    // it should not exceed the current max value!
    const newMinVal = Math.min(value, maxValue - step)
    onChange([newMinVal, maxValue])
  }

  const handleMaxChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    const value = parseFloat(ev.target.value)
    // the new max value is the value from the event.
    // it should not be lower than the current min value!
    const newMaxVal = Math.max(value, minValue + step)
    onChange([minValue, newMaxVal])
  }

  const minPos = ((minValue - min) / (max - min)) * 100
  const maxPos = ((maxValue - min) / (max - min)) * 100

  return (
    <div className="relative">
      <div className="flex justify-between">
        <label htmlFor="min">{min}</label>
        <label htmlFor="max">{max}</label>
      </div>

      <div className="wrapper">
        <div className="input-wrapper">
          <input
            className="flex-1 absolute w-full"
            type="range"
            value={minValue}
            min={min}
            max={max}
            step={step}
            onChange={handleMinChange}
          />
          <input
            className="flex-1 absolute w-full"
            type="range"
            value={maxValue}
            min={min}
            max={max}
            step={step}
            onChange={handleMaxChange}
          />
        </div>
        <div className="control-wrapper">
          <div className="control" style={{ left: `${minPos}%` }} />
          <div className="rail">
            <div
              className="inner-rail"
              style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
            />
          </div>
          <div className="control" style={{ left: `${maxPos}%` }} />
        </div>
      </div>
    </div>
  )
}
