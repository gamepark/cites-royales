import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectType, Subject, SubjectType } from '../material/Subject'
import { PlayAssassinRule } from './playCards/PlayAssassinRule'
import { PlayAstrologerRule } from './playCards/PlayAstrologerRule'
import { PlayEmptinessRule } from './playCards/PlayEmptinessRule'
import { PlayJesterRule } from './playCards/PlayJesterRule'
import { PlayKnightRule } from './playCards/PlayKnightRule'
import { PlayMerchantRule } from './playCards/PlayMerchantRule'
import { PlayVillagerRule } from './playCards/PlayVillagerRule'
import { RuleId } from './RuleId'

export class PlayCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    const player = this.player
    return [
      ...this.cardsInHand
        .id<Subject>(subject => this.canPlaySubjectEffect(subject))
        .moveItems((item) => ({ type: LocationType.Discard, player, id: item.id })),
      this.startRule(RuleId.MarketBuy)
    ]
  }

  get cardsInHand() {
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.PlayerHand)
      .player(this.player)
  }

  canPlaySubjectEffect(subject: Subject) {
    return this.getSubjectRule(getSubjectType(subject)).getPlayerMoves().length > 0
  }

  getSubjectRule(subjectType: SubjectType) {
    switch (subjectType) {
      case SubjectType.Emptiness:
        return new PlayEmptinessRule(this.game)
      case SubjectType.Villager:
        return new PlayVillagerRule(this.game)
      case SubjectType.Jester:
        return new PlayJesterRule(this.game)
      case SubjectType.Assassin:
        return new PlayAssassinRule(this.game)
      case SubjectType.Merchant:
        return new PlayMerchantRule(this.game)
      case SubjectType.Knight:
        return new PlayKnightRule(this.game)
      case SubjectType.Astrologer:
        return new PlayAstrologerRule(this.game)
    }
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
}
