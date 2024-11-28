import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { subjectCardDescription } from '../material/SubjectCardDescription'

class OnSeasonCardsLocator extends Locator {
  coordinates = { x: -50, y: -23 }
  //   gap = { x: seasonCardDescription.width + 0.5 }
  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x = 0, y = 0, z = 0 } = super.getItemCoordinates(item, context)

    return {
      x: x + (item.location.id! - 1) * subjectCardDescription.width + (item.location.id! - 1) * 0.5,
      y: y - item.location.z! * 0.4,
      z: 1 + z + item.location.z! * 0.4
    }
  }
}

export const onSeasonCardsLocator = new OnSeasonCardsLocator()
