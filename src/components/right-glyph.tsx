import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

interface RightGlyphProps {
  accentColor: string;
}

const PATH =
  'M419.5 784L245.5 784L245.5 293L113.5 293L113.5 105.5L40 105.499L40 -116';

const SEGMENT_PX = 50;

export function RightGlyph({ accentColor }: RightGlyphProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [ratios, setRatios] = useState<{ length: number; offset: number } | null>(null);

  useLayoutEffect(() => {
    let raf: number;

    const measure = () => {
      const totalLength = pathRef.current?.getTotalLength() ?? 0;
      if (totalLength > 0) {
        const ratio = SEGMENT_PX / totalLength;
        setRatios({ length: ratio, offset: 1 - ratio });
      } else {
        raf = requestAnimationFrame(measure);
      }
    };

    raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, []);

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

            <AnimatePresence>
              {ratios && (
                <motion.path
                  key="glyph-path"
                  d={PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: ratios.length, pathOffset: ratios.offset }}
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
            </AnimatePresence>
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
