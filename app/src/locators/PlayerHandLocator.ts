import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cityBoardSpotLocator } from './CityBoardSpotLocator'

class PlayerHandLocator extends HandLocator {
  coordinates = { x: 39, y: 25 }

  radius = 100 // default value
  baseAngle = 0 // default value
  maxAngle = 15 // default value
  gapMaxAngle = 3 // default value
  clockwise = true // default value

  // TODO : Resserrer les cartes ou les déplacer pour prendre moins de place / voir le Héro
  getCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const { x = 0, y = 0 } = cityBoardSpotLocator.getCoordinates(location, context)
    return playerIndex === 0 ? { x: x - 40, y: y - 5 } : { x: x + 35, y: y - 8 }
  }
}

export const playerHandLocator = new PlayerHandLocator()
