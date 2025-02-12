import { linkButtonCss, MaterialHistoryProps } from '@gamepark/react-game'
import { FC } from 'react'
import { MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'
import { PlayEmptinessHistory } from './entry/PlayEmptinessHistory'
import { PlayCardHistory } from './entry/PlayCardHistory'
import { css } from '@emotion/react'
import { PlayVillagerHistory } from './entry/PlayVillagerHistory'
import { PlayJesterHistory } from './entry/PlayJesterHistory'
import { PlayAssassinHistory } from './entry/PlayAssassinHistory'
import { PlayMerchantHistory } from './entry/PlayMerchantHistory'
import { PlayKnightHistory } from './entry/PlayKnightHistory'
import { PlayAstrologerHistory } from './entry/PlayAstrologerHistory'
import { MarketBuyHistory } from './entry/MarketBuyHistory'
import { AddCardInMarketHistory } from './entry/AddCardInMarketHistory'
import { CitiesConstructionHistory } from './entry/CitiesConstructionHistory'
import { CatchupHistory } from './entry/CatchupHistory'
import { SeasonEndHistory } from './entry/SeasonEndHistory'

export type CitesRoyalesHistoryProps = {
  game: MaterialGame
} & MaterialHistoryProps

export const CitesRoyalesHistory: FC<MaterialHistoryProps<MaterialGame, MaterialMove>> = (props) => {
  const { move, context } = props
  const game = context.game

  if(game.rule?.id === RuleId.PlayEmptiness){
    return <PlayEmptinessHistory move={move} context={context} />
  }

  if(game.rule?.id === RuleId.PlayVillager){
    return <PlayVillagerHistory move={move} context={context} />
  }

  if(game.rule?.id === RuleId.PlayJester){
    return <PlayJesterHistory move={move} context={context} />
  }

  if(game.rule?.id === RuleId.PlayAssassin){
    return <PlayAssassinHistory move={move} context={context} />
  }

  if(game.rule?.id === RuleId.PlayMerchant){
    return <PlayMerchantHistory move={move} context={context} />
  }

  if(game.rule?.id === RuleId.PlayKnight){
    return <PlayKnightHistory move={move} context={context} />
  }
  if(game.rule?.id === RuleId.PlayAstrologer){
    return <PlayAstrologerHistory move={move} context={context} />
  }

  if (game.rule?.id === RuleId.PlayCard){
    return <PlayCardHistory move={move} context={context} />
  }

  if(game.rule?.id === RuleId.MarketBuy){
    return <MarketBuyHistory move={move} context={context} />
  }

  if(game.rule?.id === RuleId.AddCardInMarket){
    return <AddCardInMarketHistory move={move} context={context} />
  }

  if(game.rule?.id === RuleId.CitiesConstruction){
    return <CitiesConstructionHistory move={move} context={context} />
  }

  // TODO : Scoring
  // Machin a gagné (nb) points dans (Cité), (nb) points dans (autre Cité)
  // Bidule a gagné (nb) points dans (Cité), (nb) points dans (autre Cité)
  // ou
  // Machin a gagné (nb) points dans sa cité (cité)
  // Machin a gagné (nb) points dans sa cité (autre cité)
  // Bidule a gagné (nb) points dans sa cité (cité)

  if(game.rule?.id === RuleId.CatchupBonus){
    return <CatchupHistory move={move} context={context}/>
  }

  if(game.rule?.id === RuleId.EndSeason){
    return <SeasonEndHistory move={move} context={context}/>
  }

  // TODO : Endgame ?
  // Machin gagne 2 points grâce à son héro du peuple
  // Rappel des scores

  return <></>
}

export const rulesLinkButton = [linkButtonCss, css`
  color: inherit;
  background-color: transparent;
  font-style: italic;
`]