import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class MarketTokenSpotLocator extends Locator {
  coordinates = { x: -50 }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y = 5.5, z = 0 } = super.getItemCoordinates(item, context)

    return {
      x,
      y: y - item.location.z! * 0.4,
      z: z + item.location.z! * 0.4,
    }
  }
}

export const marketTokenSpotLocator = new MarketTokenSpotLocator()
