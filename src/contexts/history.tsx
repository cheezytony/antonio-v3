import { createContext, useCallback, useMemo, useState } from 'react';
import type { ParsedLocation } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

interface HistoryContextProps {
  history: Array<ParsedLocation>;
  current?: ParsedLocation;
  last?: ParsedLocation;
  push: (item: ParsedLocation) => void;
}

export const HistoryContext = createContext<HistoryContextProps>(
  {} as HistoryContextProps,
);

export function HistoryProvider({ children }: Readonly<PropsWithChildren>) {
  const [history, setHistory] = useState<Array<ParsedLocation>>([]);

  const current = history.at(-1);
  const last = history[history.length - 2];
  const push = useCallback(
    (item: ParsedLocation) => setHistory([...history, item]),
    [history],
  );

  const value = useMemo(
    () => ({ history, last, current, push }),
    [history, last, current],
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}
