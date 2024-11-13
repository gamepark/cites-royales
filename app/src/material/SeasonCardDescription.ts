import { Season } from '@gamepark/cites-royales/material/Season'
import { CardDescription } from '@gamepark/react-game'
import Autumn from '../images/cards/seasons/Autumn.jpg'
import AutumnBack from '../images/cards/seasons/AutumnBack.jpg'
import Spring from '../images/cards/seasons/Spring.jpg'
import SpringBack from '../images/cards/seasons/SpringBack.jpg'
import Summer from '../images/cards/seasons/Summer.jpg'
import SummerBack from '../images/cards/seasons/SummerBack.jpg'
import Winter from '../images/cards/seasons/Winter.jpg'
import WinterBack from '../images/cards/seasons/WinterBack.jpg'

class SeasonCardDescription extends CardDescription {
  backImages = {
    [Season.Spring]: SpringBack,
    [Season.Summer]: SummerBack,
    [Season.Autumn]: AutumnBack,
    [Season.Winter]: WinterBack,
  }
  images = {
    [Season.Spring]: Spring,
    [Season.Summer]: Summer,
    [Season.Autumn]: Autumn,
    [Season.Winter]: Winter,
  }
}

export const seasonCardDescription = new SeasonCardDescription()
