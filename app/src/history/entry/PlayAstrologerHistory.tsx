import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { MoveComponentProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export type PlayAstrologerRuleHistoryProps = {} & MoveComponentProps

export const PlayAstrologerHistory: FC<PlayAstrologerRuleHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)
  rules.play(move)
  const builtCards = 3 - context.action.consequences.filter(consequence => consequence.itemType === MaterialType.SubjectCard).length

  return (
    <Trans defaults={isMe ? 'history.astrologer.you' : 'history.astrologer.player'}
           values={{ player: name, cards: builtCards }}>
    </Trans>
  )
}
