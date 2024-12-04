import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectRule } from '../material/Subject'
import { RuleId } from './RuleId'
import { cities } from '../material/City'

export class PlayCardRule extends PlayerTurnRule {
  onRuleStart(){
    if(this.playerHasNoCardInHand) return [this.startRule(RuleId.MarketBuy)]
    return []
  }

  getPlayerMoves() {
    const moves:MaterialMove[] = []
    const player = this.player

    const cardsInCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)

    for (const city of cities) {
      const highestCard = cardsInCity.filter((card) => card.location.id === city).maxBy((card) => card.location.x!)
      const hasHighestCard = highestCard.length > 0

      if (hasHighestCard) {
        moves.push(
          ...highestCard.moveItems((item) => ({ type: LocationType.Discard, player, id: item.id }))
        )
      }
    }

    moves.push(...this.material(MaterialType.SubjectCard)
      .location(LocationType.PlayerHand)
      .player(player)
      .moveItems((item) => ({ type: LocationType.Discard, player, id: item.id })))

    moves.push(this.startRule(RuleId.MarketBuy))

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.Discard) return []

    return [this.startRule(getSubjectRule(move.location.id))]
  }

  get playerHasNoCardInHand() {
    return this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(this.player).length === 0
  }
}
