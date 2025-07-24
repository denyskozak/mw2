import { Game } from '../components/game/game.jsx'
// import { Interface } from '../components/game/layout/Interface'


export function GameRoute() {
  return (
    <>
      <Game />
      <img className="controlKeys" src="/controls.png" alt="control keys" />
      <div className="crosshair bg-white" />
      {/*<Interface />*/}
    </>
  )
}