import { HistoryProvider } from '@/contexts/history';
import { Cursor } from '@/modules/cursor';
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => {
    return (
      <HistoryProvider>
        <HeadContent />
        <Outlet />
        <TanStackRouterDevtools />
        <Cursor />
      </HistoryProvider>
    );
  },
});
