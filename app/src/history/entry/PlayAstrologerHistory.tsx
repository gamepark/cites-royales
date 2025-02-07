import { FC } from 'react'
import { HistoryEntry, MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { getPlayerColor } from './PlayCardHistory'
import { isMoveItemType } from '@gamepark/rules-api'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'

export type PlayAstrologerRuleHistoryProps = {

} & MaterialHistoryProps

export const PlayAstrologerHistory: FC<PlayAstrologerRuleHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)
  rules.play(move)

  const cardsInActionHand = rules.material(MaterialType.SubjectCard).location(LocationType.ActionHand).length === 0
  if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Discard && cardsInActionHand) {
    const builtCards = 3 - context.action.consequences.filter(consequence => consequence.itemType === MaterialType.SubjectCard).length

    return (
      <HistoryEntry depth={1} player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
        <Trans defaults={isMe ? 'history.astrologer.you' : 'history.astrologer.player'}
               values={{ player: name, cards:builtCards}}>
        </Trans>
      </HistoryEntry>
    )
  }

  return null
}