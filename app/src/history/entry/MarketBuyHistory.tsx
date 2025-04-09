import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { getSubjectType, Subject } from '@gamepark/cites-royales/material/Subject'
import { Memory } from '@gamepark/cites-royales/rules/Memory'
import { MoveComponentProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { sumBy } from 'lodash'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export type MarketBuyProps = {} & MoveComponentProps

export const MarketBuyHistory: FC<MarketBuyProps> = (props) => {
  const { context } = props
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)

  const cardIds = rules.remind<Subject[]>(Memory.BoughtCards, actionPlayer)
  const influence = sumBy(cardIds, cardId => getSubjectType(cardId))


  return (
    <Trans defaults={isMe ? 'history.market-buy.you' : 'history.market-buy.player'}
           values={{ player: name, cards: cardIds.length, influence: influence }}>
    </Trans>
  )
}
