import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectCity, Subject } from '../material/Subject'
import { RuleId } from './RuleId'


export class EndSeasonRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []

    moves.push(this.material(MaterialType.SeasonCard).id(this.season).rotateItem(true))

    const drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()

    if (this.marketCards.length < 4) {
      moves.push(drawPile.dealOne({ type: LocationType.Market }))
    } else {
      moves.push(...this.material(MaterialType.MarketToken).moveItems({ type: LocationType.MarketTokenSpot }))
      moves.push(this.startRule(RuleId.CatchupBonus))
    }

    return moves
  }

  get season() {
    const marketTokens = this.material(MaterialType.MarketToken).location(LocationType.OnSeasonCards)
    return marketTokens.getItems()[0].location.id
  }

  get marketCards() {
    return this.material(MaterialType.SubjectCard).location(LocationType.Market)
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
      const newCardColor = getSubjectCity(this.material(move.itemType).getItem<Subject>(move.itemIndex).id)
      const drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
      if (this.marketCards.index(index => index !== move.itemIndex).getItems<Subject>().some(item => getSubjectCity(item.id) === newCardColor)) {
        moves.push(this.material(move.itemType).index(move.itemIndex).moveItem({ type: LocationType.Discard }))
        moves.push(drawPile.dealOne({ type: LocationType.Market }))
      } else if (this.marketCards.length < 4) {
        moves.push(drawPile.dealOne({ type: LocationType.Market }))
      } else {
        moves.push(...this.material(MaterialType.MarketToken).moveItems({ type: LocationType.MarketTokenSpot }))
        moves.push(this.startRule(RuleId.CatchupBonus))
      }
    }

    return moves
  }
}
