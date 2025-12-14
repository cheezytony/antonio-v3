import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__home/my-projects')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__home/my-projects"!</div>
}
