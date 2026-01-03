import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface RightGlyphProps {
  accentColor: string;
}

const PATH =
  'M419.5 784L245.5 784L245.5 293L113.5 293L113.5 105.5L40 105.499L40 -116';

const SEGMENT_PX = 50;

export function RightGlyph({ accentColor }: RightGlyphProps) {
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
      id="right-glyph"
      overflow="clip"
      pointerEvents="none"
      pos="absolute"
      right={0}
      top={0}
      w="max(20rem, 20%)"
      zIndex={0}
    >
      <Box asChild w="full">
        <svg
          viewBox="0 0 320 864"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_648_2)">
            <Box asChild stroke="fg" strokeOpacity="0.08">
              <motion.path d={PATH} />
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
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{
                  pathLength: ratios.length,
                  pathOffset: ratios.offset,
                }}
                animate={{ pathOffset: 0 }}
                transition={{
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
            <clipPath id="clip0_648_2">
              <rect width="320" height="864" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
    </Box>
  );
}
