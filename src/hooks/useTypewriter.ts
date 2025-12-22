import { useLayoutEffect, useMemo, useRef, useState } from 'react';

export interface UseTypewriterOptions {
  interval?: number;
  delay?: number;
  index?: number;
}

export function useTypewriter(
  text: string,
  { interval = 150, delay = 0, index }: UseTypewriterOptions,
) {
  const startingIndex = useMemo(() => (index != undefined ? 0 : null), [index]);
  const startingText = useMemo(
    () => (startingIndex != null ? text.slice(0, startingIndex + 1) : ''),
    [startingIndex, text],
  );
  const [renderedText, setRenderedText] = useState(startingText);

  const previousIndex = useRef<number | null>(startingIndex);

  const typingTimeout = useRef<number>(null);

  const type = () => {
    const nextIndex =
      typeof previousIndex.current === 'number' ? previousIndex.current + 1 : 0;

    if (nextIndex >= text.length) {
      return pause();
    }

    const nextCharacter = text[nextIndex];

    setRenderedText((prev) => prev + nextCharacter);

    previousIndex.current = nextIndex;
  };

  const play = () => {
    type();

    typingTimeout.current = setTimeout(() => play(), interval);
  };

  const pause = () => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
  };

  const reset = () => {
    pause();
    setRenderedText(startingText);
    previousIndex.current = startingIndex;
  };

  useLayoutEffect(() => {
    const delayTimeout = setTimeout(() => {
      play();
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      reset();
    };
  }, [text, interval]);

  return renderedText;
}
