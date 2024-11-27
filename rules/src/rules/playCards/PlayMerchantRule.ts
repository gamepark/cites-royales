import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class PlayMerchantRule extends PlayerTurnRule {
  getPlayerMoves() {
    const player = this.player
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.Market)
      .moveItems({ type: LocationType.PlayerHand, player })
  }
  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.PlayerHand) return []
    return [this.startRule(RuleId.MarketBuy)]
  }
}
