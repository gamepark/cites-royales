import { CustomMove, isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectType, SubjectType } from '../material/Subject'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class PlayCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    const player = this.player
    return [
      ...this.material(MaterialType.SubjectCard)
        .location(LocationType.PlayerHand)
        .player(player)
        .moveItems((item) => ({ type: LocationType.Discard, player, id: item.id })),
      this.customMove(CustomMoveType.Pass)
    ]
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.Discard) return []

    const cardValue = getSubjectType(move.location.id)

    switch (cardValue) {
      case SubjectType.Emptiness:
        return [this.startRule(RuleId.PlayEmptiness)]
      case SubjectType.Villager:
        return [this.startRule(RuleId.PlayVillager)]
      case SubjectType.Jester:
        return [this.startRule(RuleId.PlayJester)]
      case SubjectType.Assassin:
        return [this.startRule(RuleId.PlayAssassin)]
      case SubjectType.Merchant:
        return [this.startRule(RuleId.PlayMerchant)]
      case SubjectType.Knight:
        return [this.startRule(RuleId.PlayKnight)]
      case SubjectType.Astrologer:
        return [this.startRule(RuleId.PlayAstrologer)]
    }
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [this.startRule(RuleId.MarketBuy)]
    }
    return []
  }
}
