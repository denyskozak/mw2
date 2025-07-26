import { createBrowserRouter } from 'react-router'
import { GameRoute } from './game.jsx'
import { MainRoute } from './main.jsx'
import { MatchesRoute, MatchRoute } from './matches.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainRoute />,
  },
  {
    path: '/play',
    element: <GameRoute />,
  },
  {
    path: '/play/:matchId',
    element: <GameRoute />,
  },
  {
    path: '/matches',
    element: <MatchesRoute />,
  },
  {
    path: '/matches/:matchId',
    element: <MatchRoute />,
  },
])
