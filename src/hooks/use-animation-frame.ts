import { useEffect } from 'react';

export function useAnimationFrame(callback: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let animationFrameId: number;

    const render = () => {
      callback();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [callback, enabled]);
}
