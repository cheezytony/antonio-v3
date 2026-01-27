// src/routes/__root.tsx
/// <reference types="vite/client" />
import { Provider } from '@/components/ui/provider';
import { AppContextProvider } from '@/contexts/app.context';
import { HistoryProvider } from '@/contexts/history.context';
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Funnel+Display&display=swap',
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <Provider defaultTheme="dark" forcedTheme="dark">
      <HistoryProvider>
        <AppContextProvider>
          <RootDocument>
            <Outlet />
          </RootDocument>
        </AppContextProvider>
      </HistoryProvider>
    </Provider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
