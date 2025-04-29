import { isMoveItemType, ItemMove, Material, MaterialMove } from '@gamepark/rules-api'
import { cities, City } from '../../material/City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getSubjectCity, getSubjectType } from '../../material/Subject'
import { CardEffectRule } from './CardEffectRule'

export class PlayKnightRule extends CardEffectRule {
  onRuleStart(){
    if(!this.getPlayerMoves().length) return [this.nextRule]
    return []
  }
  getPlayerMoves() {
    const player = this.player
    const moves: MaterialMove[] = []

    for (const p of this.game.players) {
      if (p === player) continue
      const cardsInCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(p)

      for (const city of cities) {

        const highestCard = cardsInCity.filter((card) => card.location.id === city).maxBy((card) => card.location.x!)

        if(getSubjectCity(highestCard.getItem()?.id) === undefined) {
          for(const cityColor of cities){
            const cardCanBePlacedInCity = this.cardCanBePlacedInCity(highestCard, cityColor)

            if (cardCanBePlacedInCity) {
              moves.push(
                ...highestCard.moveItems({ type: LocationType.InCity, player, id: cityColor })
              )
            }
          }
        } else {
          const cardCanBePlacedInCity = this.cardCanBePlacedInCity(highestCard, city)
          if (cardCanBePlacedInCity) {
            moves.push(
              ...highestCard.moveItems({ type: LocationType.InCity, player, id: city })
            )
          }
        }
      }
    }
    return moves
  }
  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.InCity) return []
    return [this.nextRule]
  }
  cardCanBePlacedInCity(card:Material, city: City){
    if(card.length < 1) return false
    const cardItem = card.getItem()
    const cardType = getSubjectType(cardItem!.id)

    const cardsInSameCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(this.player).filter((cityCard) => cityCard.location.id === city)

    const higherCityCards = cardsInSameCity.filter((cityCard) => {
      return getSubjectType(cityCard.id) >= cardType
    })

    return  (higherCityCards.length < 1 || cardsInSameCity.length === 0)
  }
}
