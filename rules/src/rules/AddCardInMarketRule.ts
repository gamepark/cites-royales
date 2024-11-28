import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class AddCardInMarket extends PlayerTurnRule {
  onRuleStart() {
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .deal({ type: LocationType.Market }, 1)
  }
  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
      return [this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
    }
    return []
  }
}
