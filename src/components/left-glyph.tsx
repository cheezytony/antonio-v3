import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface RightGlyphProps {
  accentColor: string;
}

const PATH =
  'M-99 783.998L75.0001 783.998L75.0001 292.998L207 292.998L207 105.498L280 105.499L280 -116';

const SEGMENT_PX = 50;

export function LeftGlyph({ accentColor }: RightGlyphProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [ratios, setRatios] = useState({ length: 0, offset: 0 });

  useEffect(() => {
    if (pathRef.current) {
      const totalLength = pathRef.current.getTotalLength();

      if (totalLength > 0) {
        const lengthRatio = SEGMENT_PX / totalLength;
        setRatios({
          length: lengthRatio,
          offset: 1 - lengthRatio,
        });
      }
    }
  }, [PATH]);

  return (
    <Box
      color={accentColor}
      h="full"
      hideBelow="md"
      overflow="clip"
      pointerEvents="none"
      pos="absolute"
      top={0}
      left={0}
      w="max(20rem, 20%)"
      zIndex={-1}
    >
      <Box asChild w="full">
        <svg
          viewBox="0 0 320 864"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_628_720)">
            <Box asChild stroke="fg" strokeOpacity="0.08">
              <path d={PATH} />
            </Box>

            <path
              ref={pathRef}
              d={PATH}
              fill="none"
              stroke="transparent"
              strokeWidth="0"
            />

            {ratios.length > 0 && (
              <motion.path
                d={PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{
                  pathLength: ratios.length,
                  pathOffset: 0,
                }}
                animate={{ pathOffset: ratios.offset }}
                transition={{
                  delay: 5,
                  duration: 5,
                  repeatDelay: 5,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatType: 'loop',
                }}
              />
            )}
          </g>
          <defs>
            <clipPath id="clip0_628_720">
              <rect width="320" height="864" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
    </Box>
  );
}
