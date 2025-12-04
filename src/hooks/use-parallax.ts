import { useMemo } from 'react';
import { useCursor } from './use-cursor';

export function useParallax(resistance: number | { x: number; y: number }) {
  const { difference } = useCursor();

  return useMemo(() => {
    const resistanceX =
      typeof resistance === 'number' ? resistance : resistance.x;
    const resistanceY =
      typeof resistance === 'number' ? resistance : resistance.y;

    return {
      x: difference.x / resistanceX,
      y: difference.y / resistanceY,
    };
  }, [difference, resistance]);
}
