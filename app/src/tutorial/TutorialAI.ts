import { isCustomMove, isCustomMoveType, isMoveItem, MaterialGame } from '@gamepark/rules-api'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'
import { sample } from 'lodash'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { AddCardInMarketRule } from '@gamepark/cites-royales/rules/AddCardInMarketRule'
import { Memory } from '@gamepark/cites-royales/rules/Memory'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'

export const TutorialAI = (game: MaterialGame, player: NobleColor) => {
  const rules = new CitesRoyalesRules(game)
  let legalMoves = rules.getLegalMoves(player)

  switch(game.rule?.id){
    case RuleId.MarketBuy:
      const hasBought = rules.remind(Memory.hasBought)
      const isRevolt = rules.remind(Memory.Revolution)

      if(hasBought || isRevolt){
        if(legalMoves.length > 1 && legalMoves.some(move => isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass))){
          legalMoves = legalMoves.filter(move => !(isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)))
        }
      } else {
        const cardsInMarket = new AddCardInMarketRule(game).marketCardsNumber

        const cappedCards = Math.min(cardsInMarket, 10)

        const probabilityToBuy = 0.1 + ((0.9 - 0.1) / 9) * (cappedCards - 1)

        const random = Math.random()
        const isBuying = random < probabilityToBuy


        if(!isBuying){
          legalMoves = legalMoves.filter(move => isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass))
        } else {
          legalMoves = legalMoves.filter(move => !(isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)))
        }
      }
      break;

    case RuleId.PlayAssassin:
      legalMoves = legalMoves.filter(move => {
          return isMoveItem(move) &&
            move.location.type === LocationType.Discard &&
            !rules.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player).getIndexes().includes(move.itemIndex)
        }
      )
      break;

    case RuleId.PlayAstrologer:
    case RuleId.CitiesConstruction:
      if(legalMoves.length > 1 && legalMoves.some(move => isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass))){
        legalMoves = legalMoves.filter(move => !(isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)))
      }
      break;
  }
  return Promise.resolve([sample(legalMoves)])
}

