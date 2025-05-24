import { createFileRoute } from '@tanstack/react-router'
import { Tiles } from '../../modules/tiles'

export const Route = createFileRoute('/_home/')({
  component: App,
})

function App() {
  return (
    <div>
      <Tiles />
    </div>
  )
}
