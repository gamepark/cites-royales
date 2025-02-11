import { HistoryEntry, MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { isCustomMove } from '@gamepark/rules-api'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { Memory } from '@gamepark/cites-royales/rules/Memory'
import { getPlayerColor } from './PlayCardHistory'
import { Trans } from 'react-i18next'

export type CitiesConstructionHistoryProps = {

} & MaterialHistoryProps

export const CitiesConstructionHistory: FC<CitiesConstructionHistoryProps> = (props) => {
  const playerId = usePlayerId()
  const { move, context } = props
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)

  if(isCustomMove(move)){
    const builtCards = rules.remind(Memory.CitiesWithWhiteBuild, actionPlayer).length + rules.remind(Memory.CitiesWithColorBuild, actionPlayer).length
    return (
      <HistoryEntry player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
        <Trans defaults={isMe ? 'history.build.you' : 'history.build.player'}
               values={{ player: name, cards: builtCards}}/>
      </HistoryEntry>
    )
  }
  return null
}