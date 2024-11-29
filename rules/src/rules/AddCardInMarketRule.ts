import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectColor, subjectColors } from '../material/Subject'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AddCardInMarketRule extends PlayerTurnRule {
  onRuleStart() {
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .deal({ type: LocationType.Market }, 1)
  }
  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
      const marketHasRevolution = this.marketHasRevolution()

      if (marketHasRevolution) {
        this.memorize(Memory.Revolution, true, this.player)
        return [this.startRule(RuleId.MarketBuy)]
      } else {
        return [this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
      }
    }
    return []
  }
  marketHasRevolution() {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)
    const reserveCards = this.material(MaterialType.SubjectCard).location(LocationType.Reserve)

    let hasRevolution = false
    if (marketCards.length + reserveCards.length >= 8) {
      for (const color of subjectColors) {
        const cardsNumber = marketCards.filter((item) => getSubjectColor(item.id) === color).length
        if (cardsNumber > 2) hasRevolution = true
      }
    }
    return hasRevolution
  }
}
