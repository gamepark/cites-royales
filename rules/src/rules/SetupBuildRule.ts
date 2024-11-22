import { isMoveItemType, ItemMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { minBy } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectColor, getSubjectType } from '../material/Subject'
import { NobleColor } from '../NobleColor'
import { RuleId } from './RuleId'

export class SetupBuildRule extends SimultaneousRule {
  onRuleStart() {
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.PlayerArea)
      .moveItems((item) => ({ type: LocationType.PlayerHand, player: item.location.player }))
  }
  getActivePlayerLegalMoves(player: NobleColor) {
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(player)

    const moves = playerHand
      .moveItems((item) => {
        const subjectColor = getSubjectColor(item.id)
        return subjectColor ? { type: LocationType.PlayerArea, player, id: subjectColor } : {}
      })
      .filter((move) => move.location.type)

    return moves
  }

  afterItemMove(move: ItemMove, _context?: PlayMoveContext) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerArea) {
      const player = move.location.player!
      const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(player)
      if (playerHand.length === 2) {
        return [this.endPlayerTurn(player)]
      }
    }
    return []
  }
  getMovesAfterPlayersDone() {
    const builtCards = this.material(MaterialType.SubjectCard).location(LocationType.PlayerArea)

    const smallestCard = minBy(builtCards.getItems(), (card) => getSubjectType(card.location.id))!

    const startPlayer: NobleColor = smallestCard.location.player!
    return [
      ...builtCards.moveItems((item) => ({
        type: LocationType.InCity,
        player: item.location.player,
        id: getSubjectColor(item.id),
      })),
      this.startPlayerTurn(RuleId.PlayCard, startPlayer),
    ]
  }
}
