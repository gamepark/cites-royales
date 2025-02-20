import { HistoryEntry, MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { Memory } from '@gamepark/cites-royales/rules/Memory'
import { isCustomMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'
import { getPlayerColor } from './PlayCardHistory'
import { Trans } from 'react-i18next'
import { getSubjectType, Subject } from '@gamepark/cites-royales/material/Subject'
import { sumBy } from 'lodash'

export type MarketBuyProps = {

} & MaterialHistoryProps

export const MarketBuyHistory: FC<MarketBuyProps> = (props) => {
  const { move, context } = props

  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)

  if(isCustomMove(move) && move.type === (CustomMoveType.Pass)){
    const cardIds = rules.remind<Subject[]>(Memory.BoughtCards, actionPlayer)
    const influence = sumBy(cardIds, cardId => getSubjectType(cardId))


    return (
      <HistoryEntry player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
        <Trans defaults={isMe ? 'history.market-buy.you' : 'history.market-buy.player'}
               values={{ player: name, cards:cardIds.length, influence:influence }}>
        </Trans>
      </HistoryEntry>
    )
  }


  return null
}