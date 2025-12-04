import { useCursor } from '@/hooks/use-cursor';
import { useWindowEventListener } from '@/hooks/use-window-event-listener';
import { Circle } from '@chakra-ui/react';
import { useAnimationFrame } from 'framer-motion';
import { useCallback, useMemo, useRef, useState } from 'react';

const CURSOR_SIZE = 40;

export function Cursor() {
  const { offset } = useCursor();
  const outlineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useWindowEventListener(
    'mousedown',
    useCallback(() => setIsMouseDown(true), []),
  );
  useWindowEventListener(
    'mouseup',
    useCallback(() => setIsMouseDown(false), []),
  );
  useWindowEventListener(
    'mousemove',
    useCallback(() => {
      setIsActive(true);
      setIsMoving(true);
      setTimeout(() => setIsMoving(false), 200);
    }, []),
  );

  const cursorSize = useMemo(() => {
    if (isMouseDown) {
      return CURSOR_SIZE * 1.25;
    }
    if (isMoving) {
      return CURSOR_SIZE * 0.75;
    }
    return CURSOR_SIZE;
  }, [isMouseDown, isMoving]);

  useAnimationFrame(() => {
    if (outlineRef.current) {
      const outline = outlineRef.current;
      const scale = cursorSize / CURSOR_SIZE;
      outline.style.width = `${cursorSize}px`;
      outline.style.height = `${cursorSize}px`;
      outline.style.transform = `translate3d(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px), 0) scale(${scale})`;
    }

    if (dotRef.current) {
      const dot = dotRef.current;
      dot.style.transform = `translate3d(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px), 0)`;
    }
  });

  return (
    <>
      <Circle
        ref={outlineRef}
        bg="whiteAlpha.300"
        border="2px solid"
        borderColor="white"
        borderRadius="full"
        hideBelow="md"
        left={0}
        mixBlendMode="difference"
        opacity={isActive ? 1 : 0}
        pointerEvents="none"
        pos="fixed"
        top={0}
        transition="transform 150ms, opacity 500ms, width 250ms, height 250ms"
        transitionTimingFunction="linear"
        willChange="transform, width, height, opacity"
        zIndex={999999}
      />
      <Circle
        ref={dotRef}
        bg="black"
        borderRadius="full"
        hideBelow="md"
        left={0}
        pointerEvents="none"
        pos="fixed"
        size={3}
        top={0}
        transform="auto"
        transitionDuration="50ms"
        transitionTimingFunction="ease-out"
        willChange="transform"
        zIndex={999999}
      />
    </>
  );
}
