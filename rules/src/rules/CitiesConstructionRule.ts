import { CustomMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { NobleColor } from '../NobleColor'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { cities } from '../material/City'
import { getSubjectCity, getSubjectType, Subject } from '../material/Subject'
import { CustomMoveType } from './CustomMoveType'

export class CitiesConstructionRule extends SimultaneousRule {
  onRuleStart(){
    return []
  }

  getActivePlayerLegalMoves(player: NobleColor){
    const moves:MaterialMove[]=[]
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(player)
    const inCityCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)


    for (const city of cities) {
      const sameCityCards = playerHand.filter(card => getSubjectCity(card.id) === city)
      const inSameCityCards = inCityCards.filter(card => card.location.id === city)
      const highestSameCityCard = inSameCityCards.maxBy(card => getSubjectType(card.id)).getItem()


      const cardsCanBuild = sameCityCards.filter(card => {
        return highestSameCityCard ? card.id > highestSameCityCard.id : true
      })

      moves.push(...cardsCanBuild.moveItems({type:LocationType.InCity, player, id:city}))
    }

    const whiteCards = playerHand.id<Subject>(id => !getSubjectCity(id))
    for (const city of cities) {
      const inCityCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player).filter(card => card.location.id === city)

      if(inCityCards.length > 0){
        const highestCityCard = inCityCards.maxBy(card => getSubjectType(card.id)).getItem()
        const cardsCanBuild = whiteCards.filter(card => {
          return highestCityCard ? card.id > getSubjectType(highestCityCard.id) : true
        })

        moves.push(...cardsCanBuild.moveItems({type:LocationType.InCity, player, id:city}))
      }
    }

    moves.push(this.customMove(CustomMoveType.Pass, {player}))
    return moves
  }
  getMovesAfterPlayersDone(){
    return []
  }
  onCustomMove(_move: CustomMove, _context?: PlayMoveContext) {
    if(_move.type === CustomMoveType.Pass) return [this.endPlayerTurn(_move.data.player)]
    return []
  }
}