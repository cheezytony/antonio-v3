import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__home/contact-me')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__home/contact-me"!</div>;
}
