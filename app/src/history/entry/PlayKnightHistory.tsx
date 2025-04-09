import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import { MoveComponentContext, MoveComponentProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { rulesLinkButton } from '../CitesRoyalesLogs'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export type PlayKnightHistoryProps = {

} & MoveComponentProps

export const PlayKnightHistory: FC<PlayKnightHistoryProps> = (props) => {
  const { move, context } = props


    const game = context.game
    const card = game.items[MaterialType.SubjectCard]![move.itemIndex]
    return (
      <PlayKnightHistoryEntry move={move} context={context} card={card} />
    )
}

type PlayKnightHistoryEntryProps = {
  move:any,
  context:MoveComponentContext
  card: MaterialItem
}

const PlayKnightHistoryEntry: FC<PlayKnightHistoryEntryProps> = ({ move, context, card }) => {
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)

  const targetName = usePlayerName(card.location.player)
  rules.play(move)

  return (
      <Trans defaults={isMe ? 'history.knight.you' : 'history.knight.player'}
             values={{ player: name, type: getSubjectType(card.id), city: getSubjectCity(card.id), target:targetName}}>
        <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.SubjectCard, card)} local />
      </Trans>
  )
}
