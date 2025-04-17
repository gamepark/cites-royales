import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { MoveComponentProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { playerColorCode } from '../../panels/PlayerPanels'
import { rulesLinkButton } from '../CitesRoyalesLogs'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export type PlayCardRuleHistoryProps = {} & MoveComponentProps

export const PlayCardHistory: FC<PlayCardRuleHistoryProps> = (props) => {
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
    <Trans defaults={isMe ? 'history.play-card.you' : 'history.play-card.player'}
           values={{ player: name, type: getSubjectType(card.id), city: getSubjectCity(card.id) }}>
      <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.SubjectCard, card)} local/>
    </Trans>
  )
}

export const getPlayerColor = (player: NobleColor) => playerColorCode[player] + '50'
