import { useLayoutEffect } from 'react';

export function useWindowEventListener<TEventName extends keyof WindowEventMap>(
  eventName: TEventName,
  handler: (event: WindowEventMap[TEventName]) => void,
) {
  useLayoutEffect(() => {
    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
}
