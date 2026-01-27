import type { SVGProps } from 'react';

export function IconVue(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      width="76"
      height="76"
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_836_129"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x="4"
        y="9"
        width="68"
        height="59"
      >
        <path d="M72 9H4V68H72V9Z" fill="white" />
      </mask>
      <g mask="url(#mask0_836_129)">
        <path
          d="M45.8489 9L37.9972 22.6251L30.1454 9H3.99805L37.9972 67.9996L71.9962 9H45.8489Z"
          fill="#41B883"
        />
        <path
          d="M45.8489 9L37.9972 22.6251L30.1454 9H17.5977L37.9972 44.3989L58.3967 9H45.8489Z"
          fill="#34495E"
        />
      </g>
    </svg>
  );
}
