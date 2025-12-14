import { useLayoutEffect } from 'react';

export function useDOMEventListener<
  TEventName extends keyof HTMLElementEventMap,
>(
  eventName: TEventName,
  handler: EventListenerOrEventListenerObject,
  element: Element = document.body,
) {
  useLayoutEffect(() => {
    element.addEventListener(eventName, handler, { capture: true });

    return () => {
      element.removeEventListener(eventName, handler, { capture: true });
    };
  }, [eventName, handler]);
}
