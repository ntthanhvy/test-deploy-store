import React from "react"
import { IconProps } from "types/icon"

const User_2: React.FC<IconProps> = ({
  size = "32",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="32" height="32" fill="url(#account)" />
      <defs>
        <pattern
          id="account"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_66_915" transform="scale(0.002)" />
        </pattern>
        <image
          id="image0_66_915"
          width="500"
          height="500"
          xlinkHref="/assets/images/account.png"
        />
      </defs>
    </svg>
  )
}

export default User_2
