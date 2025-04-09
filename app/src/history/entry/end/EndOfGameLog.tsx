import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const EndOfGameLog: FC<MoveComponentProps> = (props) => {
  const { context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)

  return (
    <Trans defaults="history.end-game.end"
           values={{ player: name, points: 2 }}>
    </Trans>
  )
}
