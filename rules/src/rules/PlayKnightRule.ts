import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { subjectColors } from '../material/Subject'
import { RuleId } from './RuleId'

export class PlayKnightesterRule extends PlayerTurnRule {
  getLegalMoves(player: number) {
    const moves: MaterialMove[] = []

    this.game.players.forEach((p) => {
      if (p === player) return
      const cardsInCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(p)

      subjectColors.forEach((color) => {
        if (!color) return

        const highestCard = cardsInCity.filter((card) => card.location.id === color).maxBy((card) => card.location.x!)

        const hasHighestCard = highestCard.length > 0

        if (hasHighestCard) {
          moves.push(highestCard.moveItem({ type: LocationType.InCity, player }))
        }
      })
    })
    return moves
  }
  afterItemMove(move: ItemMove, _context?: PlayMoveContext) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.PlayerHand) return []
    return [this.startRule(RuleId.MarketBuy)]
  }
}