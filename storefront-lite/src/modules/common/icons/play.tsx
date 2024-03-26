import React from "react"
import { IconProps } from "types/icon"

const Play: React.FC<IconProps> = ({
  size = "16",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width="48"
      height="56"
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path d="M48 28L0 55.7128V0.287188L48 28Z" fill="#FAD9E0" />
    </svg>
  )
}

export default Play
