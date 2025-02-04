import { useAnimation, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { CityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/CityScoring'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { Trans } from 'react-i18next'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { City } from '@gamepark/cites-royales/material/City'

export const CityScoringHeader = () => {
  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const cityScoring = (rules.rulesStep as CityScoring)
  const city = cityScoring.city
  const animation = useAnimation<MaterialMove>()

  if(animation && isMoveItemType(MaterialType.NobleToken)(animation.move)){
    const winner = rules.material(MaterialType.NobleToken).getItem<NobleColor>(animation.move.itemIndex).id
    const points = cityScoring.getPlayerVictoryPoints(winner)
    if(winner === me){
      return (<WinnerMeHeader city={city} points={points} />)
    } else {
      return (<WinnerPlayerHeader city={city} points={points} player={winner} />)
    }
  }
  return <></>
}

type WinnerMeHeaderProps = {
  city: City,
  points: number
}

const WinnerMeHeader = ({city, points} : WinnerMeHeaderProps) => {
  return (
    <Trans
      defaults="header.scoring.you"
      values={{
        city,
        vp: points
      }}
    />
  )
}

type WinnerPlayerHeaderProps = {
  city:City,
  player:NobleColor,
  points: number
}
const WinnerPlayerHeader = ({city, player, points} : WinnerPlayerHeaderProps) => {
  const playerName = usePlayerName(player)
  return (
    <Trans
      defaults="header.scoring.player"
      values={{
        player: playerName,
        city,
        vp:points
      }}
    />
)
}