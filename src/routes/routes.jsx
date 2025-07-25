import { createBrowserRouter } from 'react-router'
import { GameRoute } from './game.jsx'
import { MainRoute } from './main.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainRoute />,
  },
  {
    path: '/play',
    element: <GameRoute />,
  },
])
