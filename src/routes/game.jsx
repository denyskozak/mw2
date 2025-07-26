import { Game } from '../components/game/game.jsx'
import { Interface } from '../components/game/interface/Interface'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useGameState } from '../storage/game-state.js'


export function GameRoute() {
  const { matchId } = useParams()
  const setJoinedMatch = useGameState((s) => s.setJoinedMatch)

  useEffect(() => {
    setJoinedMatch(matchId || null)
  }, [matchId, setJoinedMatch])

  return (
    <>
      <Game matchId={matchId} />
      <img className="controlKeys" src="/controls.png" alt="control keys" />
      <div className="crosshair" />
      <Interface />
    </>
  )
}