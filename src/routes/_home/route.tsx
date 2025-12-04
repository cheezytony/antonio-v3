import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router';

import { useEffect } from 'react';
import { useHistory } from '@/hooks/use-history';

export const Route = createFileRoute('/_home')({
  component: RouteComponent,
});

function RouteComponent() {
  const { push } = useHistory();
  const location = useLocation();

  useEffect(() => push(location), [location]);

  return <Outlet />;
}
