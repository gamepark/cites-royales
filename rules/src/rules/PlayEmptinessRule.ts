import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class PlayEmptinessRule extends PlayerTurnRule {
  onRuleStart() {
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.PlayerArea)
      .moveItems({ type: LocationType.Discard })
  }
  getLegalMoves(_player: number) {
    const moves: MaterialMove[] = []

    moves.push(
      ...this.material(MaterialType.SubjectCard).location(LocationType.Market).moveItems({ type: LocationType.Discard })
    )
    return moves
  }
  afterItemMove(move: ItemMove, _context?: PlayMoveContext) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.Discard) return []
    return [this.startRule(RuleId.MarketBuy)]
  }
}
