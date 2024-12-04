import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { cities } from '../../material/City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getSubjectCity } from '../../material/Subject'
import { CardEffectRule } from './CardEffectRule'

export class PlayKnightRule extends CardEffectRule {
  getPlayerMoves() {
    const player = this.player
    const moves: MaterialMove[] = []

    for (const p of this.game.players) {
      if (p === player) continue
      const cardsInCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(p)

      for (const city of cities) {

        const highestCard = cardsInCity.filter((card) => card.location.id === city).maxBy((card) => card.location.x!)

        const hasHighestCard = highestCard.length > 0

        if (hasHighestCard) {
          moves.push(
            ...highestCard.moveItems((item) => ({ type: LocationType.InCity, player, id: getSubjectCity(item.id) }))
          )
        }
      }
    }
    return moves
  }
  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.InCity) return []
    return [this.nextRule]
  }
}
