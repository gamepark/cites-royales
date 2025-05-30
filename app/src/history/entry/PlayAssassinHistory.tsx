import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import {
  MoveComponentContext,
  MoveComponentProps,
  PlayMoveButton,
  usePlayerId,
  usePlayerName
} from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { rulesLinkButton } from '../CitesRoyalesLogs'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export type PlayAssassinHistoryProps = {} & MoveComponentProps

export const PlayAssassinHistory: FC<PlayAssassinHistoryProps> = (props) => {
  const { move, context } = props
  const game = context.game
  const card = game.items[MaterialType.SubjectCard]![move.itemIndex]
  return (
    <PlayAssassinHistoryEntry context={context} card={card}/>
  )
}

type PlayAssassinHistoryEntryProps = {
  context: MoveComponentContext
  card: MaterialItem
}

const PlayAssassinHistoryEntry: FC<PlayAssassinHistoryEntryProps> = ({ context, card }) => {
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)

  const targetName = usePlayerName(card.location.player)

  return (
    <Trans defaults={isMe ? 'history.assassin.you' : 'history.assassin.player'}
           values={{ player: name, type: getSubjectType(card.id), city: getSubjectCity(card.id), target: targetName }}>
      <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.SubjectCard, card)} local/>
    </Trans>
  )
}
