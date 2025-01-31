import { usePlayerId, useRules } from '@gamepark/react-game'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { CityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/CityScoring'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'

export const CityScoringHeader = () => {
  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const cityScoring = (rules.rulesStep as CityScoring)
  const city = cityScoring.city
  const winners = cityScoring.getMajorityWinners()
  console.log(city)
  if(winners.some(winner => winner === me)){
    return (<></>)
  } else {

  }
  return (<></>)
}
//
// const WinnerHeader = ({winners}) => {
//   const me = usePlayerId<NobleColor>()
//   const rules = useRules<CitesRoyalesRules>()!
//   const cityScoring = (rules.rulesStep as CityScoring)
//
// }