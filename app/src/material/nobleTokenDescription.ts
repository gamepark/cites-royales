import { NobleToken } from '@gamepark/cites-royales/material/NobleToken'
import { TokenDescription } from '@gamepark/react-game'
import Beige from '../images/tokens/noble/Beige.png'
import Black from '../images/tokens/noble/Black.png'
import Brown from '../images/tokens/noble/Brown.png'
import Cyan from '../images/tokens/noble/Cyan.png'

class NobleTokenDescription extends TokenDescription {
  width = 1.6
  height = 1.6

  images = {
    [NobleToken.Beige]: Beige,
    [NobleToken.Cyan]: Cyan,
    [NobleToken.Brown]: Brown,
    [NobleToken.Black]: Black,
  }
}

export const nobleTokenDescription = new NobleTokenDescription()