import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const MarketDrawUseHeroLog: FC<MaterialHistoryProps> = (props) => {
  const { context } = props
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)

  return (
    <Trans defaults={isMe ? 'history.market-draw.hero.you' : 'history.market-draw.hero.player'}
           values={{ player: name }}>
    </Trans>
  )
}
