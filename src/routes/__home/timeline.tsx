import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__home/timeline')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__home/timeline"!</div>;
}
