import { useCursor } from '@/hooks/use-cursor';
import { useWindowEventListener } from '@/hooks/use-window-event-listener';
import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { motion, useAnimationFrame } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';

export const MotionBox = motion.create(Box);

const INTERACTIVE_SELECTOR =
  'a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="image"], [onclick], [role="button"], [role="link"]';

export function Cursor() {
  const cursorRef = useRef<BoxProps>(null);
  const { offset } = useCursor();

  const [isHovering, setIsHovering] = useState(false);
  const hoverOutTimeout = useRef<number>(null);

  useAnimationFrame(() => {
    if (!cursorRef.current || !cursorRef.current.style) return;

    cursorRef.current.style.translate = `${offset.x}px ${offset.y}px`;
  });

  useWindowEventListener(
    'mouseenter',
    useCallback((event: Event) => {
      const target = event.target as HTMLElement;

      if (target.matches(INTERACTIVE_SELECTOR)) {
        if (hoverOutTimeout.current) {
          clearTimeout(hoverOutTimeout.current);
        }

        setIsHovering(true);
      }
    }, []),
    document.body,
  );

  useWindowEventListener(
    'mouseleave',
    useCallback((event: Event) => {
      const target = event.target as HTMLElement;

      if (target.matches(INTERACTIVE_SELECTOR)) {
        hoverOutTimeout.current = setTimeout(() => {
          setIsHovering(false);
        }, 100);
      }
    }, []),
    document.body,
  );

  return (
    <Box
      ref={cursorRef}
      pos="fixed"
      left={0}
      top={0}
      pointerEvents="none"
      zIndex="max"
    >
      {isHovering ? (
        <MotionBox asChild>
          <svg
            width="24"
            height="31"
            viewBox="0 0 64 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1.5C11.5954 1.5 14.5 4.40169 14.5 7.96875V37.1875C14.5 38.0159 15.1716 38.6875 16 38.6875C16.8284 38.6875 17.5 38.0159 17.5 37.1875C17.5 36.5545 18.0171 36.0313 18.667 36.0312H29.333C29.9829 36.0313 30.5 36.5545 30.5 37.1875V38.5156C30.5 39.3441 31.1716 40.0156 32 40.0156C32.8284 40.0156 33.5 39.3441 33.5 38.5156C33.5 37.8826 34.0171 37.3594 34.667 37.3594H41.333C44.192 37.3594 46.5 39.6664 46.5 42.5C46.5 43.3284 47.1716 44 48 44C48.8284 44 49.5 43.3284 49.5 42.5V40.792L49.5039 40.7139C49.5409 40.3521 49.8308 40.0574 50.2041 40.0195L50.2852 40.0156C57.0364 40.0156 62.4999 45.4662 62.5 52.1768V69.0625C62.5 77.0306 56.0137 83.5 48 83.5H16C7.98633 83.5 1.5 77.0306 1.5 69.0625V7.96875C1.5 4.40169 4.40461 1.5 8 1.5Z"
              fill="white"
              stroke="black"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        </MotionBox>
      ) : (
        <MotionBox asChild>
          <svg
            width="24"
            height="30"
            viewBox="0 0 64 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.49512 1.76758C6.94312 1.15904 8.76403 1.51086 11.8818 3.74805C14.9612 5.95768 18.8161 9.64569 24.1143 14.7227L53.1465 42.5439C56.5815 45.8356 59.0598 48.2134 60.6396 50.1162C62.2671 52.0764 62.5902 53.1353 62.4795 53.8428C62.3807 54.4734 62.1316 55.0719 61.752 55.5869C61.3244 56.1669 60.3384 56.6852 57.7959 56.916C55.3276 57.1401 51.8883 57.0639 47.125 56.9551C39.4569 56.7798 35.267 56.6646 31.3994 57.9199C30.1439 58.3274 28.9251 58.8397 27.7559 59.4512C24.1534 61.3353 21.3103 64.4064 16.083 70.001C12.8355 73.4766 10.4893 75.9841 8.60547 77.5889C6.66641 79.2407 5.60584 79.5835 4.8877 79.4834C4.25116 79.3946 3.64537 79.1549 3.12207 78.7842C2.53391 78.3675 1.99911 77.3961 1.72754 74.8682C1.46379 72.4127 1.48669 68.984 1.52051 64.2344L1.80566 24.0928C1.85783 16.7667 1.8993 11.4407 2.46191 7.70117C3.03146 3.91594 4.0495 2.37511 5.49512 1.76758Z"
              fill="white"
              stroke="black"
              strokeWidth="3"
            />
          </svg>
        </MotionBox>
      )}
    </Box>
  );
}
