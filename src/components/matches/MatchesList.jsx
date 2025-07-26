import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useWS } from '../../hooks/useWS'

export const MatchesList = () => {
  const { socket, sendToSocket } = useWS()
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const handleMessage = (event) => {
      let message
      try {
        message = JSON.parse(event.data)
      } catch {
        return
      }
      if (message.type === 'MATCH_LIST') {
        setMatches(message.matches || [])
      }
    }

    socket.addEventListener('message', handleMessage)
    sendToSocket({ type: 'GET_MATCHES' })

    return () => socket.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-2">Matches</h1>
      <ul className="space-y-2">
        {matches.map((m) => (
          <li key={m.id} className="border p-2 rounded">
            <Link to={`/matches/${m.id}`}>{m.name || m.id}</Link>
            <span className="ml-2 text-sm text-gray-400">
              {(m.players?.length || 0)}/{m.maxPlayers}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
