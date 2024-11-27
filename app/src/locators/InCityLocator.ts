import { SubjectColor } from '@gamepark/cites-royales/material/Subject'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { subjectCardDescription } from '../material/SubjectCardDescription'
import { cityBoardSpotLocator } from './CityBoardSpotLocator'

class InCityLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const color: SubjectColor = location.id
    const locationX = location.x ?? this.countItems(location, context)

    const { x = 0, y = 0 } = cityBoardSpotLocator.getCoordinates(location, context)
    return {
      x: x - 18 + (color - 1) * subjectCardDescription.width + 0.9 * (color - 1),
      y: y - 6 - locationX * 1.2,
      z: locationX + 1,
    }
  }
}

export const inCityLocator = new InCityLocator()
