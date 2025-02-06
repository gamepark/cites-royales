import { HistoryEntry, MaterialHistoryProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { isMoveItemType, MaterialMoveBuilder } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp
import { rulesLinkButton } from '../CitesRoyalesHistory'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { playerColorCode } from '../../panels/PlayerPanels'

export type PlayCardRuleHistoryProps = {} & MaterialHistoryProps

export const PlayCardHistory: FC<PlayCardRuleHistoryProps> = (props) => {
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
      <HistoryEntry player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
        <Trans defaults={isMe ? 'history.play-card.you' : 'history.play-card.player'}
               values={{ player: name, type: getSubjectType(card.id), city:getSubjectCity(card.id) }}>
          <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.SubjectCard, card)} local/>
        </Trans>
      </HistoryEntry>
    )
  }

  return null
}

export const getPlayerColor = (player: NobleColor) => playerColorCode[player] + '50'