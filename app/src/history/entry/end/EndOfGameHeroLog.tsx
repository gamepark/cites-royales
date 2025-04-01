import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const EndOfGameHeroLog: FC<MaterialHistoryProps> = (props) => {
  const { context } = props
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)

  return (
    <Trans defaults={isMe ? 'history.end-game.hero.you' : 'history.end-game.hero.player'}
           values={{ player: name, points: 2 }}>
    </Trans>
  )
}
