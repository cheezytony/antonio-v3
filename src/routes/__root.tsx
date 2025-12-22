import { AppContextProvider } from '@/contexts/app.context';
import { HistoryProvider } from '@/contexts/history.context';
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => {
    return (
      <HistoryProvider>
        <AppContextProvider>
          <HeadContent />

          <Outlet />

          {/* <TanStackRouterDevtools /> */}
        </AppContextProvider>
      </HistoryProvider>
    );
  },
});
