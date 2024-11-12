import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { seasonCardDescription } from '../material/SeasonCardDescription'

class SeasonsCardsStackLocator extends Locator {
  getCoordinates(location: Location) {
    return { x: 20 + location.x! * seasonCardDescription.width }
  }
}

export const seasonsCardsStackLocator = new SeasonsCardsStackLocator()