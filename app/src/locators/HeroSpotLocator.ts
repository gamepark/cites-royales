import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cityBoardSpotLocator } from './CityBoardSpotLocator'

class HeroSpotLocator extends Locator {
  coordinates = { x: 39, y: 25 }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = cityBoardSpotLocator.getCoordinates(location, context)
    return { x: x + 25, y: y - 5 }
  }
}

export const heroSpotLocator = new HeroSpotLocator()
