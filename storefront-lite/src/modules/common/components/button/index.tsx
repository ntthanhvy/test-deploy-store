import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import React from "react"

type ButtonProps = {
  isLoading?: boolean
  variant?: "primary" | "secondary" | "white"
  fill?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  className,
  isLoading = false,
  variant = "primary",
  fill = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center text-sm border transition-colors duration-200 disabled:opacity-50 rounded-[20px]",
        {
          "border border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white":
            variant === "primary" && !fill,
          "border-primary-800 bg-primary-800 text-white hover:bg-primary-700":
            variant === "primary" && fill,
          "text-gray-900 bg-transparent border-gray-920 hover:bg-gray-100":
            variant === "white",
        },
        className,
        " px-5 py-1 "
      )}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
