import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectRule } from '../material/Subject'
import { RuleId } from './RuleId'

export class PlayCardRule extends PlayerTurnRule {
  onRuleStart(){
    if(this.playerHasNoCardInHand) return [this.startRule(RuleId.MarketBuy)]
    return []
  }

  getPlayerMoves() {
    const player = this.player
    return [
      ...this.material(MaterialType.SubjectCard)
        .location(LocationType.PlayerHand)
        .player(player)
        .moveItems((item) => ({ type: LocationType.Discard, player, id: item.id })),
      this.startRule(RuleId.MarketBuy)
    ]
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.Discard) return []

    return [this.startRule(getSubjectRule(move.location.id))]
  }

  get playerHasNoCardInHand() {
    return this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(this.player).length === 0
  }
}
