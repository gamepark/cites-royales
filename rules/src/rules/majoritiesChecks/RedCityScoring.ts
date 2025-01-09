import { CityScoring } from './CityScoring'
import { City } from '../../material/City'
import { MaterialMove } from '@gamepark/rules-api'
import { NobleColor } from '../../NobleColor'

export class RedCityScoring extends CityScoring {
  city = City.Red

  getPlayerVictoryPoints(player: NobleColor): number {
    return 0
  }

  goToNextRule(): MaterialMove {
    return undefined
  }
}