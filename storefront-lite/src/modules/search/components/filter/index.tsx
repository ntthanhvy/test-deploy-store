import { FilterManager, FilterManagerFilters } from "@klevu/core"
import { Fragment } from "react"

export default function Filter({
  filters,
  manager,
}: {
  filters: FilterManagerFilters[]
  manager: FilterManager
}) {
  const handleSlider = (key: string) => (value: [number, number]) => {
    const [start, end] = value
    manager.updateSlide(key, +start, +end)
  }

  return (
    <div className="space-y-3 mt-5">
      {filters.map((filter, i) => {
        if (FilterManager.isKlevuFilterResultOptions(filter)) {
          return (
            <div className="" key={i}>
              <h6 className="text-lg font-bold text-primary-900 capitalize">
                {filter.label}
              </h6>

              <div className="flex flex-col mt-2">
                {filter.options.map((opt, idx) => (
                  <label htmlFor={`${opt.value}`} key={idx}>
                    <input
                      type="checkbox"
                      id={`${opt.value}`}
                      name={`${opt.name}`}
                      value={`${opt.value}`}
                      onChange={() => {
                        manager.toggleOption(filter.key, opt.name)
                      }}
                      checked={opt.selected}
                    />
                    <span className="ml-2">{opt.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )
        }

        if (FilterManager.isKlevuFilterResultSlider(filter)) {
          return (
            <Fragment key={i}>
              <h6 className="text-lg font-bold text-primary-900 capitalize">
                {filter.label.includes("price") ? "Prices" : filter.label}
              </h6>

              <div className="flex flex-col gap-3">
                <div>
                  <label htmlFor="min">
                    Min Price: {filter.start || filter.min}
                  </label>
                  <input
                    className="w-full text-primary-700"
                    type="range"
                    id="min"
                    value={filter.start || filter.min}
                    min={filter.min}
                    max={filter.max}
                    onChange={(ev) =>
                      handleSlider(filter.key)([
                        +ev.target.value,
                        +(filter.end || filter.max),
                      ])
                    }
                  />
                </div>

                <div>
                  <label htmlFor="max" className="text-base">
                    Max Price: {filter.end || filter.max}
                  </label>
                  <input
                    className="w-full"
                    type="range"
                    id="max"
                    value={filter.end || filter.max}
                    min={filter.min}
                    max={filter.max}
                    onChange={(ev) =>
                      handleSlider(filter.key)([
                        +(filter.start || filter.min),
                        +ev.target.value,
                      ])
                    }
                  />
                </div>
              </div>
            </Fragment>
          )
        }

        return null
      })}
    </div>
  )
}
