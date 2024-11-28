import { isMoveItemType, ItemMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NobleColor } from '../NobleColor'
import { RuleId } from './RuleId'

export class SetupDraftRule extends SimultaneousRule {
  getActivePlayerLegalMoves(player: NobleColor) {
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(player)

    return this.getNeighborsToGiveCard(player)
      .flatMap((neighbor) => playerHand.moveItems({ type: LocationType.PlayerArea, player: neighbor, id: player }))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerArea) {
      const player = move.location.id
      const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(player)
      if (playerHand.length === 1) {
        return [this.endPlayerTurn(player)]
      }
    }
    return []
  }

  getMovesAfterPlayersDone() {
    return [this.startSimultaneousRule(RuleId.SetupBuild)]
  }

  getNeighborsToGiveCard(player: NobleColor) {
    const cardsToGive = this.cardsToGive
    return this.getNeighbors(player).filter((neighbor) =>
      this.getNumberOfCardsReceivedFromMe(neighbor, player) < cardsToGive
    )
  }

  get cardsToGive() {
    return this.game.players.length === 2 ? 2 : 1
  }

  getNeighbors(player: NobleColor) {
    const index = this.game.players.indexOf(player)
    return this.game.players.filter(
      (_, i, players) => Math.abs(index - i) === 1 || Math.abs(index - i) === players.length - 1
    )
  }

  getNumberOfCardsReceivedFromMe(neighbor: NobleColor, player: NobleColor) {
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.PlayerArea)
      .player(neighbor)
      .locationId(player)
      .length
  }
}
