import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { NobleColor } from '../NobleColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class SetupDraftRule extends SimultaneousRule {
  onRuleStart() {
    const deck = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()

    while (!this.twoWhiteCardsInHands) {
      let moves: MaterialMove[] = []

      this.game.players.flatMap((player) => {
        moves.push(
          ...this.material(MaterialType.SubjectCard)
            .location(LocationType.PlayerHand)
            .player(player)
            .moveItems({ type: LocationType.DrawPile })
        )

        moves.push(deck.shuffle())

        moves.push(...deck.deal({ type: LocationType.PlayerHand, player }, 3))

        return
      })
    }

    return this.game.players.flatMap((player) => deck.deal({ type: LocationType.PlayerHand, player }, 3))
  }
  getActivePlayerLegalMoves(player: NobleColor) {
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(player)
    const neighbors = this.getNeighbors(player)
    const cardsToGive = this.game.players.length === 2 ? 2 : 1

    return neighbors
      .filter(
        (neighbor) =>
          this.material(MaterialType.SubjectCard).location(LocationType.PlayerArea).player(neighbor).locationId(player)
            .length < cardsToGive
      )
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

  getNeighbors(player: NobleColor) {
    const index = this.game.players.indexOf(player)
    return this.game.players.filter(
      (_, i, players) => Math.abs(index - i) === 1 || Math.abs(index - i) === players.length - 1
    )
  }
  twoWhiteCardsInHands(player: NobleColor) {
    const whiteCards = this.material(MaterialType.SubjectCard)
      .location(LocationType.PlayerHand)
      .player(player)
      .filter((item) => item.id < 10)

    if (whiteCards.length > 2) return true
    else return false
  }
}
