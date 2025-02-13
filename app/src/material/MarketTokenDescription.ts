import { MarketToken } from '@gamepark/cites-royales/material/MarketToken'
import { TokenDescription } from '@gamepark/react-game'
import Beige from '../images/tokens/market/Beige.png'
import Black from '../images/tokens/market/Black.png'
import Brown from '../images/tokens/market/Brown.png'
import Cyan from '../images/tokens/market/Cyan.png'
import { TokenHelp } from './help/TokenHelp'

class MarketTokenDescription extends TokenDescription {
  borderRadius = 0.5
  width = 1.6
  height = 1.6

  images = {
    [MarketToken.Beige]: Beige,
    [MarketToken.Cyan]: Cyan,
    [MarketToken.Brown]: Brown,
    [MarketToken.Black]: Black,
  }
  help = TokenHelp
}

export const marketTokenDescription = new MarketTokenDescription()
