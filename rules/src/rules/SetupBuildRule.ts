import { isMoveItemType, ItemMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NobleColor } from '../NobleColor'
import { RuleId } from './RuleId'

export class SetupBuildRule extends SimultaneousRule {
  onRuleStart() {
    return this.game.players.flatMap((player) => {
      return this.material(MaterialType.SubjectCard)
        .location(LocationType.PlayerArea)
        .player(player)
        .moveItems({ type: LocationType.PlayerHand, player })
    })
  }
  getActivePlayerLegalMoves(player: NobleColor) {
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(player)
    return playerHand.moveItems((item) => ({ type: LocationType.PlayerArea, player, id: item.id }))
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

    const smallestCard = builtCards.getItems().reduce((minCard, card) => {
      const minCardValue = minCard.location.id % 10
      const currentCardValue = card.location.id % 10
      // Gérer les ties
      return currentCardValue < minCardValue ? card : minCard
    })

    const startPlayer: NobleColor = smallestCard.location.player!
    this.memorize('StartPlayer', startPlayer)
    return [this.startPlayerTurn(RuleId.PlayerTurn, startPlayer)]
  }
}
