import type { PropsWithChildren } from 'react';
import { createContext, useEffect, useState } from 'react';

export interface AppContextProps {
  canStartLoader: boolean;
  canHideLoader: boolean;
  canShowRoute: boolean;
}

export const AppContext = createContext<AppContextProps>({
  canStartLoader: false,
  canHideLoader: false,
  canShowRoute: false,
});

export function AppContextProvider({ children }: PropsWithChildren) {
  const [canStartLoader, setcanStartLoader] = useState(false);
  const [canHideLoader, setcanHideLoader] = useState(false);
  const [canShowRoute, setCanShowRoute] = useState(false);

  useEffect(() => {
    const canStartLoaderTimeout = setTimeout(() => {
      setcanStartLoader(true);
    }, 1);

    const canHideLoaderTimeout = setTimeout(() => {
      setcanHideLoader(true);
    }, 1200);

    const canShowRouteTimeout = setTimeout(() => {
      setCanShowRoute(true);
    }, 1700);

    return () => {
      clearTimeout(canStartLoaderTimeout);
      clearTimeout(canHideLoaderTimeout);
      clearTimeout(canShowRouteTimeout);
    };
  }, []);

  return (
    <AppContext
      value={{
        canStartLoader,
        canHideLoader,
        canShowRoute,
      }}
    >
      {children}
    </AppContext>
  );
}
