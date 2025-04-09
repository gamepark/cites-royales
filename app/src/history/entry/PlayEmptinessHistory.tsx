import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import { MaterialHistoryProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { rulesLinkButton } from '../CitesRoyalesLogs'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export type PlayEmptinessRuleHistoryProps = {} & MaterialHistoryProps

export const PlayEmptinessHistory: FC<PlayEmptinessRuleHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)
  rules.play(move)
  const game = context.game
  const card = game.items[MaterialType.SubjectCard]![move.itemIndex]
  return (
    <Trans defaults={isMe ? 'history.emptiness.you' : 'history.emptiness.player'}
           values={{ player: name, type: getSubjectType(card.id), city: getSubjectCity(card.id) }}>
      <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.SubjectCard, card)} local/>
    </Trans>
  )
}
