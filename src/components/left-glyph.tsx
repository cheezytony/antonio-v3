import { Box } from '@chakra-ui/react';

export function LeftGlyph() {
  return (
    <Box
      asChild
      pos="absolute"
      top={0}
      left={0}
      pointerEvents="none"
      hideBelow="md"
      w="max(20rem, 20%)"
    >
      <svg viewBox="0 0 320 864" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_628_720)">
          <path
            d="M-99 783.998L75.0001 783.998L75.0001 292.998L207 292.998L207 105.498L280 105.499L280 -116"
            stroke="white"
            strokeOpacity="0.08"
          />
        </g>
        <defs>
          <clipPath id="clip0_628_720">
            <rect width="320" height="864" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}
