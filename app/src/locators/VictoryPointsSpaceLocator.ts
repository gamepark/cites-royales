import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { victoryPointsTrackDescription } from '../material/VictoryPointsTrackDescription'

class VictoryPointsSpaceLocator extends Locator {
  parentItemType = MaterialType.VictoryPointsTrack

  getParentItem(_location: Location, context: MaterialContext) {
    return victoryPointsTrackDescription.getStaticItems(context)[0]
  }

  getPositionOnParent(location: Location) {
    const locationX = location.x! > 50 ? location.x! % 50 : location.x!
    const line = this.getLineOnParent(locationX)
    const column = this.getColumnOnParent(locationX)

    const baseX = 13
    const baseY = 14.5
    const cellWidth = 9.12
    const cellHeight = 11.8

    const x = baseX + column * cellWidth - (line % 2) * 5
    const y = baseY + line * cellHeight

    return { x, y }
  }

  getLineOnParent(x: number) {
    if (x <= 7) return 0
    if (x <= 15) return 1
    if (x <= 22) return 2
    if (x <= 29) return 3
    if (x <= 36) return 4
    if (x <= 43) return 5
    return 6
  }

  getColumnOnParent(x: number) {
    if (x <= 7) return x
    if (x <= 15) return 15 - x
    if (x <= 22) return x - 16
    if (x <= 29) return 29 - x
    if (x <= 36) return x - 30
    if (x <= 43) return 43 - x
    return x - 44
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y = 0, z = 0 } = super.getItemCoordinates(item, context)

    return {
      x,
      y: y - item.location.z! * 0.2,
      z: z + item.location.z! * 0.2,
    }
  }

}

export const victoryPointsSpaceLocator = new VictoryPointsSpaceLocator()

