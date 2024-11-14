import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { ItemContext, LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { victoryPointsTrackDescription } from '../material/VictoryPointsTrackDescription'

class VictoryPointsSpaceLocator extends Locator {
  parentItemType = MaterialType.VictoryPointsTrack

  getParentItem(_location: Location, context: MaterialContext) {
    return victoryPointsTrackDescription.getStaticItems(context)[0]
  }
  getPositionOnParent(location: Location) {
    const line = this.getLineOnParent(location.x!)
    const column = this.getColumnOnParent(location.x!, line!)

    const baseX = 13
    const baseY = 14.5
    const cellWidth = 9.1
    const cellHeight = 11.7

    const x = baseX + (line! % 2 === 0 ? column * cellWidth : column * cellWidth - 5)
    const y = baseY + line! * cellHeight

    return { x, y }
  }

  getLineOnParent(x: number) {
    if (x <= 7) return 0
    if (x <= 15) return 1
    if (x <= 22) return 2
    if (x <= 29) return 3
    if (x <= 36) return 4
    if (x <= 43) return 5
    if (x <= 50) return 6
    return undefined
  }

  getColumnOnParent(x: number, line: number) {
    const columns = line === 0 || line === 1 ? 8 : 7
    let col

    if (line === 0 || line === 1) {
      col = x < columns ? x : x - columns * Math.floor(x / columns)
    } else {
      x = x - line * columns
      if (x < 2) {
        col = columns - 2 + x
      } else {
        col = x - 2
      }
    }
    if (line % 2 !== 0) {
      col = columns - 1 - col
    }

    return col
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y = 0, z = 0 } = super.getItemCoordinates(item, context)

    return {
      x,
      y: y - item.location.z! * 0.2,
      z: z + item.location.z! * 0.2,
    }
  }

  locationDescription = new victoryPointsSpaceDescription({
    width: 1.4,
    height: 1.4,
    borderRadius: 1,
  })
}

class victoryPointsSpaceDescription extends LocationDescription {
  getExtraCss(_location: Location) {
    return css`
      &:after {
        content: '${_location.x}';
      }
      border: 1px solid white;
    `
  }
}

export const victoryPointsSpaceLocator = new VictoryPointsSpaceLocator()
