import { CityScoring } from './CityScoring'
import { City } from '../../material/City'
import { NobleColor } from '../../NobleColor'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { RuleId } from '../RuleId'

export class GreenCityScoring extends CityScoring {
  city = City.Green

  getPlayerVictoryPoints(player: NobleColor): number {
    const playerCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)

    let points = Math.floor(playerCards.length / 3)

    return points === 0 ? 1 : points
  }


  goToNextRule(): MaterialMove {
    return this.startRule(RuleId.EndSeason)
  }


}