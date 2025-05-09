import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { cities } from '../../material/City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CardEffectRule } from './CardEffectRule'

export class PlayAssassinRule extends CardEffectRule {
  onRuleStart(){
    if(!this.getPlayerMoves().length) return [this.nextRule]
    return []
  }
  getPlayerMoves() {
    const moves: MaterialMove[] = []

    this.game.players.forEach((p) => {
      const cardsInCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(p)

      for (const city of cities) {

        const highestCard = cardsInCity.filter((card) => card.location.id === city).maxBy((card) => card.location.x!)

        const hasHighestCard = highestCard.length > 0

        if (hasHighestCard) {
          moves.push(highestCard.moveItem({ type: LocationType.Discard }))
        }
      }
    })
    return moves
  }
  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.Discard) return []
    return [this.nextRule]
  }
}
