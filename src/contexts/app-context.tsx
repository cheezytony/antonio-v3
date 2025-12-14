import type { PropsWithChildren } from 'react';
import { createContext, useEffect, useState } from 'react';

export interface AppContextProps {
  isLoaded: boolean;
  isReady: boolean;
}

export const AppContext = createContext({ isLoaded: false } as AppContextProps);

export function AppContextProvider({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isLoadedTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1);

    const isReadyTimeout = setTimeout(
      () => {
        setIsReady(true);
      },
      150 * (7 + 1),
    );

    return () => {
      clearTimeout(isLoadedTimeout);
      clearTimeout(isReadyTimeout);
    };
  }, []);

  return <AppContext value={{ isLoaded, isReady }}>{children}</AppContext>;
}
