import { Box } from '@chakra-ui/react';

interface RightGlyphProps {
  accentColor: string;
}

export function RightGlyph({ accentColor }: RightGlyphProps) {
  return (
    <Box
      asChild
      pos="absolute"
      top={0}
      right={0}
      pointerEvents="none"
      hideBelow="md"
      w="max(20rem, 20%)"
      color={accentColor}
    >
      <svg viewBox="0 0 320 864" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_648_2)">
          <path
            d="M419.5 784L245.5 784L245.5 293L113.5 293L113.5 105.5L40 105.499L40 -116"
            stroke="white"
            strokeOpacity="0.08"
          />
          <g filter="url(#filter0_d_648_2)">
            <path
              d="M113.5 136.001L113.5 105.501L103 105.5"
              stroke="currentColor"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_648_2"
            x="95"
            y="97"
            width="27"
            height="47"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.941176 0 0 0 0 0.376471 0 0 0 0 0.337255 0 0 0 0.8 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_648_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_648_2"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_648_2">
            <rect width="320" height="864" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}
