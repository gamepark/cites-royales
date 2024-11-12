import { Season } from '@gamepark/cites-royales/material/Season'
import { CardDescription } from '@gamepark/react-game'
import Autumn from '../images/cards/seasons/Autumn.jpg'
import Spring from '../images/cards/seasons/Spring.jpg'
import Summer from '../images/cards/seasons/Summer.jpg'
import Winter from '../images/cards/seasons/Winter.jpg'

class SeasonCardDescription extends CardDescription {
  images = {
    [Season.Spring]: Spring,
    [Season.Summer]: Summer,
    [Season.Autumn]: Autumn,
    [Season.Winter]: Winter
  }
}

export const seasonCardDescription = new SeasonCardDescription()