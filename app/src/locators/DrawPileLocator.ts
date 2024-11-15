import { DeckLocator } from '@gamepark/react-game'

class DrawPileLocator extends DeckLocator {
  coordinates = { x: -44, y: 0 }
}

export const drawPileLocator = new DrawPileLocator()
