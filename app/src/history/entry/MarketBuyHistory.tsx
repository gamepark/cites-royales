import { HistoryEntry, MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { Memory } from '@gamepark/cites-royales/rules/Memory'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { isCustomMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'
import { getPlayerColor } from './PlayCardHistory'
import { Trans } from 'react-i18next'
import { getSubjectType } from '@gamepark/cites-royales/material/Subject'

export type MarketBuyProps = {

} & MaterialHistoryProps

export const MarketBuyHistory: FC<MarketBuyProps> = (props) => {
  const { move, context } = props

  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)
  rules.play(move)

  if(isCustomMove(move) && move.type === (CustomMoveType.Pass)){
    const cardIndexes = rules.remind(Memory.BoughtCards, actionPlayer)
    const cards = rules.material(MaterialType.SubjectCard).index(index => cardIndexes && cardIndexes.includes(index))
    const influence = cards.entries
      .map(entry => entry[1])
      .reduce((influence: number, card) => influence + getSubjectType(card.id), 0)

    return (
      <HistoryEntry player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
        <Trans defaults={isMe ? 'history.market-buy.you' : 'history.market-buy.player'}
               values={{ player: name, cards:cards.length, influence:influence }}>
        </Trans>
      </HistoryEntry>
    )
  }


  return null
}