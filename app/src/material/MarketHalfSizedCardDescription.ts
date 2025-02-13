import { MarketHalfSizedCard } from "@gamepark/cites-royales/material/MarketHalfSizedCard";
import { CardDescription } from "@gamepark/react-game";

import row1Front from "../images/cards/marketHalfSizedCards/row1Front.jpg";
import row2Front from "../images/cards/marketHalfSizedCards/row2Front.jpg";
import row3Front from "../images/cards/marketHalfSizedCards/row3Front.jpg";
import row4Front from "../images/cards/marketHalfSizedCards/row4Front.jpg";
import row5Front from "../images/cards/marketHalfSizedCards/row5Front.jpg";
import { MarketHalfSizedCardHelp } from './help/MarketHalfSizedCardHelp'

class MarketHalfSizedCardDescription extends CardDescription {
  height = 4.4;
  images = {
    [MarketHalfSizedCard.row1]: row1Front,
    [MarketHalfSizedCard.row2]: row2Front,
    [MarketHalfSizedCard.row3]: row3Front,
    [MarketHalfSizedCard.row4]: row4Front,
    [MarketHalfSizedCard.row5]: row5Front,
  };

  help = MarketHalfSizedCardHelp
}

export const marketHalfSizedCardDescription = new MarketHalfSizedCardDescription();
