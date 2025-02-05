import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class CityBoardSpotLocator extends Locator {
  coordinates = { x: 0, y: 30 }

  getCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player) || 4

    return { x: 32, y: -34 + 17.5 * playerIndex }
  }
}

export const cityBoardSpotLocator = new CityBoardSpotLocator()
