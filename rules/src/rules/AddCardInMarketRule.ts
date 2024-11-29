import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, MaterialItem } from '@gamepark/rules-api'
import { City } from '../material/City'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectCity, Subject } from '../material/Subject'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AddCardInMarketRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .dealOne({ type: LocationType.Market })]
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.Market) return []
    const moves: MaterialMove[] = []
    const card = this.material(MaterialType.SubjectCard).getItem<Subject>(move.itemIndex)
    const subjectCity = getSubjectCity(card.id)
    const marketHasRevolution = this.marketHasRevolution(subjectCity)

    if (marketHasRevolution) {
      this.memorize(Memory.Revolution, true)
      return [this.startRule(RuleId.MarketBuy)]
    } else {
      const pointsToGive = this.getVictoryPointsToGive(card)
      if (this.marketCardsNumber > 8 && pointsToGive) {
        moves.push(
          ...this.material(MaterialType.NobleToken)
            .id(this.player)
            .moveItems((item) => ({
              type: LocationType.VictoryPointsSpace,
              x: item.location.x! + pointsToGive
            }))
        )
      }
      moves.push(this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer))
      return moves
    }
  }

  getVictoryPointsToGive(card:MaterialItem) {
    if (!this.playerHasAlreadyBought && this.getMarketHasTwoCardsOfSameColor(card)) {
      const marketCardsNumber = this.marketCardsNumber
      if (marketCardsNumber > 8 && marketCardsNumber <= 12) return 1
      if (marketCardsNumber > 12 && marketCardsNumber <= 16) return 2
      if (marketCardsNumber > 16 && marketCardsNumber <= 18) return 3
      return 1
    } else {
      return 0
    }
  }

  getMarketHasTwoCardsOfSameColor(card:MaterialItem) {
    console.log(card)
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market).id(id => id !== card.id)
    const colorCounts = new Map<number, number>()

    for (const card of marketCards.getItems()) {
      const color = getSubjectCity(card.id) || 0
      const count = colorCounts.get(color) || 0
      colorCounts.set(color, count + 1)

      // Early return if any color count reaches 2
      if (colorCounts.get(color)! >= 2) return true
    }

    return false // No color with at least 2 cards found
  }

  get playerMarketToken() {
    return this.material(MaterialType.MarketToken).id(this.player)
  }
  get playerHasAlreadyBought() {
    return this.playerMarketToken.location((location) => location.type === LocationType.OnSeasonCards).length > 0
  }

  get marketCardsNumber() {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)
    const reserveCards = this.material(MaterialType.SubjectCard).location(LocationType.Reserve)
    return marketCards.length + reserveCards.length
  }

  marketHasRevolution(subjectCity?: City) {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)
    let hasRevolution = false
    if (this.marketCardsNumber > 8) {
      const cardsNumber = marketCards.filter((item) => getSubjectCity(item.id) === subjectCity).length
      if (cardsNumber > 2) hasRevolution = true
    }
    return hasRevolution
  }
}
