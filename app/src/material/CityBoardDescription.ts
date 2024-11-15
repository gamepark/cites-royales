import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { BoardDescription } from '@gamepark/react-game'
import BeigeCity from '../images/boards/BeigeCity.jpg'
import BlackCity from '../images/boards/BlackCity.jpg'
import BrownCity from '../images/boards/BrownCity.jpg'
import CyanCity from '../images/boards/CyanCity.jpg'

class CityBoardDescription extends BoardDescription {
  height = 3.2
  width = 44.4
  images = {
    [NobleColor.Brown]: BrownCity,
    [NobleColor.Cyan]: CyanCity,
    [NobleColor.Black]: BlackCity,
    [NobleColor.Beige]: BeigeCity,
  }
}

export const cityBoardDescription = new CityBoardDescription()
