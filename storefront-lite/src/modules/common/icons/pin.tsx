import React from "react"
import { IconProps } from "types/icon"

const Pin: React.FC<IconProps> = ({
  size = "19",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={+size + 1}
      height={size}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="20" height="19" fill="url(#pin)" />
      <defs>
        <pattern
          id="pin"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_84_3117"
            transform="matrix(0.00183398 0 0 0.0019305 0.028668 0)"
          />
        </pattern>
        <image
          id="image0_84_3117"
          width="514"
          height="518"
          xlinkHref="/assets/images/location.svg"
        />
      </defs>
    </svg>
  )
}

export default Pin
