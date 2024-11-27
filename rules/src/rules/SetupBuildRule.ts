import { isMoveItemType, ItemMove, SimultaneousRule } from '@gamepark/rules-api'
import { minBy } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectColor, getSubjectType, isWhite, Subject } from '../material/Subject'
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
    return playerHand
      .id<Subject>(subject => !isWhite(subject))
      .moveItems((item) => ({ type: LocationType.PlayerArea, player, id: getSubjectColor(item.id) }))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerArea) {
      return [this.endPlayerTurn(move.location.player!)]
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
