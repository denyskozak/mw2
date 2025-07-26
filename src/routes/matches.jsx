import { MatchesList } from '../components/matches/MatchesList.jsx'
import { MatchDetails } from '../components/matches/MatchDetails.jsx'

export function MatchesRoute() {
  return <MatchesList />
}

export function MatchRoute() {
  return <MatchDetails />
}
