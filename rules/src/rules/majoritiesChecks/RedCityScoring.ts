import { CityScoring } from './CityScoring'
import { cities, City } from '../../material/City'
import { MaterialMove } from '@gamepark/rules-api'
import { NobleColor } from '../../NobleColor'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { RuleId } from '../RuleId'

export class RedCityScoring extends CityScoring {
  city = City.Red

  getPlayerVictoryPoints(player: NobleColor): number {
    const playerInCityCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)

    let points = 0
    for (const city of cities){
      const playerCityCards = playerInCityCards.location(location => location.id === city)

      if(playerCityCards.length >= 2) points++
    }

    return points === 0 ? 1 : points
  }

  goToNextRule(): MaterialMove {
    return this.startRule(RuleId.BlueMajority)
  }
}