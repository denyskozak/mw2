import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { useWS } from '../../hooks/useWS'

export const MatchDetails = () => {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const { socket, sendToSocket } = useWS(matchId)
  const [match, setMatch] = useState(null)

  useEffect(() => {
    const handleMessage = (event) => {
      let message
      try {
        message = JSON.parse(event.data)
      } catch {
        return
      }
      if (message.type === 'GET_MATCH' && message.match?.id === matchId) {
        setMatch(message.match)
      }
    }

    socket.addEventListener('message', handleMessage)
    sendToSocket({ type: 'GET_MATCH', matchId })

    return () => socket.removeEventListener('message', handleMessage)
  }, [matchId])

  if (!match) return <div className="p-4">Loading...</div>

  const handleJoin = () => {
    navigate(`/play/${matchId}`)
  }

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl">Match {match.name || match.id}</h2>
      <div>Players: {(match.players?.length || 0)}/{match.maxPlayers}</div>
      <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={handleJoin}>
        Join
      </button>
      <div>
        <Link to="/matches">Back to list</Link>
      </div>
    </div>
  )
}
