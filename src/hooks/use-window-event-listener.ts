import { useLayoutEffect } from 'react';

export function useWindowEventListener<
  TEventName extends keyof HTMLElementEventMap,
>(
  eventName: TEventName,
  handler: EventListenerOrEventListenerObject,
  element: Element | Window = window,
) {
  useLayoutEffect(() => {
    element.addEventListener(eventName, handler, { capture: true });

    return () => {
      element.removeEventListener(eventName, handler, { capture: true });
    };
  }, [eventName, handler]);
}
