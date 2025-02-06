import { FC } from 'react'
import {
  HistoryEntry,
  HistoryEntryContext,
  MaterialHistoryProps,
  PlayMoveButton,
  usePlayerId,
  usePlayerName
} from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import { rulesLinkButton } from '../CitesRoyalesHistory'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { getPlayerColor } from './PlayCardHistory'
import { isMoveItemType, MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export type PlayAssassinHistoryProps = {

} & MaterialHistoryProps

export const PlayAssassinHistory: FC<PlayAssassinHistoryProps> = (props) => {
  const { move, context } = props


  if (isMoveItemType(MaterialType.SubjectCard)(move)) {
    const game = context.game
    const card = game.items[MaterialType.SubjectCard]![move.itemIndex]
    return (
      <PlayAssassinHistoryEntry move={move} context={context} card={card} />
    )
  }

  return null
}

type PlayAssassinHistoryEntryProps = {
  move:any,
  context:HistoryEntryContext
  card: MaterialItem
}

const PlayAssassinHistoryEntry: FC<PlayAssassinHistoryEntryProps> = ({ move, context, card }) => {
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)

  const targetName = usePlayerName(card.location.player)
  rules.play(move)

  return (
    <HistoryEntry depth={1} player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
      <Trans defaults={isMe ? 'history.assassin.you' : 'history.assassin.player'}
             values={{ player: name, type: getSubjectType(card.id), city: getSubjectCity(card.id), target:targetName}}>
        <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.SubjectCard, card)} local />
      </Trans>
    </HistoryEntry>
  )
}