import React from "react"
import { IconProps } from "types/icon"

const Heart: React.FC<IconProps> = ({
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
          d="M22.9807 3.55103C21.6716 2.24194 19.9385 1.52644 18.0888 1.52644C16.2391 1.52644 14.5007 2.24724 13.1916 3.55633L12.508 4.24003L11.8137 3.54573C10.5046 2.23664 8.76087 1.51054 6.91119 1.51054C5.0668 1.51054 3.32841 2.23134 2.02462 3.53513C0.715525 4.84422 -0.00527095 6.58261 2.90211e-05 8.4323C2.90211e-05 10.282 0.726125 12.0151 2.03522 13.3242L11.9886 23.2775C12.1264 23.4153 12.3119 23.4895 12.4921 23.4895C12.6723 23.4895 12.8577 23.4206 12.9955 23.2828L22.9701 13.3454C24.2792 12.0363 25 10.2979 25 8.4482C25.0053 6.59851 24.2898 4.86012 22.9807 3.55103ZM21.9631 12.3331L12.4921 21.767L3.04221 12.3172C2.00342 11.2784 1.43102 9.90039 1.43102 8.4323C1.43102 6.96421 1.99812 5.58622 3.03691 4.55273C4.0704 3.51923 5.4484 2.94684 6.91119 2.94684C8.37928 2.94684 9.76257 3.51923 10.8014 4.55803L11.9992 5.75582C12.2801 6.03672 12.7306 6.03672 13.0114 5.75582L14.1986 4.56862C15.2374 3.52983 16.6207 2.95743 18.0835 2.95743C19.5463 2.95743 20.9243 3.52983 21.9631 4.56332C23.0019 5.60212 23.569 6.98011 23.569 8.4482C23.5743 9.91629 23.0019 11.2943 21.9631 12.3331Z"
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

export default Heart
