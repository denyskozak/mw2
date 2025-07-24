import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router'
import { GameRoute } from './routes/game.jsx'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GameRoute />,
  },
])

export default function App() {

  return (
    <RouterProvider router={router} />
  )
}
