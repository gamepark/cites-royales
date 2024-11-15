import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import helpBack from '../images/cards/help/helpBack.jpg'
import helpFront from '../images/cards/help/helpFront.jpg'

class HelpCardDescription extends CardDescription {
  backImage = helpBack
  image = helpFront

  getStaticItems(_context: MaterialContext) {
    // TODO : Face 2 si le joueur a acheté
    return [{ id: 1, location: { type: LocationType.HelpCardSpot } }]
  }
}

export const helpCardDescription = new HelpCardDescription()
