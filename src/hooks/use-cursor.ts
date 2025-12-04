import { useCallback, useState } from 'react';
// import { useAnimationFrame } from './use-animation-frame';
import { useMediaQuery } from '@chakra-ui/react';
import { useAnimationFrame } from 'framer-motion';
import { useWindowEventListener } from './use-window-event-listener';

interface Coordinates {
  x: number;
  y: number;
}

export function useCursor() {
  const [isMobile] = useMediaQuery(['(max-width: 768px)']);

  const [rawPositions, setRawPositions] = useState<{
    offset: Coordinates;
    center: Coordinates;
    difference: Coordinates;
  }>({
    offset: {
      x: 0,
      y: 0,
    },
    center: {
      x: 0,
      y: 0,
    },
    difference: {
      x: 0,
      y: 0,
    },
  });

  const [positions, setPositions] = useState<{
    offset: Coordinates;
    center: Coordinates;
    difference: Coordinates;
  }>({
    offset: {
      x: 0,
      y: 0,
    },
    center: {
      x: 0,
      y: 0,
    },
    difference: {
      x: 0,
      y: 0,
    },
  });

  const updatePositions = useCallback(
    (event: MouseEvent) => {
      if (isMobile) return;

      const offset = { x: event.clientX, y: event.clientY };

      const center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      const difference = {
        x: offset.x - center.x,
        y: offset.y - center.y,
      };

      setRawPositions({
        offset,
        center,
        difference,
      });
    },
    [isMobile],
  );

  useAnimationFrame(() => {
    setPositions(rawPositions);
  });

  useWindowEventListener('mousemove', updatePositions);

  return positions;
}
