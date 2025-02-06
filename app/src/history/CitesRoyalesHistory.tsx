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

export type CitesRoyalesHistoryProps = {
  game: MaterialGame
} & MaterialHistoryProps

export const CitesRoyalesHistory: FC<MaterialHistoryProps<MaterialGame, MaterialMove>> = (props) => {
  const { move, context } = props
  const game = context.game

  // TODO : PlayCard
  // Machin a joué une carte (Type) (Couleur) -> Effet
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

  if (game.rule?.id === RuleId.PlayCard){
    return <PlayCardHistory move={move} context={context} />
  }

  // TODO : MarketBuy
  // Machin a acheté (nb) carte(s) pour (PurchasingPower)
  // Machin a provoqué une révolte et doit acheter des cartes au marché.
  // Bidule et Chouette gagnent (nb) points.

  // TODO : AddCardInMarket

  // Machin a utilisé son héros du peuple
  // Machin a ajouté une carte au marché, n'a pas provoqué de révolte et gagne (nb) points.

  // TODO : Construction
  // Machin a construit (nb) carte(s)

  // TODO : Scoring
  // Machin a gagné (nb) points dans (Cité), (nb) points dans (autre Cité)
  // Bidule a gagné (nb) points dans (Cité), (nb) points dans (autre Cité)
  // ou
  // Machin a gagné (nb) points dans sa cité (cité)
  // Machin a gagné (nb) points dans sa cité (autre cité)
  // Bidule a gagné (nb) points dans sa cité (cité)

  // TODO : Catchup ?
  // Machin a pioché (nb) cartes en fin de saison.

  // TODO : EndSeason
  // La Saison (Nom de Saison) se termine.

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