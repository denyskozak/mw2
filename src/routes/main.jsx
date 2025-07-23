import { createFileRoute } from '@tanstack/react-router'

export const mainRoute = createFileRoute('/')({
  component: Main,
  id: 'main'
})

function Main() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}