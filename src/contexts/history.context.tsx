import type { ParsedLocation } from '@tanstack/react-router';
import { useLocation } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
  const location = useLocation();

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

  useEffect(() => push(location), [location.pathname]);

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}
