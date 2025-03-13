import { CityScoring } from './CityScoring'
import { City } from '../../material/City'
import { NobleColor } from '../../NobleColor'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { RuleId } from '../RuleId'

export class PinkCityScoring extends CityScoring {
  city= City.Pink;

  getPlayerVictoryPoints(player: NobleColor): number {
    const playerPinkCityCards = this.material(MaterialType.SubjectCard)
      .location(LocationType.InCity)
      .player(player)
      .location(location => location.id === this.city)

    const influence = this.getCityInfluence(playerPinkCityCards)

    return Math.floor(influence / 3) === 0 ? 1 : Math.floor(influence / 3)
  }

  goToNextRule(): MaterialMove {
    return this.startRule(RuleId.RedMajority)
  }
}