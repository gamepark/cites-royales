import { CityScoring } from './CityScoring'
import { getSubjectCity, getSubjectType, Subject, SubjectType } from '../../material/Subject'
import { City } from '../../material/City'
import { NobleColor } from '../../NobleColor'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '../CustomMoveType'

export class PurpleCityScoring extends CityScoring {
  onRuleStart() {
    const moves:MaterialMove[] = []
    const hasMajority = this.hasMajority(City.Purple)

    for(const winner of hasMajority.winners){
      const playerVictoryPoints = this.getPlayerVictoryPoints(winner)
      moves.push(this.customMove(CustomMoveType.Score, {points:playerVictoryPoints, player:winner}))
    }

    return moves
  }

  getPlayerVictoryPoints(player:NobleColor) {
    const playerPurpleCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player).id<Subject>(id=> getSubjectCity(id) === City.Purple)
    const highestCard = playerPurpleCards.maxBy(card => getSubjectType(card.id)).getItem()

    let points = 0
    for(const card of playerPurpleCards.getItems()){
      if(this.hasTopCrown(getSubjectType(card.id)) && getSubjectType(card.id) === getSubjectType(highestCard?.id)) points++
      if(this.hasBottomCrown(getSubjectType(card.id))) points++
    }
    return points
  }

  goToNextRule():any[]{
    return []
  }

  hasTopCrown(type:SubjectType):boolean {
    return type === SubjectType.Villager || type === SubjectType.Knight || type === SubjectType.Astrologer
  }

  hasBottomCrown(type:SubjectType):boolean {
    return type === SubjectType.Emptiness ||
      type === SubjectType.Jester ||
      type === SubjectType.Assassin ||
      type === SubjectType.Merchant ||
      type === SubjectType.Knight ||
      type === SubjectType.Astrologer;
  }
}