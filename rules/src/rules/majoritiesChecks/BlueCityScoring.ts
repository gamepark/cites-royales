import { CityScoring } from './CityScoring'
import { cities, City } from '../../material/City'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { NobleColor } from '../../NobleColor'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { getSubjectType, SubjectType } from '../../material/Subject'
import { RuleId } from '../RuleId'

export class BlueCityScoring extends CityScoring {
  city = City.Blue

  getPlayerVictoryPoints(player: NobleColor): number {
    const playerInCityCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)

    let points = 0
    for(const city of cities){
      const cityCards = playerInCityCards.location(location => location.id === city)


      if(this.hasVillager(cityCards) || this.hasJester(cityCards)) points++
    }

    return points === 0 ? 1 : points
  }

  goToNextRule(): MaterialMove {
    return this.startRule(RuleId.GreenMajority)
  }

  hasVillager(cityCards:Material){
    return cityCards.getItems().some(card => getSubjectType(card.id) === SubjectType.Villager)
  }
  hasJester(cityCards:Material){
    return cityCards.getItems().some(card => getSubjectType(card.id) === SubjectType.Jester)
  }
}