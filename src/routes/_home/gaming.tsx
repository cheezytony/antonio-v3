import { Header } from '@/modules/header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_home/gaming')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header pageTitle="I play" isSticky />
    </div>
  );
}
