import { createFileRoute } from '@tanstack/react-router'
import { Game } from '../components/game/game'

export const gameRoute = createFileRoute('/game')({
  component: GameRoute,
})

function GameRoute() {
  return <Game />
}