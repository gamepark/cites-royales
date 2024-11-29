import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { subjectColors } from '../../material/Subject'
import { RuleId } from '../RuleId'
import { CardEffectRule } from './CardEffectRule'

export class PlayVillagerRule extends CardEffectRule {
  getPlayerMoves() {
    const player = this.player
    const moves: MaterialMove[] = []
    const cardsInCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)

    for (const color of subjectColors) {
      if (!color) continue

      const highestCard = cardsInCity.filter((card) => card.location.id === color).maxBy((card) => card.location.x!)

      const hasHighestCard = highestCard.length > 0

      if (hasHighestCard) {
        moves.push(highestCard.moveItem({ type: LocationType.PlayerHand, player }))
      }
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.PlayerHand) return []
    return [this.startRule(RuleId.MarketBuy)]
  }
}
