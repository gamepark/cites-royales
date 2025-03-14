import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectRule, Subject } from '../material/Subject'
import { RuleId } from './RuleId'
import { cities } from '../material/City'

export class PlayCardRule extends PlayerTurnRule {
  onRuleStart(){
    if(this.playerHasNoCardInHand && this.playerHasNoCardInCity) return [this.startRule(RuleId.MarketBuy)]
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
          ...highestCard.moveItems({ type: LocationType.Discard})
        )
      }
    }

    // TODO : Demander à Romain bug Discard toujours en dessous
    moves.push(...this.material(MaterialType.SubjectCard)
      .location(LocationType.PlayerHand)
      .player(player)
      .moveItems({ type: LocationType.Discard }))

    moves.push(this.startRule(RuleId.MarketBuy))

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.Discard) return []

    const subjectId = this.material(MaterialType.SubjectCard).getItem<Subject>(move.itemIndex).id

    return [this.startRule(getSubjectRule(subjectId))]
  }

  get playerHasNoCardInHand() {
    return this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(this.player).length === 0
  }
  get playerHasNoCardInCity() {
    return this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(this.player).length === 0
  }
}
