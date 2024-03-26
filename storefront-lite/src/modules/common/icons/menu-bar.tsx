import React from "react"
import { IconProps } from "types/icon"

const MenuBar: React.FC<IconProps> = ({
  size = "21",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={+size + 2}
      height={size}
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M1.53784 1.1687H21.5378"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M1.53784 10.7502H21.5378"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M1.53784 19.4409H21.5378"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default MenuBar
