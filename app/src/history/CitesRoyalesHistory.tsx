import { MaterialHistoryProps } from '@gamepark/react-game'
import { FC } from 'react'
import { MaterialGame } from '@gamepark/rules-api'

export type CitesRoyalesHistoryProps = {
  game: MaterialGame
} & MaterialHistoryProps

export const CitesRoyalesHistory: FC<MaterialHistoryProps> = (props) => {
  const { move, context } = props
  const game = context.game

  // TODO : PlayCard
  // Machin a joué une carte (Type) (Couleur) -> Effet

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
}