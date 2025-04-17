import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { Memory } from '@gamepark/cites-royales/rules/Memory'
import { MoveComponentContext, MoveComponentProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'

export type CitiesConstructionHistoryProps = {} & MoveComponentProps

// TODO : Voir avec Romain
export const CitiesConstructionHistory: FC<CitiesConstructionHistoryProps> = (props) => {
  const { context, move } = props

  return context.game.players.map((actionPlayer: NobleColor) => {
    return ( <p><CitiesConstructionHistoryEntry key={actionPlayer} actionPlayer={actionPlayer} context={context}
                                           move={move} /></p>)
  })
}

export type CitiesConstructionHistoryEntryProps = {
  actionPlayer: NobleColor
  context: MoveComponentContext
} & MoveComponentProps

const CitiesConstructionHistoryEntry: FC<CitiesConstructionHistoryEntryProps> = (props) => {
  const { actionPlayer, context } = props
  const playerId = usePlayerId()
  const isMe = playerId && actionPlayer === playerId;
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)

  const builtCards =
    rules.remind(Memory.CitiesWithWhiteBuild, actionPlayer).length +
    rules.remind(Memory.CitiesWithColorBuild, actionPlayer).length

  if(builtCards < 1){
    return (
      <Trans
        defaults={isMe ? "history.build.you.not" : "history.build.player.not"}
        values={{ player: name}}
      />
    )
  } else {
    return (
      <Trans
        defaults={isMe ? "history.build.you" : "history.build.player"}
        values={{ player: name, cards: builtCards }}
      />
    )
  }
}