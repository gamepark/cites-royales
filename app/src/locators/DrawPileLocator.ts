import { DeckLocator } from "@gamepark/react-game";

class DrawPileLocator extends DeckLocator {
  coordinates = { y: 20 };
}

export const drawPileLocator = new DrawPileLocator();
