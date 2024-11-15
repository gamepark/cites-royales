import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class CityBoardSpotLocator extends Locator {
  coordinates = { x: 0, y: 30 }

  getCoordinates(location: Location, context: MaterialContext) {
    const xy = super.getCoordinates(location, context)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    if (playerIndex === 0) return xy

    return { x: 32, y: -25 + 12 * playerIndex }
  }
}

export const cityBoardSpotLocator = new CityBoardSpotLocator()
