import { CityScoring } from './CityScoring'
import { City } from '../../material/City'
import { NobleColor } from '../../NobleColor'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { getSubjectCity, Subject } from '../../material/Subject'
import { RuleId } from '../RuleId'

export class PinkCityScoring extends CityScoring {
  city= City.Pink;

  getPlayerVictoryPoints(player: NobleColor): number {
    const playerPinkCityCards = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player).id<Subject>(id => getSubjectCity(id) === this.city)

    const influence = this.getCityInfluence(playerPinkCityCards)

    return Math.floor(influence / 3) === 0 ? 1 : Math.floor(influence / 3)
  }

  goToNextRule(): MaterialMove {
    return this.startRule(RuleId.RedMajority)
  }
}