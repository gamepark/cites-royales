import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cityBoardSpotLocator } from './CityBoardSpotLocator'

class ActionHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const { x = 0, y = 0 } = cityBoardSpotLocator.getCoordinates(location, context)
    return playerIndex === 0 ? { x: x - 65, y: y - 5 } : { x: x + 35, y: y - 8 }
  }
}

export const actionHandLocator = new ActionHandLocator()
