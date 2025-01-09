import { CityScoring } from './CityScoring'
import { cities, City } from '../../material/City'
import { NobleColor } from '../../NobleColor'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { getSubjectCity, Subject } from '../../material/Subject'
import { RuleId } from '../RuleId'

export class YellowCityScoring extends CityScoring {
  city = City.Yellow

  getPlayerVictoryPoints(player: NobleColor): number {
    const playerCityCards = this.material(MaterialType.SubjectCard)
      .location(LocationType.InCity)
      .player(player);

    let maxCityCards = 0;

    for (const city of cities) {
      const cityCards = playerCityCards.id<Subject>(id => getSubjectCity(id) === city);

      const cityLength = cityCards.length

      if (cityLength > maxCityCards) {
        maxCityCards = cityLength;
      }
    }

    return maxCityCards;
  }

  goToNextRule(): MaterialMove {
    return this.startRule(RuleId.PinkMajority)
  }
}