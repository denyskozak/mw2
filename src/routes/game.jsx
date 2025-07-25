import { Game } from '../components/game/game.jsx'
import { Interface } from '../components/game/interface/Interface'


export function GameRoute() {
  return (
    <>
      <Game />
      <img className="controlKeys" src="/controls.png" alt="control keys" />
      <div className="crosshair" />
      <Interface />
    </>
  )
}