import CheckboxIcon from "@modules/common/icons/checkbox-icon"
import clsx from "clsx"
import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  className = "",
}) => {
  return (
    <button
      className={clsx("text-left flex items-start gap-x-2", className)}
      role="checkbox"
      type="button"
      aria-checked={checked}
      onClick={onChange}
    >
      <div
        role="checkbox"
        aria-checked={checked}
        className="mt-0.5 flex-shrink-0 border border-gray-900 w-5 h-5 flex items-start justify-start"
      >
        {checked ? <CheckboxIcon /> : null}
      </div>
      <span>{label}</span>
    </button>
  )
}

export default Checkbox
