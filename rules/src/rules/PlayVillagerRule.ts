import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { subjectColors } from '../material/Subject'
import { RuleId } from './RuleId'

export class PlayVillagerRule extends PlayerTurnRule {
  getLegalMoves(player: number): MaterialMove[] {
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

  afterItemMove(move: ItemMove, _context?: PlayMoveContext) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.PlayerHand) return []
    return [this.startRule(RuleId.MarketBuy)]
  }
}
