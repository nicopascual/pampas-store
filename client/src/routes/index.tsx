import {Link, createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <Link to="/wizard">
       Start wizard flow.
      </Link>
    </div>
  )
}
