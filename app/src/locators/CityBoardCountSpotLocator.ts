import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { Location } from '@gamepark/rules-api'
import { cityBoardDescription } from '../material/CityBoardDescription'
import { CityBoardCounter } from './component/CityBoardCounter'

export class CityBoardCountSpotLocator extends Locator {
  parentItemType = MaterialType.CityBoard

  getParentItem(location:Location) {
    return cityBoardDescription.getPlayerBoard(location.player!)
  }

  getPositionOnParent(location: Location) {
    return { x: location.id! * 9.5 + 6.76 *(location.id! -1), y: 46}
  }

  locationDescription = new CityBoardCountSpotDescription()
}

class CityBoardCountSpotDescription extends DropAreaDescription {
  width= 6.57
  height= 3
  content = CityBoardCounter
  extraCss = `
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:rgba(0, 0, 0, 0.8);
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
  `

}

export const cityBoardCountSpotLocator = new CityBoardCountSpotLocator()