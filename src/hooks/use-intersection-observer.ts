import type { RefObject } from 'react';
import { useCallback, useEffect } from 'react';

export function useIntersectionObserver<TObjectType extends HTMLElement>(
  elementRef:
    | RefObject<TObjectType>
    | Array<RefObject<TObjectType>>
    | RefObject<Array<TObjectType>>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const observer = new IntersectionObserver(memoizedCallback, options);

    if (Array.isArray(elementRef)) {
      elementRef.map((ref) => {
        observer.observe(ref.current);
      });
    } else {
      if (Array.isArray(elementRef.current)) {
        elementRef.current.map((element) => {
          observer.observe(element);
        });
      } else {
        observer.observe(elementRef.current);
      }
    }

    return () => observer.disconnect();
  }, []);
}
