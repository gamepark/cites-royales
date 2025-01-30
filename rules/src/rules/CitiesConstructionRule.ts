import {
  CustomMove,
  isMoveItemType,
  ItemMove,
  MaterialMove,
  PlayMoveContext,
  SimultaneousRule
} from '@gamepark/rules-api'
import { cities, City } from '../material/City'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectCity, getSubjectType, Subject } from '../material/Subject'
import { NobleColor } from '../NobleColor'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class CitiesConstructionRule extends SimultaneousRule {
  onRuleStart() {
    for (const player of this.game.players) {
      this.memorize(Memory.CitiesWithColorBuild, [], player)
      this.memorize(Memory.CitiesWithWhiteBuild, [], player)
    }
    return []
  }

  getActivePlayerLegalMoves(player: NobleColor) {
    const moves: MaterialMove[] = []
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(player)
    const inCityCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)


    for (const city of cities) {
      const sameCityCards = playerHand.filter(card => getSubjectCity(card.id) === city)
      const inSameCityCards = inCityCards.filter(card => card.location.id === city)
      const highestSameCityCard = inSameCityCards.maxBy(card => getSubjectType(card.id)).getItem()


      const cardsCanBuild = sameCityCards.filter(card => {
        return highestSameCityCard ? card.id > highestSameCityCard.id : true
      })

      moves.push(...cardsCanBuild.moveItems({ type: LocationType.InCity, player, id: city }))
    }

    const citiesWithColorBuild = this.remind<City[]>(Memory.CitiesWithColorBuild, player)

    const whiteCards = playerHand.id<Subject>(id => !getSubjectCity(id))
    for (const city of cities) {
        const inCityCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player).filter(card => card.location.id === city)

        const highestCityCard = inCityCards.maxBy(card => getSubjectType(card.id)).getItem()
        const cardsCanBuild = whiteCards.filter(card => {
          const subjectType = getSubjectType(card.id)
          if (highestCityCard && subjectType <= getSubjectType(highestCityCard.id)) return false
          if (citiesWithColorBuild.includes(city)) return true
          return playerHand.id<Subject>(id => getSubjectCity(id) === city && subjectType < getSubjectType(id)).length > 0
        })

        moves.push(...cardsCanBuild.moveItems({ type: LocationType.InCity, player, id: city }))
    }

    if (this.remind<City[]>(Memory.CitiesWithWhiteBuild, player).every(city => citiesWithColorBuild.includes(city))) {
      moves.push(this.customMove(CustomMoveType.Pass, { player }))
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity) {
      const cardColor = getSubjectCity(this.material(MaterialType.SubjectCard).getItem<Subject>(move.itemIndex).id)
      if (cardColor === undefined) {
        this.remind<City[]>(Memory.CitiesWithWhiteBuild, move.location.player).push(move.location.id)
      } else {
        this.remind<City[]>(Memory.CitiesWithColorBuild, move.location.player).push(move.location.id)
      }
    }
    return []
  }

  onCustomMove(move: CustomMove, _context?: PlayMoveContext) {
    if (move.type === CustomMoveType.Pass) return [this.endPlayerTurn(move.data.player)]
    return []
  }

  getMovesAfterPlayersDone() {
    return [this.startPlayerTurn(RuleId.PurpleMajority, this.remind(Memory.LastPlayerToBuy))]
  }

  onRuleEnd() {
    this.forget(Memory.CitiesWithColorBuild)
    this.forget(Memory.CitiesWithWhiteBuild)
    this.forget(Memory.LastPlayerToBuy)
    return []
  }
}