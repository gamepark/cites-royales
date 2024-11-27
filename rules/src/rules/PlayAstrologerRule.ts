import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectColor } from '../material/Subject'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayAstrologerRule extends PlayerTurnRule {
  onRuleStart() {
    const dealCards = this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .deal({ type: LocationType.PlayerHand, player: this.player }, 3)

    this.memorize<number[]>(
      Memory.Astrologer,
      dealCards.map((card) => card.itemIndex)
    )
    return dealCards
  }
  getLegalMoves(player: number) {
    const moves: MaterialMove[] = []
    const playerHand = this.material(MaterialType.SubjectCard).index(this.remind<number[]>(Memory.Astrologer))

    moves.push(...playerHand.moveItems((item) => ({ type: LocationType.InCity, player, id: getSubjectColor(item.id) })))
    moves.push(this.customMove(CustomMoveType.Pass))

    return moves
  }
  afterItemMove(move: ItemMove, _context?: PlayMoveContext) {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.InCity) return moves

    this.memorize<number[]>(Memory.Astrologer, (indexes) => indexes.filter((index) => index !== move.itemIndex))

    const remainingCards = this.remind<number[]>(Memory.Astrologer)

    if (remainingCards.length === 1) {
      moves.push(this.material(MaterialType.SubjectCard).index(remainingCards).moveItem({ type: LocationType.Discard }))

      moves.push(this.startRule(RuleId.MarketBuy))
    }

    return moves
  }
  onRuleEnd() {
    this.forget(Memory.Astrologer)
    return []
  }
}
