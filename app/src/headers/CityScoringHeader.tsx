import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { CityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/CityScoring'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { Trans } from 'react-i18next'

export const CityScoringHeader = () => {
  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const cityScoring = (rules.rulesStep as CityScoring)
  const city = cityScoring.city
  console.log(city)
  const winners = cityScoring.getMajorityWinners()
  if(winners.some(winner => winner === me)){
    return (<WinnerMeHeader />)
  } else {
    return (<></>)
  }
}

const WinnerMeHeader = () => {
  const me = usePlayerId<NobleColor>()!
  const rules = useRules<CitesRoyalesRules>()!
  const cityScoring = (rules.rulesStep as CityScoring)
  const city = cityScoring.city
  const points = cityScoring.getPlayerVictoryPoints(me);
  const playerName = usePlayerName(me)
  return (
    <Trans
    values={{
      player: playerName,
      city,
      vp: points
    }}
    />
  )
}