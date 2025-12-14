import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__home/gaming')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__home/gaming"!</div>;
}
