import React from "react"
import { IconProps } from "types/icon"

const HeartFill: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <g clipPath="url(#clip0_1_57)">
        <path
          d="M22.9807 3.55103C21.6716 2.24194 19.9385 1.52644 18.0888 1.52644C16.2392 1.52644 14.5008 2.24724 13.1917 3.55633L12.508 4.24003L11.8137 3.54573C10.5046 2.23664 8.76091 1.51054 6.91122 1.51054C5.06683 1.51054 3.32844 2.23134 2.02465 3.53513C0.715555 4.84422 -0.00524043 6.58261 5.95387e-05 8.4323C5.95387e-05 10.282 0.726155 12.0151 2.03525 13.3242L11.9886 23.2775C12.1264 23.4153 12.3119 23.4895 12.4921 23.4895C12.6723 23.4895 12.8578 23.4206 12.9956 23.2828L22.9701 13.3454C24.2792 12.0363 25 10.2979 25 8.4482C25.0053 6.59851 24.2898 4.86012 22.9807 3.55103Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_57">
          <rect width="25" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default HeartFill
