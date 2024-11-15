import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class HeroSpotLocator extends Locator {
  coordinates = { x: 39, y: 25 }

  getCoordinates(location: Location, context: MaterialContext) {
    const xy = super.getCoordinates(location, context)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    if (playerIndex === 0) return xy

    return { x: 15 + 8 * playerIndex, y: -29 }
  }
}

export const heroSpotLocator = new HeroSpotLocator()
