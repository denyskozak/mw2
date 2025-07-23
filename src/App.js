import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Game } from './components/game/game'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Game />,
  },
]);

export default function App() {

  return (
    <RouterProvider router={router} />
  )
}
