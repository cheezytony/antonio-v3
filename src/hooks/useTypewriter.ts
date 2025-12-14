import { useLayoutEffect, useRef, useState } from 'react';

export function useTypewriter(text: string, interval: number) {
  const [renderedText, setRenderedText] = useState('');
  const previousIndex = useRef<number | null>(null);
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
    setRenderedText('');
    previousIndex.current = null;
  };

  useLayoutEffect(() => {
    play();

    return () => reset();
  }, [text, interval]);

  return renderedText;
}
