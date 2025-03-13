import { FC } from 'react'
import { HistoryEntry, MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { isMoveItemType, isStartRule } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { getPlayerColor } from './PlayCardHistory'
import { Trans } from 'react-i18next'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { Memory } from '@gamepark/cites-royales/rules/Memory'

export type AddCardInMarketHistoryProps = {

} & MaterialHistoryProps

export const AddCardInMarketHistory: FC<AddCardInMarketHistoryProps> = (props) => {
  const { move, context } = props

  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const isMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new CitesRoyalesRules(context.game)
  const isRevolt = rules.remind(Memory.Revolution)

  if(isMoveItemType(MaterialType.HeroCard)(move)) {
    return (
      <HistoryEntry player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
        <Trans defaults={isMe ? 'history.market-draw.hero.you' : 'history.market-draw.hero.player'}
               values={{ player: name }}>
        </Trans>
      </HistoryEntry>
    )
  } else if(isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
    return (
      <HistoryEntry player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
        <Trans defaults={isMe ? 'history.market-draw.you' : 'history.market-draw.player'}
               values={{ player: name }}>
        </Trans>
      </HistoryEntry>
    )
  } else if(isStartRule(move)){

    if(isRevolt) {
      const playerHasAlreadyBought= rules.material(MaterialType.MarketToken)
        .id(actionPlayer)
        .location(location => location.type === LocationType.OnSeasonCards).length > 0

      if(playerHasAlreadyBought){
          return (
            <HistoryEntry depth={1} player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
              <Trans defaults={isMe ? 'history.market-draw.bought.you' : 'history.market-draw.bought.player'}
                     values={{ player: name }}>
              </Trans>
            </HistoryEntry>
          )
      } else {
        const points = rules.remind(Memory.PointsToGive)
        return (
          <HistoryEntry depth={1} player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
            <Trans defaults={isMe ? 'history.market-draw.revolt.you' : 'history.market-draw.revolt.player'}
                   values={{ player: name, points: points}}>
            </Trans>
          </HistoryEntry>
        )
      }
    }
  } else if(isMoveItemType(MaterialType.NobleToken)(move) && move.location.type === LocationType.VictoryPointsSpace && !isRevolt){
    const points = rules.remind(Memory.PointsToGive)
    return (
      <HistoryEntry depth={1} player={actionPlayer} backgroundColor={getPlayerColor(actionPlayer)}>
        <Trans defaults={isMe ? 'history.market-draw.no-revolt.you' : 'history.market-draw.no-revolt.player'}
               values={{ player: name, points: points}}>
        </Trans>
      </HistoryEntry>
    )
  }
  return null
}