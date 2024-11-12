import { ListLocator } from "@gamepark/react-game";
import { seasonCardDescription } from "../material/SeasonCardDescription";

class SeasonsCardsStackLocator extends ListLocator {
  coordinates = { x: 25, y: -15 };
  gap = { x: seasonCardDescription.width };
}

export const seasonsCardsStackLocator = new SeasonsCardsStackLocator();
