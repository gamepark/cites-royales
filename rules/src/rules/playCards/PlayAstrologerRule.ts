import { CustomMove, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { cities, City } from '../../material/City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getSubjectCity, getSubjectType, Subject } from '../../material/Subject'
import { CustomMoveType } from '../CustomMoveType'
import { CardEffectRule } from './CardEffectRule'
import { Memory } from '../Memory'

export class PlayAstrologerRule extends CardEffectRule {
  onRuleStart() {
    for (const player of this.game.players) {

      this.memorize(Memory.CitiesWithColorBuild, [], player)
      this.memorize(Memory.CitiesWithWhiteBuild, [], player)
    }
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .deal({ type: LocationType.ActionHand, player: this.player }, 3)
  }
  getPlayerMoves() {
    const player = this.player
    const moves: MaterialMove[] = []
    const actionHand = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand)
    const inCityCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)

    for (const city of cities) {
      const sameCityCards = actionHand.filter(card => getSubjectCity(card.id) === city)
      const inSameCityCards = inCityCards.filter(card => card.location.id === city)
      const highestSameCityCard = inSameCityCards.maxBy(card => getSubjectType(card.id)).getItem()


      const cardsCanBuild = sameCityCards.filter(card => {
        return highestSameCityCard ? card.id > highestSameCityCard.id : true
      })

      moves.push(...cardsCanBuild.moveItems({type:LocationType.InCity, player:this.player, id:city}))
    }

    const citiesWithColorBuild = this.remind<City[]>(Memory.CitiesWithColorBuild, player)

    const whiteCards = actionHand.id<Subject>(id => !getSubjectCity(id))
    for(const city of cities){
      const inCityCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player).filter(card => card.location.id === city)

      const highestCityCard = inCityCards.maxBy(card => getSubjectType(card.id)).getItem()
      const cardsCanBuild = whiteCards.filter(card => {
        const subjectType = getSubjectType(card.id)
        if(highestCityCard && subjectType <= getSubjectType(highestCityCard.id)) return false
        if(citiesWithColorBuild.includes(city)) return true
        return actionHand.id<Subject>(id => getSubjectCity(id) === city && subjectType < getSubjectType(id)).length > 0
      })

      moves.push(...cardsCanBuild.moveItems({ type: LocationType.InCity, player, id: city }))
    }

    if (this.remind<City[]>(Memory.CitiesWithWhiteBuild, player).every(city => citiesWithColorBuild.includes(city))) {
      moves.push(this.customMove(CustomMoveType.Pass, { player }))
    }

    return moves
  }
  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [
        ...this.material(MaterialType.SubjectCard)
          .location(LocationType.ActionHand)
          .moveItems({ type: LocationType.Discard }),
        this.nextRule
      ]
    }
    return []
  }
  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.InCity) return moves

    const cardColor = getSubjectCity(this.material(MaterialType.SubjectCard).getItem<Subject>(move.itemIndex).id)
    if (cardColor === undefined) {
      this.remind<City[]>(Memory.CitiesWithWhiteBuild, move.location.player).push(move.location.id)
    } else {
      this.remind<City[]>(Memory.CitiesWithColorBuild, move.location.player).push(move.location.id)
    }

    const remainingCards = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand)

    if (remainingCards.length === 1) {
      moves.push(
        this.material(MaterialType.SubjectCard)
          .location(LocationType.ActionHand)
          .moveItem({ type: LocationType.Discard })
      )

      moves.push(this.nextRule)
    }

    return moves
  }

  onRuleEnd() {
    this.forget(Memory.CitiesWithColorBuild)
    this.forget(Memory.CitiesWithWhiteBuild)
    return []
  }
}
