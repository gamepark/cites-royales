import { FC } from 'react'
import { HistoryEntry, MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isEndGame, isMoveItemType } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { getPlayerColor } from './PlayCardHistory'
import { Trans } from 'react-i18next'

export type EndGameHistoryProps = {

} & MaterialHistoryProps

export const EndGameHistory: FC<EndGameHistoryProps> = (props) => {
  const { move, context } = props

  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId

  const rules = new CitesRoyalesRules(context.game)
  const nobleTokenPlayer = rules.material(MaterialType.NobleToken).index(move.itemIndex).getItem()?.id
  const name = usePlayerName(nobleTokenPlayer)

  if(isMoveItemType(MaterialType.NobleToken)(move)){
    return (
      <HistoryEntry player={nobleTokenPlayer} backgroundColor={getPlayerColor(nobleTokenPlayer)}>
        <Trans defaults={isMe ? 'history.end-game.hero.you' : 'history.end-game.hero.player'}
               values={{ player: name, points: 2 }}>
        </Trans>
      </HistoryEntry>
    )
  }

  if(isEndGame(move)){
    return (
      <HistoryEntry >
        <Trans defaults={'history.end-game.end'} />
      </HistoryEntry>
    )
  }

  return null
}