import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__home/my-socials')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__home/my-socials"!</div>;
}
