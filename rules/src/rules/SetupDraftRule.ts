import { SimultaneousRule } from '@gamepark/rules-api'
import { NobleColor } from '../NobleColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class SetupDraftRule extends SimultaneousRule {
  onRuleStart() {
    const deck = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()

    return this.game.players.flatMap((player) => deck.deal({ type: LocationType.PlayerHand, player }, 3))
  }
  getActivePlayerLegalMoves(playerId: NobleColor) {
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(playerId)
    const neighbors = this.getNeighbors(playerId)

    return neighbors.flatMap((player) => playerHand.moveItems({ type: LocationType.PlayerArea, player }))
  }
  getMovesAfterPlayersDone() {
    return []
  }

  getNeighbors(player: NobleColor) {
    const index = this.game.players.indexOf(player)
    return this.game.players.filter(
      (_, i, players) => Math.abs(index - i) === 1 || Math.abs(index - i) === players.length - 1
    )
  }
}
