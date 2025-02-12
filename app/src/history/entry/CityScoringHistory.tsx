import { FC } from 'react'
import { HistoryEntry, MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { getPlayerColor } from './PlayCardHistory'
import { Trans } from 'react-i18next'
import { CityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/CityScoring'

export type CityScoringHistoryProps = {

} & MaterialHistoryProps

export const CityScoringHistory: FC<CityScoringHistoryProps> = (props) => {
  const { move, context } = props

  const playerId = usePlayerId()

  const rules = new CitesRoyalesRules(context.game)
  const nobleTokenPlayer = rules.material(MaterialType.NobleToken).index(move.itemIndex).getItem()?.id
  const name = usePlayerName(nobleTokenPlayer)

  const CityScoring = (rules.rulesStep as CityScoring)

  if(isMoveItemType(MaterialType.NobleToken)(move)){
    const isMe = playerId && nobleTokenPlayer === playerId
    return (
      <HistoryEntry player={nobleTokenPlayer} backgroundColor={getPlayerColor(nobleTokenPlayer)}>
        <Trans defaults={isMe ? 'history.scoring.you' : 'history.scoring.player'}
               values={{ player: name, points: CityScoring.getPlayerVictoryPoints(nobleTokenPlayer), city: CityScoring.city  }}>
        </Trans>
      </HistoryEntry>
    )
  }

  return null
}