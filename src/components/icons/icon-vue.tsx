import type { SVGProps } from 'react';

export function IconVue(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_544_193)">
        <path
          d="M77.8497 47.0004L69.9979 60.6255L62.1462 47.0004H35.9988L69.9979 106L103.997 47.0004H77.8497Z"
          fill="#41B883"
        />
        <path
          d="M77.8496 47.0004L69.9979 60.6255L62.1461 47.0004H49.5984L69.9979 82.3993L90.3974 47.0004H77.8496Z"
          fill="#34495E"
        />
      </g>
      <defs>
        <clipPath id="clip0_544_193">
          <rect
            width="68"
            height="59"
            fill="white"
            transform="translate(36 47)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
