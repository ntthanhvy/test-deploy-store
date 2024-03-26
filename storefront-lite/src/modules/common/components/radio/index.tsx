import clsx from "clsx"

const Radio = ({
  checked,
  className = "",
}: {
  checked: boolean
  className?: string | ((props: { checked: boolean }) => string)
}) => {
  return (
    <div
      className={clsx(
        "h-3 w-3 p-1 rounded-full border border-primary-700 flex items-center justify-center",
        typeof className === "function" ? className({ checked }) : className
      )}
    >
      {checked && <div className="w-full h-full rounded-full bg-primary-700" />}
    </div>
  )
}

export default Radio
