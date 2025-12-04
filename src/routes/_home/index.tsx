import { createFileRoute } from '@tanstack/react-router'
import { Tiles } from '../../modules/tiles'

export const Route = createFileRoute('/_home/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'Antonio',
        description: 'Welcome to the home page of our application.',
      }
    ],
  }),
})

function App() {
  return (
    <div>
      <Tiles />
    </div>
  )
}
