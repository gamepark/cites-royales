import { DropAreaDescription, getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cityBoardSpotLocator } from './CityBoardSpotLocator'
import { subjectCardDescription } from '../material/SubjectCardDescription'

class PlayerAreaLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const { x = 0, y = 0 } = cityBoardSpotLocator.getCoordinates(location, context)
    return playerIndex === 0 ? { x: x - 27, y: y - 5 } : { x: x + 7, y: y - 8 }
  }

  locationDescription = new playerAreaDescription({
    width: subjectCardDescription.width,
    height: subjectCardDescription.height,
  })
}

class playerAreaDescription extends DropAreaDescription {}

export const playerAreaLocator = new PlayerAreaLocator()
