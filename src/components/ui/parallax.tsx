import { useParallax } from '@/hooks/use-parallax';
import React, { useEffect, useRef } from 'react';

interface ParallaxProps {
  resistance: number | { x: number; y: number };
  children: React.ReactNode;
}

export function Parallax({ resistance, children }: ParallaxProps) {
  const parallax = useParallax(resistance);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (elementRef.current) {
        const x = parallax.x;
        const y = parallax.y;
        elementRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        elementRef.current.style.willChange = 'transform';
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [parallax]);

  return React.cloneElement(
    children as React.ReactElement,
    { ref: elementRef } as any,
  );
}
