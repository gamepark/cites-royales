import { isMoveItemType, ItemMove, Material, MaterialMove } from '@gamepark/rules-api'
import { cities } from '../../material/City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getSubjectCity, getSubjectType } from '../../material/Subject'
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

        const cardCanBePlacedInCity = this.cardCanBePlacedInCity(highestCard)

        if (cardCanBePlacedInCity) {
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
  cardCanBePlacedInCity(card:Material){
    if(card.length < 1) return false
    const cardItem = card.getItem()
    const cardColor = cardItem!.location.id
    const cardType = getSubjectType(cardItem!.id)

    const cardsInSameCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(this.player).filter((cityCard) => cityCard.location.id === cardColor)

    // TODO : Fix -> Il est possible de placer une carte moins haute
    const higherCityCards = cardsInSameCity.filter((cityCard) => getSubjectType(cityCard.id) < cardType)


    return higherCityCards.length < 1 || cardsInSameCity.length === 0
  }
}
