import { MaterialGame } from '@gamepark/rules-api'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'
import { sample } from 'lodash'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { AddCardInMarketRule } from '@gamepark/cites-royales/rules/AddCardInMarketRule'

export const TutorialAI = (game: MaterialGame, player: NobleColor) => {
  const rules = new CitesRoyalesRules(game)
  let legalMoves = rules.getLegalMoves(player)

  switch(game.rule?.id){
    case RuleId.MarketBuy:
      const cardsInMarket = new AddCardInMarketRule(game).marketCardsNumber
      console.log(cardsInMarket)
      break;
  }
  return Promise.resolve([sample(legalMoves)])
}

