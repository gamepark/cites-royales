import { FC } from 'react'
import { HistoryEntry, MaterialHistoryProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import { rulesLinkButton } from '../CitesRoyalesHistory'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { getPlayerColor } from './PlayCardHistory'
import { isMoveItemType, MaterialMoveBuilder } from '@gamepark/rules-api'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'

export type PlayVillagerRuleHistoryProps = {

} & MaterialHistoryProps

export const PlayVillagerHistory: FC<PlayVillagerRuleHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)
  rules.play(move)

  if (isMoveItemType(MaterialType.SubjectCard)(move)) {
    const game = context.game
    const card = game.items[MaterialType.SubjectCard]![move.itemIndex]
    return (
      <HistoryEntry depth={1} player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
        <Trans defaults={isMe ? 'history.villager.you' : 'history.villager.player'}
               values={{ player: name, type: getSubjectType(card.id), city: getSubjectCity(card.id) }}>
          <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.SubjectCard, card)} local />
        </Trans>
      </HistoryEntry>
    )
  }

  return null
}