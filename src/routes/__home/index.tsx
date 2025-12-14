import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__home/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
