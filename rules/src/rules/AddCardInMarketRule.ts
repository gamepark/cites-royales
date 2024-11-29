import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectColor, Subject, SubjectColor } from '../material/Subject'
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
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.Market) return []
    const moves: MaterialMove[] = []
    const card = this.material(MaterialType.SubjectCard).getItem<Subject>(move.itemIndex)
    const subjectColor = getSubjectColor(card.id)
    const marketHasRevolution = this.marketHasRevolution(subjectColor)

    if (marketHasRevolution) {
      this.memorize(Memory.Revolution, true, this.player)
      return [this.startRule(RuleId.MarketBuy)]
    } else {
      if (this.getMarketCardsNumber() > 8) {
        moves.push(
          ...this.material(MaterialType.NobleToken)
            .id(this.player)
            .moveItems((item) => ({
              type: LocationType.VictoryPointsSpace,
              x: item.location.x! + this.getVictoryPointsToGive()
            }))
        )
      }
      moves.push(this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer))
      return moves
    }
  }

  getVictoryPointsToGive() {
    const marketCardsNumber = this.getMarketCardsNumber()
    if (marketCardsNumber > 8 && marketCardsNumber <= 12) return 1
    if (marketCardsNumber > 12 && marketCardsNumber <= 16) return 2
    if (marketCardsNumber > 16 && marketCardsNumber <= 18) return 3
    return 1
  }

  getMarketCardsNumber() {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)
    const reserveCards = this.material(MaterialType.SubjectCard).location(LocationType.Reserve)
    return marketCards.length + reserveCards.length
  }

  marketHasRevolution(subjectColor: SubjectColor) {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)
    let hasRevolution = false
    if (this.getMarketCardsNumber() >= 8) {
      const cardsNumber = marketCards.filter((item) => getSubjectColor(item.id) === subjectColor).length
      if (cardsNumber > 2) hasRevolution = true
    }
    return hasRevolution
  }
}
