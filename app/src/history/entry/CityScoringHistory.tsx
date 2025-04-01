import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { CityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/CityScoring'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export type CityScoringHistoryProps = {} & MaterialHistoryProps

export const CityScoringHistory: FC<CityScoringHistoryProps> = (props) => {
  const { move, context } = props

  const playerId = usePlayerId()

  const rules = new CitesRoyalesRules(context.game)
  const nobleTokenPlayer = rules.material(MaterialType.NobleToken).index(move.itemIndex).getItem()?.id
  const name = usePlayerName(nobleTokenPlayer)

  const CityScoring = (rules.rulesStep as CityScoring)

  const isMe = playerId && nobleTokenPlayer === playerId
  return (
    <Trans defaults={isMe ? 'history.scoring.you' : 'history.scoring.player'}
           values={{ player: name, points: CityScoring.getPlayerVictoryPoints(nobleTokenPlayer), city: CityScoring.city }}>
    </Trans>
  )
}
