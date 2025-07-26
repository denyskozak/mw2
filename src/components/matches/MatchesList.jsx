import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useWS } from '../../hooks/useWS'
import { MatchCreateForm } from './MatchCreateForm.jsx'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'

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
    <Flex direction="column" p="4">
      <Heading size="4" mb="2">
        Matches
      </Heading>
      <MatchCreateForm />
      <Flex direction="column" gap="2" asChild>
        <ul>
          {matches.map((m) => (
            <Card key={m.id} asChild>
              <li className="list-none">
                <Flex justify="between" align="center">
                  <Link to={`/matches/${m.id}`}>{m.name || m.id}</Link>
                  <Text color="gray" size="2">
                    {(m.players?.length || 0)}/{m.maxPlayers}
                  </Text>
                </Flex>
              </li>
            </Card>
          ))}
        </ul>
      </Flex>
    </Flex>
  )
}
