import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { Memory } from '@gamepark/cites-royales/rules/Memory'
import { MoveComponentProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const MarketDrawRevoltLog: FC<MoveComponentProps> = (props) => {
  const { context } = props
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)
  const points = rules.remind(Memory.PointsToGive)
  return (
    <Trans defaults={isMe ? 'history.market-draw.revolt.you' : 'history.market-draw.revolt.player'}
           values={{ player: name, points: points}}>
    </Trans>
  )
}
